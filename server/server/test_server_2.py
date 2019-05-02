from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import json
import test_qry
import datetime
from SocketServer import ThreadingMixIn
import threading
import re

PORT_NUMBER = 8080

class myHandler(BaseHTTPRequestHandler):
	def do_GET(self):
		self.send_error(501,'Invalid Endpoint')
		return

	def send_error(self,error_code,error_msg):
		self.send_response(error_code)
		self.send_header('Content-Type','application/json')
		self.end_headers()
		data = {'success':False,'error_code':error_code,'error_msg':error_msg}
		self.wfile.write(json.dumps(data))
		return

	def send_success_response(self,data):
		self.send_response(200)
		self.send_header('Content-Type','application/json')
		self.end_headers()
		data["success"]=True
		data = json.dumps(data)
		self.wfile.write(data)
		return

	def do_POST(self):
		if self.path=='/auth/login':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)
			if 'username' not in body or \
			'password' not in body:
				self.send_error(400,'Missing Arguments in Request')
				return
			if len(body) != 2:
				self.send_error(400,'Too Few or Too Many Arguments')
				return
			email = body['username']
			password = body['password']
			pattern = '(^[a-zA-Z0-9_.+-]+[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)'
			result = re.match(pattern,email)
			if not result:
				self.send_error(406,"Invalid Username or Password")
				return
			if test_qry.check_user_exists(email) is not True:
				self.send_error(500,'User Doesn\'t Exists')
				return
			print(test_qry.check_token_exists(email))
			if test_qry.check_token_exists(email) is True:
				self.send_error(500,'Already Authenticated')
				return
			if test_qry.login_user(email,password) is False:
				self.send_error(406,'Invalid Username or Password')
				return
			else:
				user_id = test_qry.get_user_id(email)
				token = test_qry.get_token(email)
				print(token)
				print(user_id)
				if token is None or user_id is None:
					self.send_error(500,'Server Error')
					return
				data = {'token':token,'user_id':user_id}
				self.send_success_response(data)
				return
		elif self.path=='/auth/register':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)
			if len(body)!=6:
				self.send_error(400,"Too many or too few Arguments")
				return
			if 'first_name' not in body or 'last_name' not in body or \
			'password' not in body or 'security_question' not in body or \
			'security_answer' not in body or 'email' not in body:
				self.send_error(400,'Missing Arguments in Request')
				return
			first_name = body['first_name']
			last_name = body['last_name']
			password = body['password']
			security_question = body['security_question']
			security_answer = body['security_answer']
			email = body['email']
			pattern = '(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)'
			result = re.match(email,pattern)
			if not result:
				self.send_error(406,'Invalid Email')
				return
			pattern = '(^[a-zA-Z0-9])'
			result = re.match(first_name,pattern)
			if not result:
				self.send_error(406,'Invalid first_name')
				return
			result = re.match(last_name,pattern)
			if not result:
				self.send_error(406,'Invalid last_name')
				return
			if test_qry.check_user_exists(email) is True:
				self.send_error(500,'User Already Exists')
				return
			if test_qry.register(first_name,last_name,security_question,security_answer,email,password) is True:
				user_id = test_qry.get_user_id(email);
				test_qry.create_token(email);
				token = test_qry.get_token(email);
				self.send_success_response({"user_id":user_id,"token":token})
				return
			else:
				self.send_error(406,'Error while registering user')
				return
		elif self.path=='/auth/forgot':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)
			if 'email' not in body or \
			'security_answer' not in body:
				self.send_error(400,'Missing Arguments')
				return
			if len(body)!=2:
				self.send_error(400,'Too many or too few arguments')
				return
			email = body['email']
			sec_a = body['security_answer']
			if test_qry.check_user_exists(email) is False:
				self.send_error(500,'Invalid Username')
				return
			if test_qry.check_answer(email,sec_a) is True:
				token = test_qry.get_token(email)
				user_id = test_qry.get_user_id(email)
				data = {'token':token,'user_id':user_id}
				self.send_success_response(data)
				return
			else:
				self.send_error(406,'Invalid Security Answer')
				return
		elif self.path=='/auth/forgot/email':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)
			if 'email' not in body:
				self.send_error(400,'Missing Arguments')
				return
			if len(body)!=1:
				self.send_error(400,'Too many or too few arguments')
				return
			email = body['email']
			if test_qry.check_user_exists(email) is False:
				self.send_error(500,'Invalid Username')
				return
			question = test_qry.get_sec_q(email)
			if question is not None:
				data = {"security_question":question}
				self.send_success_response(data)
				return
			else:
				self.send_error(400,"Server Error")
				return
		elif self.path=='/logout':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)
			if 'token' not in body or \
			'user_id' not in body:
				self.send_error(400,'Missing Arguments')
				return
			if len(body) != 2:
				self.send_error(400,'Too many or too few arguments')
				return
			token = body['token']
			user_id = body['user_id']

			try:
				a= int(str(user_id))
				if a < 0:
					self.send_error(400,'Invalid Input')
					return
			except ValueError:
				self.send_error(400,'Invalid Input')
				return
			if test_qry.check_logged_in(user_id,token) is True:
				if test_qry.logout(user_id) is True:
					self.send_success_response({})
					return
				else:
					self.send_error(500,'Server Error')
					return
			else:
				self.send_error(401,'Not Logged In')
				return
		elif self.path=='/profile/update/email':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)
			if 'email' not in body or \
			'token' not in body or \
			'user_id' not in body:
				self.send_error(400,'Missing Arguments')
				return
			if len(body)!=3:
				self.send_error(400,'Too many or too few arguments')
				return
			email = body['email']
			token = body['token']
			user_id = body['user_id']

			try:
				a = int(str(user_id))
				if a < 0:
					self.send_error(400,'Invalid Input')
					return
			except ValueError:
				self.send_error(400,'Invalid Input')
				return

			if test_qry.check_logged_in(user_id,token) is True:
				if test_qry.update_email(user_id,email) is True:
					self.send_success_response({})
					return
				else:
					self.send_error(500,'Server Error')
					return
			else:
				self.send_error(401,'Unauthorized')
				return
		elif self.path=='/profile/update/password':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)
			if 'password' not in body or \
			'token' not in body or \
			'user_id' not in body:
				self.send_error(400,'Missing Arguments')
				return
			if len(body)!=3:
				self.send_error(400,'Too many or Too few arguments')
				return
			password = body['password']
			token = body['token']
			user_id = body['user_id']

			try:
				a = int(str(user_id))
				if a < 0:
					self.send_error(400,'Invalid Input')
					return
			except ValueError:
				self.send_error(400,'Invalid Input')
				return

			if test_qry.check_logged_in(token=token,user_id=user_id) is not True:
				self.send_error(401,'Unauthorized')
				return
			else:
				if test_qry.update_password(user_id,password) is True:
					self.send_success_response({})
					return
				else:
					self.send_error(500,'Server Error')
					return
		elif self.path=='/profile/delete':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)
			if 'token' not in body or \
			'user_id' not in body:
				self.send_error(400,'Missing Arguments')
				return
			if len(body)!=2:
				self.send_error(400,'too many or too few arguments')
				return
			token = body['token']
			user_id = body['user_id']

			try:
				a = int(str(user_id))
				if a < 0:
					self.send_error(400,'Invalid Input')
					return
			except ValueError:
				self.send_error(400,'Invalid Input')
				return

			if test_qry.check_logged_in(token=token,user_id=user_id) is not True:
				self.send_error(401,'Unauthorized')
				return
			else:
				if test_qry.delete_user(user_id=user_id) is True:
					self.send_success_response({})
					return
				else:
					self.send_error(500,'Server Error')
					return
		elif self.path=='/allergies/view/user':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)
			if 'token' not in body or \
			'user_id' not in body or \
			'from_val' not in body or \
			'to_val' not in body:
				self.send_error(400,'Missing Arguments')
				return
			if len(body)!=4:
				self.send_error(400,'too many or too few arguments')
				return
			token = body['token']
			user_id = body['user_id']
			from_val = body['from_val']
			to_val = body['to_val']

			try:
				c = int(str(user_id))
				if c < 0:
					self.send_error(400,'Invalid Input')
					return
				a = int(str(from_val))
				if a < 0:
					self.send_error(400,'Invalid from value')
					return
				b = int(str(to_val))
				if b < 0:
					self.send_error(400,'Invalid to value')
					return
				if b<a:
					self.send_error(400,'Invalid to value')
					return
			except ValueError:
				self.send_error(400,'Invalid Input')
				return

			if test_qry.check_logged_in(user_id=user_id,token=token) is not True:
				self.send_error(401,'Unauthorized')
				return
			else:
				allergies = test_qry.view_user_allergies(user_id=user_id,fv=int(from_val),tv=int(to_val))
				if allergies is None:
					self.send_error(500,'Server Error')
					return
				if len(allergies)==0:
					self.send_error(400,'No Allergies Found')
					return
				self.send_success_response({'allergies':allergies})
				return
		elif self.path=='/allergies/view/available':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)

			if 'token' not in body or \
			'user_id' not in body or \
			'from_val' not in body or \
			'to_val' not in body:
				self.send_error(400,'Missing Arguments')
				return

			if len(body)!=4:
				self.send_error(400,'too many or too few arguments')
				return

			token = body['token']
			user_id = body['user_id']
			from_val = body['from_val']
			to_val = body['to_val']

			try:
				c = int(str(user_id))
				if c < 0:
					self.send_error(400,'Invalid Input')
					return
				a = int(str(from_val))
				if a < 0:
					self.send_error(400,'Invalid from value')
					return
				b = int(str(to_val))
				if b < 0:
					self.send_error(400,'Invalid to value')
					return
				if b<a:
					self.send_error(400,'Invalid to value')
					return
			except ValueError:
				self.send_error(400,'Invalid Input')
				return

			if test_qry.check_logged_in(token=token,user_id=user_id) is not True:
				self.send_error(401,'Unauthorized')
				return
			else:
				allergies = test_qry.view_avail_allergies(int(from_val),int(to_val))
				if allergies is None:
					self.send_error(500,'Server Error')
					return
				if len(allergies)==0:
					self.send_error(400,'No Allergies Found')
					return
				self.send_success_response({'allergies':allergies})
				return
		elif self.path=='/allergies/add':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)

			if 'token' not in body or \
			'user_id' not in body or \
			'allergies' not in body:
				self.send_error(400,'Missing Arguments')
				return
			if len(body)>4 or len(body)<3:
				self.send_error(400,'Too many arguments')
				return

			token = body['token']
			user_id = body['user_id']
			allergies = body['allergies']

			try:
				c = int(str(user_id))
				if c < 0:
					self.send_error(400,'Invalid Input')
					return
				for i in allergies:
					t = int(str(i))
					if t < 0:
						self.send_error(400,'Invalid Input')
						return
			except ValueError:
				self.send_error(400,'Invalid Input')
				return

			if 'new_allergy' in body:
				print(body['new_allergy'])
				new_allergy = body['new_allergy']
				new_id = test_qry.add_new_allergy(new_allergy)
				print("new id= {}".format(new_id))
				if new_id is None:
					self.send_error(500,'Server Error')
					return
				allergies.append(new_id)

			if test_qry.check_logged_in(user_id=user_id,token=token) is not True:
				self.send_error(401,'Unauthorized')
				return

			if test_qry.update_user_allergies(user_id=user_id,allergies=allergies) is True:
				self.send_success_response({})
				return
			else:
				self.send_error(500,'Server Error')
				return
		elif self.path=='/meal/view':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)

			if 'token' not in body or \
			'user_id' not in body or \
			'year' not in body or \
			'month' not in body or \
			'day' not in body or \
			'from_val' not in body or \
			'to_val' not in body:
				self.send_error(400,'Missing Arguments')
				return
			if len(body) != 7:
				self.send_error(400,'Too Many or Too Few Arguments')
				return
			token = body['token']
			user_id = body['user_id']
			year = body['year']
			month = body['month']
			day = body['day']
			from_val = body['from_val']
			to_val = body['to_val']

			try:
				int(str(user_id))
				a = int(str(from_val))
				y = int(str(year))
				m = int(str(month))
				d = int(str(day))
				if y < 0 or m < 1 or m > 31 or \
				d < 1 or d > 31:
					self.send_error(400,'Invalid date value')
					return
				if a < 0:
					self.send_error(400,'Invalid from value')
					return
				b = int(str(to_val))
				if b < 0:
					self.send_error(400,'Invalid to value')
					return
				if b<a:
					self.send_error(400,'Invalid to value')
					return
			except ValueError:
				self.send_error(400,'Invalid Input')
				return

			if test_qry.check_logged_in(user_id=user_id,token=token) is not True:
				self.send_error(401,'Unauthorized')
				return

			date = datetime.date(int(y),int(m),int(d))
			meals = test_qry.view_meals_for_user(user_id=int(user_id),date=date,fv=int(from_val),tv=int(to_val))
			print("meals={}".format(meals))
			if meals is None:
				self.send_error(500,'Server Error')
				return
			elif len(meals)==0:
				self.send_error(500,'No meals to Show')
				return
			else:
				self.send_success_response({'meals':meals})
				return
		elif self.path=='/meal/id/view':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)

			if 'token' not in body or \
			'user_id' not in body or \
			'meal_id' not in body:
				self.send_error(400,'Missing Arguments')
				return
			if len(body) != 3:
				self.send_error(400,'Too many arguments')
				return

			token = body['token']
			user_id = body['user_id']
			meal_id = body['meal_id']

			try:
				a = int(str(user_id))
				b = int(str(meal_id))
				if a < 0 or b < 0:
					self.send_error(400,'Invalid Input')
					return
			except ValueError:
				self.send_error(400,'Invalid Input')
				return

			if test_qry.check_logged_in(user_id=user_id,token=token) is not True:
				self.send_error(401,'Unauthorized')
				return
			meal = test_qry.view_meal(int(meal_id))
			if meal is None:
				self.send_error(500,'Server Error')
				return
			else:
				self.send_success_response(meal)
				return
		elif self.path=='/meal/id/delete':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)

			if 'token' not in body or \
			'user_id' not in body or \
			'calendar_id' not in body:
				self.send_error(400,'Missing Arguments')
				return
			if len(body) != 3:
				self.send_error(400,'Too many arguments')
				return

			token = body['token']
			user_id = body['user_id']
			calendar_id = body['calendar_id']

			try:
				a = int(str(user_id))
				b = int(str(calendar_id))
				if user_id < 0 or calendar_id < 0:
					self.send_error(400,'Invalid Input')
					return
			except ValueError:
				self.send_error(400,'Invalid Input')
				return

			if test_qry.check_logged_in(user_id=user_id,token=token) is not True:
				self.send_error(401,'Unauthorized')
				return

			if test_qry.delete_meal(calendar_id) is not True:
				self.send_error(500,'Server Error')
				return

			self.send_success_response({})
			return
		elif self.path=='/meal/id/add':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)

			if 'token' not in body or \
			'user_id' not in body or \
			'recipe_id' not in body or \
			'month' not in body or \
			'day' not in body or \
			'year' not in body:
				self.send_error(400,'Missing Arguments')
				return
			if len(body) != 6:
				self.send_error(400,'Too many arguments')
				return
			token = body['token']
			user_id = body['user_id']
			recipe_id = body['recipe_id']
			month = body['month']
			day = body['day']
			year = body['year']

			try:
				a = int(str(user_id))
				b = int(str(recipe_id))
				y = int(str(year))
				m = int(str(month))
				d = int(str(day))
				if a < 0 or b < 0:
					self.send_error(400,'Invalid Input')
					return
				if y < 0 or m <1 or d < 1 or \
				m > 12 or d > 31:
					self.send_error(400,'Invalid Input')
					return
			except ValueError:
				self.send_error(400,'Invalid Input')
				return

			if test_qry.check_logged_in(user_id=user_id,token=token) is not True:
				self.send_error(401,'Unauthorized')
				return
			date = datetime.date(int(year),int(month),int(day))
			if test_qry.add_meal(recipe_id=recipe_id,user_id=user_id,date=date) is not True:
				self.send_error(500,'Server Error')
				return
			self.send_success_response({})
			return
		elif self.path=='/meal/search':
			content_length = self.rfile.read(int(self.headers['Content-Length']))
			body = json.loads(content_length)

			if 'token' not in body or \
			'user_id' not in body or \
			'meal_name' not in body or \
			'from_val' not in body or \
			'to_val' not in body:
				self.send_error(400,'Missing Arguments')
				return
			if len(body) != 5:
				self.send_error(400,'Too many arguments')
				return

			token = body['token']
			user_id = body['user_id']
			meal_name = body['meal_name']
			from_val = body['from_val']
			to_val = body['to_val']

			try:
				a = int(str(user_id))
				b = int(str(from_val))
				c = int(str(to_val))
				if a < 0 or b < 0 or c < 0 or b>c:
					self.send_error(400,'Invalid Input')
					return
			except ValueError:
				self.send_error(400,'Invalid Input')
				return

			if test_qry.check_logged_in(user_id=user_id,token=token) is not True:
				self.send_error(401,'Unauthorized')
				return

			meals = test_qry.search_meals(meal_name,int(from_val),int(to_val))
			if meals is None:
				self.send_error(500,'Server Error')
				return
			if len(meals)==0:
				self.send_error(500,'No meals found')
				return
			self.send_success_response({'meals':meals})
			return
		else:
			self.send_error(501,'Invalid Endpoint')
			return

class ThreadedHTTPServer(ThreadingMixIn,HTTPServer):
	""""""

try:
	server = ThreadedHTTPServer(('',PORT_NUMBER),myHandler)
	print("Server Started on port {}".format(PORT_NUMBER))

	server.serve_forever()

except KeyboardInterrupt:
	print("^C received. Shutting Down Web Server")
	server.socket.close()
