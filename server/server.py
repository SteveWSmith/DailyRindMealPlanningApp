from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import json

PORT_NUMBER = 8080

class myHandler(BaseHTTPRequestHandler):
	def do_GET(self):
		if self.path.startswith('/auth/forgot/'):
			args = path.split('/')
			print(args)
			email = args[4]
			question = get_security_question(email)
			if question is not None:
				data = {"security_question":question}
				self.send_success_request(data)
				return
			else:
				self.send_error(400,"Invalid User ID")
				return
		else:
			self.send_error(501,'Invalid Endpoint')
			return

	def send_error(self,error_code,error_msg):
		self.send_response(error_code)
		self.send_header('Content-Type','application/json')
		self.end_headers()
		data = {'success':False,'error_code':error_code,'error_msg':error_msg}
		self.wfile.write(error_msg)
		return

	def send_success_request(self,data):
		self.send_response(200)
		self.send_header('Content-Type','application/json')
		self.send_headers()
		data["success"]=True
		data = json.dumps(data)
		self.wfile.write(data)
		return

	def do_POST(self):
		if self.path.startswith('/auth/'):
			if self.path=='/auth/login':
				content_length = self.rfile.read(int(self.headers['Content-Length']))
				body = json.loads(content_length)
				if 'username' not in body:
					self.send_error(400,'Missing Arguments in Request')
					pass
				elif 'password' not in body:
					self.send_error(400,'Missing Arguments in Request')
					return
				elif len(body) > 2:
					self.send_error(400,'Too Many Arguments')
					return
				email = body['username']
				password = body['password']
				ch = check_login(email)
				if ch is True:
					self.send_error(500,'Already Authenticated')
					return
				log = login_user(email,password)
				if log is False:
					self.send_error(406,"Invalid Username or Password")
					return
				else:
					token = get_token(email)
					user_id = get_user_id(email)
					if token is None or user_id is None:
						self.send_error(500,"Error in DB")
						return
					data = {"token":token,"user_id":user_id}
					self.send_success_request(data)
					return
			elif self.path=='/auth/register':
				content_length = self.rfile.read(int(self.headers['Content-Length']))
				body = json.loads(content_length)
				if 'first_name' not in body or 'last_name' not in body or
				'password' not in body or 'security_question' not in body or
				'security_answer' not in body or 'email' not in body:
					send_error(400,'Missing Arguments in Request')
					return
				else:
					first_name = body['first_name']
					last_name = body['last_name']
					password = body['password']
					security_question = body['security_question']
					security_answer = body['security_answer']
					email = body['email']
					c = check_user_exists(email)
					if c is True:
						self.send_error(500,'User Already Exists')
						return
					reg = register(first_name,last_name,security_question,
					security_answer,email,password)

					if reg is False:
						self.send_success_request({})
					else:
						self.send_error(406,'Invalid Credentials')
						return
			elif self.path.startswith('/auth/forgot/'):
				content_length = self.rfile.read(int(self.headers['Content-Length']))
				body = json.loads(content_length)
				if 'email' is not in body or 'security_answer' not in body:
					self.send_error(400,'Missing Arguments')
					return
				else:
					email = body['email']
					sec_a = body['security_answer']
					c = check_user_exists(email)
					if c is False:
						self.send_error(500,'User Doesn\'t Exists')
						return
					test = test_answer(email,sec_a)

					if test is True:
						token = get_token(email)
						user_id = get_user_id(email)
						data = {"token":token,"user_id":user_id}
						self.send_success_request(data)
						return
					else:
						self.send_error(406,"Wrong answer")
						return
			else:
				self.send_error(501,'Invalid Endpoint')
				return
		elif self.path.startswith('/logout/'):
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)
			if 'token' not in body or 'user_id' not in body:
				self.send_error(,"Not logged in")
				return
			else:
				token = body['token']
				user_id = body['user_id']
				logged_in = check_log_in(token,user_id)
				if logged_in is True:
					s = log_out(user_id)
					if s is False:
						self.send_error(500,'Server Error')
						return
					self.send_success_request({})
					return
				else:
					self.send_error(401,"Not Logged In")
					return
		elif self.path.startswith('/profile/'):
			if self.path == '/profile/update/email':
				content_length = self.rfile.read(int(self.headers['Content-Length']))
				body = json.loads(content_length)
				if 'email' not in body or
				'token' not in body or
				'user_id' not in body:
					self.send_error(400,'Missing Arguments')
					return
				else:
					email = body['email']
					token = body['token']
					user_id = body['user_id']

					logged_in = check_log_in(token,user_id)
					if logged_in is True:
						v = update_email(email,user_id)
						if v is True:
							self.send_success_request({})
							return
						else:
							self.send_error(500,'Server Error')
							return
					else:
						self.send_error(401,'Unauthorized')
						return
			elif self.path == '/profile/update/password':
				content_length = self.rfile.read(int(self.headers['Content-Length']))
				body = json.loads(content_length)
				if 'password' not in body or
				'token' not in body or
				'user_id' not in body:
					self.send_error(400,'Missing Arguments')
					return
				else:
					password = body['password']
					token = body['token']
					user_id = body['user_id']

					log = check_login(token,user_id)

					if log is not True:
						self.send_error(401,'Unauthorized')
						return
					else:
						s = update_password(user_id,password)
						if s is True:
							self.send_success_request({})
							return
						else:
							self.send_error(500,'Server Error')
							return
			elif self.path == '/profile/delete':
				content_length = self.rfile.read(int(self.headers['Content-Length']))
				body = json.loads(content_length)
				if 'token' not in body or
				'user_id' not in body:
					self.send_error(400,'Missing Arguments')
					return
				else:
					token = body['token']
					user_id = body['user_id']
					log = check_log_in(token,user_id)
					if log is not True:
						self.send_error(401,'Unauthorized')
						return
					else:
						s = delete_user(user_id)
						if s is True:
							self.send_success({})
							return
						else:
							self.send_error(500,'Server Error')
							return
			elif self.path == '/profile/allergies/view/user':
				content_length = self.rfile.read(int(self.headers['Content-Length']))
				body = json.loads(content_length)
				if 'token' not in body or
				'user_id' not in body or
				'from_val' not in body or
				'to_val' not in body:
					self.send_error(400,'Missing Arguments')
					return
				else:
					token = body['token']
					user_id = body['user_id']
					from_val = body['from_val']
					to_val = body['to_val']
					log = check_log_in(token,user_id)
					if log is not True:
						self.send_error(401,'Unauthorized')
						return
					else:
						allergies = get_allergies_for_user(user_id,from_val,to_val)
						if allergies is None:
							self.send_error(500,'Server Error')
							return
						self.send_success({allergies})
						return
			elif self.path == '/profile/allergies/view/available':
				content_length = self.rfile.read(int(self.headers['Content-Length']))
				body = json.loads(content_length)

				if 'token' not in body or
				'user_id' not in body or
				'from_val' not in body or
				'to_val' not in body:
					self.send_error(400,'Missing Arguments')
					return
				else:
					token = body['token']
					user_id = body['user_id']
					from_val = body['from_val']
					to_val = body['to_val']

					log = check_login(token,user_id)

					if log is not True:
						self.send_error(401,'Unauthorized')
						return
					else:
						allergies = get_avail_allergies(from_val,to_val)
						self.send_success({allergies})
						return
			elif self.path == '/profile/allergies/update':
				content_length = self.rfile.read(int(self.headers['Content-Length']))
				body = json.loads(content_length)
				if 'token' not in body or
				'user_id' not in body or
				'allergy_id' not in body:
					self.send_error(400,'Missing Arguments')
					return
				if len(body) > 3:
					self.send_error(400,'Too many arguments')
					return

				token = body['token']
				user_id = body['user_id']
				allergy_id = body['allergy_id']
				log = check_login(user_id,token)
				if log is not True:
					self.send_error(401,'Unauthorized')
					return
				s = remove_allergy(user_id,allergy_id)
				if s is not True:
					self.send_error(500,'Server Error')
					return
				self.send_success({})
				return
			elif self.path == '/profile/allergies/add':
				content_length = self.rfile.read(int(self.headers['Content-Length']))
				body = json.loads(content_length)
				if 'token' not in body or
				'user_id' not in body or
				'allergies' not in body:
					self.send_error(400,'Missing Arguments')
					return
				if len(body) > 4:
					self.send_error(400,'Too many arguments')
					return

				token = body['token']
				user_id = body['user_id']
				allergies = body['allergies']
				log = check_login(user_id,token)
				if log is not True:
					self.send_error(401,'Unauthorized')
					return
				s = add_allergy(user_id,allergies)
				if s is not True:
					self.send_error(500,'Server Error')
					return
				self.send_success({})
				return
			else:
				self.send_error(501,'Invalid Endpoint')
				return
		elif self.path.startswith('/meal/'):
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)
			if self.path == '/meal/view':
				if 'token' not in body or
				'user_id' not in body or
				'year' not in body or
				'from_month' not in body or
				'to_month' not in body or
				'from_day' not in body or
				'to_day' not in body or
				'from_val' not in body or
				'to_val' not in body:
					self.send_error(400,'Missing Arguments')
					return
				if len(body) > 8:
					self.send_error(400,'Too many arguments')
					return
				token = body['token']
				user_id = body['user_id']
				year = body['year']
				from_month = body['from_month']
				to_month = body['to_month']
				from_day = body['from_day']
				to_day = body['to_day']
				from_val = body['from_val']
				to_val = body['to_val']
				log = check_login(user_id,token)
				if log is not True:
					self.send_error(401,'Unauthorized')
					return
				s = get_meals(user_id,
				year,from_month,to_month,from_day,to_day,
				from_val,to_val)
				if s is NULL:
					self.send_error(500,'Server Error')
					return
				self.send_success({s})
				return
			elif self.path == '/meal/id/view':
				if 'token' not in body or
				'user_id' not in body or
				'meal_id' not in body:
					self.send_error(400,'Missing Arguments')
					return
				if len(body) > 3:
					self.send_error(400,'Too many arguments')
					return
				token = body['token']
				user_id = body['user_id']
				meal_id = body['meal_id']
				log = check_login(user_id,token)
				if log is not True:
					self.send_error(401,'Unauthorized')
					return
				meal = get_meal(meal_id)
				if meal is NULL:
					self.send_error(500,'Server Error')
					return
				data = {}
				data['meal_name']=meal.name
				data['meal_img_url']=meal.img_url
				data['meal_prep_time']=meal.prep_time
				data['meal_cook_time']=meal.cook_time
				data['meal_directions']=meal.directions
				data['meal_ingredients']=meal.ingredients
				self.send_success(data)
				return
			elif self.path == '/meal/id/delete':
				if 'token' not in body or
				'user_id' not in body or
				'meal_id' not in body:
					self.send_error(400,'Missing Arguments')
					return
				if len(body) > 3:
					self.send_error(400,'Too many arguments')
					return
				token = body['token']
				user_id = body['user_id']
				meal_id = body['meal_id']
				log = check_login(user_id,token)
				if log is not True:
					self.send_error(401,'Unauthorized')
					return
				s = delete_meal(user_id,meal_id)
				if s is not True:
					self.send_error(500,'Server Error')
					return
				self.send_success({})
				return
			elif self.path == '/meal/id/add':
				if 'token' not in body or
				'user_id' not in body or
				'meal_id' not in body:
					self.send_error(400,'Missing Arguments')
					return
				if len(body) > 3:
					self.send_error(400,'Too many arguments')
					return
				token = body['token']
				user_id = body['user_id']
				meal_id = body['meal_id']
				log = check_login(user_id,token)
				if log is not True:
					self.send_error(401,'Unauthorized')
					return
				s = add_meal(meal_id,user_id)
				if s is not True:
					self.send_error(500,'Server Error')
					return
				self.send_success({})
				return
			elif self.path == '/meal/search':
				if 'token' not in body or
				'user_id' not in body or
				'meal_name' not in body or
				'from_val' not in body or
				'to_val' not in body:
					self.send_error(400,'Missing Arguments')
					return
				if len(body) > 3:
					self.send_error(400,'Too many arguments')
					return
				token = body['token']
				user_id = body['user_id']
				meal_name = body['meal_name']
				from_val = body['from_val']
				to_val = body['to_val']
				log = check_login(user_id,token)
				if log is not True:
					self.send_error(401,'Unauthorized')
					return
				meals = search_meals(meal_name,from_val,to_val)
				if meals is NULL:
					self.send_error(500,'Server Error')
					return
				self.send_success({meals})
				return
			else:
				self.send_error(501,'Invalid Endpoint')
				return
		else:
			self.send_error(501,'Invalid Endpoint')
			return
try:
	server = HTTPServer(('',PORT_NUMBER),myHandler)
	print("Server Started on port {}".format(PORT_NUMBER))

	server.serve_forever()

except KeyboardInterrupt:
	print("^C received. Shutting Down Web Server")
	server.socket.close()
