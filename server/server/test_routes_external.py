import requests
import json

BASE_URL = "http://35.211.113.24:8080"

token = """ZlzgJLNjOGgEpncGoGwuqJXs bAyMOptVvMghTsnfRZUnjkwaUF"""
user_id = 4

def run_tests(tests,headers,url):
	counter = 1
	for i in tests:
		headers['Content-Length'] = str(len(i[0]))
		r = requests.post(url = url, data = json.dumps(i[0]),headers=headers)
		r = r.json()
		print(r)
		if r['success'] is not True:
			if r['error_msg'] != i[1]['error_msg']:
				print('Test {} has failed'.format(counter))
			else:
				print("Test {} was passed".format(counter))
		else:
			print("Test {} was passed".format(counter))
		counter = counter + 1

def test_register():
	url = BASE_URL + "/auth/register"
	headers = {
	'Content-Type':'application/json'
	}
	tests = []
	tests.append([{
		'first_name':'First',
		'last_name':'Last',
		'email':'email2@mail.com',
		'security_answer':'Answer',
		'security_question':'Question',
		'password':'password'
	},{'success':True}])
	tests.append([{},{'success':False,'error_msg':'Too many or too few Arguments'}])
	tests.append([{
		'first_name':'First',
		'last_name':'Last',
		'email':'email@mail.com',
		'security_answer':'Answer',
		'security_question':'Question',
		'password':'password',
		'extra':'extra'
	},{'success':False,'error_msg':'Too many or too few Arguments'}])

	tests.append([{
		'first_name':'First',
		'last_name':'Last',
		'email':'email@mail.com',
		'security_answer':'Answer',
		'security_question':'Question',
		'password':'password'
	},{'success':False,'error_msg':'User Already Exists'}])
	run_tests(tests,headers,url)

def test_login():
	url = BASE_URL + '/auth/login'
	headers = {
	'Content-Type':'application/json'
	}
	tests = []
	tests.append([{
		'username':'email@mail.com',
		'password':'password'
	},{'success':False,'error_msg':'Already Authenticated'}])
	tests.append([{
		'username':'email2@mail.com',
		'password':'pass'
	},{'success':False,'error_msg':'User Doesn\'t Exists'}])
	tests.append([{
		'username':'test@test.com',
		'password':'password56'
	},{'success':False,'error_msg':'Invalid Username or Password'}])
	tests.append([{},{'success':False,'error_msg':'Missing Arguments in Request'}])
	tests.append([{
	'username':'sal',
	'password':'cklmacs',
	'extra':'e'
	},{'success':False,'error_msg':'Too Few or Too Many Arguments'}])

	run_tests(tests,headers,url)

def test_security_answer():
	url = BASE_URL + '/auth/forgot'
	headers = {
	'Content-Type':'application/json'
	}
	tests = []
	tests.append([{
		'email':'email@mail.com',
		'security_answer':'Answer'
	},{'success':True}])
	tests.append([{
		'email':'email@mail.com',
		'security_answer':'wrong answer'
	},{'success':False,'error_msg':'Invalid Security Answer'}])
	tests.append([{
		'email':'test@test.com',
		'security_answer':'answer2'
	},{'success':False,'error_msg':'Invalid Security Answer'}])
	tests.append([{
		'email':'test2@test.com',
		'security_answer':'answer'
	},{'success':False,'error_msg':'Invalid Username'}])
	tests.append([{},{'success':False,'error_msg':'Missing Arguments'}])
	tests.append([{
		'email':'email@mail.com',
		'security_answer':'answer',
		'extra':'e'
	},{'success':False,'error_msg':'Too many or too few arguments'}])

	run_tests(tests,headers,url)

def test_logout():
	url = BASE_URL + '/logout'
	headers = {
	'Content-Type':'application/json'
	}
	data = {
		'token':token,
		'user_id':'2'
	}
	d1 = {
		'token':token,
		'user_id':'3'
	}
	d2 = {
		'token':token,
		'user_id':'1'
	}
	d5 = {
		'token':token,
		'user_id':'1'
	}
	d3 = {}
	d4 = {
		'token':token,
		'user_id':'2',
		'extra':'e'
	}
	headers['Content-Length'] = str(len(d3))
	r = requests.post(url = url,data = json.dumps(d3),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(d4))
	r = requests.post(url = url,data = json.dumps(d4),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(d5))
	r = requests.post(url = url,data = json.dumps(d5),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(d2))
	r = requests.post(url = url,data = json.dumps(d2),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(d1))
	r = requests.post(url = url,data = json.dumps(d1),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(data))
	r = requests.post(url = url,data = json.dumps(data),headers = headers)
	r = r.json()
	print(r)

def test_update_email():
	url = BASE_URL + '/profile/update/email'
	headers = {
	'Content-Type':'application/json'
	}
	data = {
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'2',
		'email':'newemail@mail.com'
	}
	d1 = {
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'a',
		'email':'m@mail.com'
	}
	d2 = {
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'1',
		'email':'m@mail.com'
	}
	d3 = {}
	d4 = {
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'2',
		'email':'m@mail.com',
		'extra':'e'
	}
	headers['Content-Length'] = str(len(d3))
	r = requests.post(url = url,data = json.dumps(d3),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(d4))
	r = requests.post(url = url,data = json.dumps(d4),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(d2))
	r = requests.post(url = url,data = json.dumps(d2),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(d1))
	r = requests.post(url = url,data = json.dumps(d1),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(data))
	r = requests.post(url = url,data = json.dumps(data),headers = headers)
	r = r.json()
	print(r)

def test_update_password():
	url = BASE_URL + '/profile/update/password'
	headers = {
	'Content-Type':'application/json'
	}
	data = {
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'2',
		'password':'newpassword'
	}
	d1 = {
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'a',
		'password':'password2'
	}
	d2 = {
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'1',
		'password':'password'
	}
	d3 = {}
	d4 = {
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'2',
		'password':'password3',
		'extra':'e'
	}
	headers['Content-Length'] = str(len(d3))
	r = requests.post(url = url,data = json.dumps(d3),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(d4))
	r = requests.post(url = url,data = json.dumps(d4),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(d2))
	r = requests.post(url = url,data = json.dumps(d2),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(d1))
	r = requests.post(url = url,data = json.dumps(d1),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(data))
	r = requests.post(url = url,data = json.dumps(data),headers = headers)
	r = r.json()
	print(r)

def test_delete_user():
	url = BASE_URL + '/profile/delete'
	headers = {
	'Content-Type':'application/json'
	}
	data = {
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'2'
	}
	d1 = {
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'a'
	}
	d2 = {
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'1'
	}
	d3 = {}
	d4 = {
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'2',
		'extra':'e'
	}
	headers['Content-Length'] = str(len(d3))
	r = requests.post(url = url,data = json.dumps(d3),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(d4))
	r = requests.post(url = url,data = json.dumps(d4),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(d2))
	r = requests.post(url = url,data = json.dumps(d2),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(d1))
	r = requests.post(url = url,data = json.dumps(d1),headers = headers)
	r = r.json()
	print(r)

	headers['Content-Length'] = str(len(data))
	r = requests.post(url = url,data = json.dumps(data),headers = headers)
	r = r.json()
	print(r)

def test_view_allergies():
	url = BASE_URL + '/allergies/view/user'
	headers = {
	'Content-Type':'application/json'
	}
	tests = []
	tests.append([{
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'2',
		'from_val':'0',
		'to_val':'2'
	},{'success':True}])
	tests.append([{
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'2',
		'from_val':'-1',
		'to_val':'2'
	},{'success':False,'error_msg':'Invalid from value'}])
	tests.append([{
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'2',
		'from_val':'-1',
		'to_val':'-2'
	},{'success':False,'error_msg':'Invalid from value'}])
	tests.append([{
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'2',
		'from_val':'1',
		'to_val':'-2'
	},{'success':False,'error_msg':'Invalid to value'}])
	tests.append([{
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'2',
		'from_val':'0',
		'to_val':'0'
	},{'success':False,'error_msg':'No Allergies Found'}])
	tests.append([{
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'2',
		'from_val':'8',
		'to_val':'8'
	},{'success':False,'error_msg':'No Allergies Found'}])
	tests.append([{},{'success':False,'error_msg':'Missing Arguments'}])
	tests.append([{
		'token':'ArjDTamreMoDbWytdTxGCIsjQMsiyDQgHJxdXbgRphcYLBjGju',
		'user_id':'2',
		'from_val':'8',
		'to_val':'8',
		'extra':'e'
	},{'success':False,'error_msg':'too many or too few arguments'}])
	run_tests(tests,headers,url)

def test_view_avail_allergies():
	url = BASE_URL + '/allergies/view/available'
	headers = {
	'Content-Type':'application/json'
	}
	tests = []
	tests.append([{
		'token':token,
		'user_id':'4',
		'from_val':'0',
		'to_val':'2'
	},{'success':True}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'from_val':'-1',
		'to_val':'2'
	},{'success':False,'error_msg':'Invalid from value'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'from_val':'-1',
		'to_val':'-2'
	},{'success':False,'error_msg':'Invalid from value'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'from_val':'1',
		'to_val':'-2'
	},{'success':False,'error_msg':'Invalid to value'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'from_val':'0',
		'to_val':'0'
	},{'success':False,'error_msg':'No Allergies Found'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'from_val':'8',
		'to_val':'8'
	},{'success':False,'error_msg':'No Allergies Found'}])
	tests.append([{},{'success':False,'error_msg':'Missing Arguments'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'from_val':'8',
		'to_val':'8',
		'extra':'e'
	},{'success':False,'error_msg':'too many or too few arguments'}])
	run_tests(tests,headers,url)

def test_add_allergies():
	url = BASE_URL + '/allergies/add'
	headers = {
	'Content-Type':'application/json'
	}
	tests = []
	tests.append([{
		'token':token,
		'user_id':'4',
		'allergies':[1,2,3,4,5,6],
	},{'success':True}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'allergies':[1,2,3,4,5,6],
		'new_allergy':'atest'
	},{'success':True}])
	tests.append([{
		'token':token,
		'user_id':'2',
		'allergies':[1,2,3]
	},{'success':False,'error_msg':'Unauthorized'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'from_val':'1',
		'to_val':'-2'
	},{'success':False,'error_msg':'Invalid to value'}])
	tests.append([{},{'success':False,'error_msg':'Missing Arguments'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'from_val':'8',
		'allergies':[1,2,3],
		'extra':'e',
		'extra2':'e2'
	},{'success':False,'error_msg':'Too many arguments'}])
	run_tests(tests,headers,url)

def test_get_meals_day():
	url = BASE_URL + '/meal/view'
	headers = {
	'Content-Type':'application/json'
	}
	tests = []
	tests.append([{
		'token':token,
		'user_id':'4',
		'year':'2019',
		'month':'3',
		'day':'27',
		'from_val':'0',
		'to_val':'2'
	},{'success':True}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'year':'-2019',
		'month':'-3',
		'day':'-27',
		'from_val':'-1',
		'to_val':'-2'
	},{'success':False,'error_msg':'Invalid date value'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'year':'2019',
		'month':'13',
		'day':'32',
		'from_val':'1',
		'to_val':'2'
	},{'success':False,'error_msg':'Invalid date value'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'year':'2019',
		'month':'10',
		'day':'30',
		'from_val':'-1',
		'to_val':'2'
	},{'success':False,'error_msg':'Invalid from value'}])
	tests.append([{},{'success':False,'error_msg':'Missing Arguments'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'year':'2019',
		'month':'11',
		'day':'2',
		'from_val':'1',
		'to_val':'-2'
	},{'success':False,'error_msg':'Invalid to value'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'year':'2019',
		'month':'12',
		'day':'1',
		'from_val':'0',
		'to_val':'0'
	},{'success':False,'error_msg':'No meals to Show'}])

	run_tests(tests,headers,url)

def test_get_meal_id():
	url = BASE_URL + '/meal/id/view'
	headers = {
	'Content-Type':'application/json'
	}
	tests = []
	tests.append([{
		'token':token,
		'user_id':'4',
		'meal_id':'2'
	},{'success':True}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'meal_id':'1'
	},{'success':False,'error_msg':'Server Error'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'meal_id':'1',
		'extra':'e'
	},{'success':False,'error_msg':'Too many arguments'}])
	tests.append([{},{'success':False,'error_msg':'Missing Arguments'}])

	run_tests(tests,headers,url)

def test_delete_recipe():
	url = BASE_URL + '/meal/id/delete'
	headers = {
	'Content-Type':'application/json'
	}
	tests = []
	tests.append([{
		'token':token,
		'user_id':'4',
		'calendar_id':'1'
	},{'success':True}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'calendar_id':'5'
	},{'success':False,'error_msg':'Server Error'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'calendar_id':'1',
		'extra':'e'
	},{'success':False,'error_msg':'Too many arguments'}])
	tests.append([{},{'success':False,'error_msg':'Missing Arguments'}])

	run_tests(tests,headers,url)

def test_add_meal():
	url = BASE_URL + '/meal/id/add'
	headers = {
	'Content-Type':'application/json'
	}
	tests = []
	tests.append([{
		'token':token,
		'user_id':'4',
		'recipe_id':'2',
		'month':'3',
		'day':'14',
		'year':'2019'
	},{'success':True}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'recipe_id':'1',
		'month':'3',
		'day':'14',
		'year':'2019'
	},{'success':False,'error_msg':'Server Error'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'recipe_id':'1',
		'month':'3',
		'day':'14',
		'year':'2019',
		'extra':'e'
	},{'success':False,'error_msg':'Too many arguments'}])
	tests.append([{},{'success':False,'error_msg':'Missing Arguments'}])

	run_tests(tests,headers,url)

def test_search():
	url = BASE_URL + '/meal/search'
	headers = {
	'Content-Type':'application/json'
	}
	tests = []
	tests.append([{
		'token':token,
		'user_id':'4',
		'meal_name':'Fried',
		'from_val':'0',
		'to_val':'2'
	},{'success':True}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'meal_name':'Fried',
		'from_val':'-1',
		'to_val':'-2'
	},{'success':False,'error_msg':'Invalid Input'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'meal_name':'Fried',
		'from_val':'1',
		'to_val':'2',
		'extra':'e'
	},{'success':False,'error_msg':'Too many arguments'}])
	tests.append([{},{'success':False,'error_msg':'Missing Arguments'}])
	tests.append([{
		'token':token,
		'user_id':'4',
		'meal_name':'Fried',
		'from_val':'0',
		'to_val':'0'
	},{'success':False,'error_msg':'No meals found'}])

	run_tests(tests,headers,url)

def test_sec_question():
	url = BASE_URL + '/auth/forgot/email'
	headers = {
	'Content-Type':'application/json'
	}
	tests = []
	tests.append([{
		'email':'email@mail.com'
	},{'success':True}])
	tests.append([{
		'email':'email@mail.com',
		'extra':'e'
	},{'success':False,'error_msg':'Too many or too few arguments'}])
	tests.append([{
		'email':'email2@mail.com'
	},{'success':False,'error_msg':'Invalid Username'}])
	tests.append([{},{'success':False,'error_msg':'Missing Arguments'}])

	run_tests(tests,headers,url)

test_logout()
#test_security_answer()
#test_register()
#test_login()
#test_update_email()
#test_update_password()
#test_delete_user()
#test_view_allergies()
#test_view_avail_allergies()
#test_add_allergies()
#test_get_meals_day()
#test_get_meal_id()
#test_delete_recipe()
#test_add_meal()
#test_search()
#test_sec_question()
