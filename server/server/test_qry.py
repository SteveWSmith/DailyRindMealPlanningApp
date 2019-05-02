import mysql.connector
import string
import random
import hashlib
import datetime

mydb = mysql.connector.connect(
    host="localhost",
    user="testuser",
    password="password",
    database="test_db"
)

mycursor = mydb.cursor(buffered=True)

def get_sec_q(email):
    try:
        if check_user_exists(email) is False:
            return None
        query = """SELECT security_question FROM user WHERE email=%s AND active=1"""
        vars = (email,)
        mycursor.execute(query, vars)
        result = mycursor.fetchone()
        mydb.commit()
        if result is not None:
            result = result[0]
            result = result.encode('ascii', 'ignore')
            return result
        else:
            return None
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed Query: {}".format(error))
        return None

def register(fname,lname,sec_q,sec_a,email,ph):
    try:
        ph = hashlib.sha256(ph).hexdigest()
        sec_a = hashlib.sha256(sec_a).hexdigest()
        query = """
        INSERT INTO user
        (email,password_hash,fname,lname,security_question,security_answer)
        VALUES(%s,%s,%s,%s,%s,%s)
        """
        vars = (email, ph, fname, lname, sec_q, sec_a)
        mycursor.execute(query, vars)
        mydb.commit()
        print("Insert Successful")
        return True
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to insert {}".format(error))
        return False

def check_user_exists(email):
    try:
        query = """
        SELECT COUNT(*) FROM user WHERE email=%s AND active=1
        """
        vars = (email,)
        mycursor.execute(query,vars)
        result = mycursor.fetchone()
        count = result[0]
        mydb.commit()
        if count == 0:
            return False
        else:
            return True
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return True

def login_user(email,ph):
    if check_user_exists(email) is False:
        return False
    if check_token_exists(email) is True:
        return False
    try:
        ph = hashlib.sha256(ph).hexdigest()
        query = """
        SELECT COUNT(*) FROM user WHERE email=%s AND password_hash=%s
         AND active=1"""
        vars = (email,ph,)
        mycursor.execute(query,vars)
        result = mycursor.fetchone()
        count = result[0]
        mydb.commit()
        if count == 0:
            return False
        else:
            r = create_token(email)
            if r is True:
                return True
            else:
                return False
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return True

def check_token_exists(email):
    try:
        query = """
        SELECT COUNT(*) FROM auth_token, user WHERE auth_token.expires_at > now() AND
        auth_token.user_id = user.id AND user.email=%s AND user.active=1
        """
        vars = (email,)
        mycursor.execute(query, vars)
        result = mycursor.fetchone()
        count = result[0]
        mydb.commit()
        if count == 0:
            return False
        else:
            return True
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return True

def generate_random_token(length):
    return ''.join(random.choice(string.ascii_letters) for m in xrange(length))

def create_token(email):
    try:
        token = generate_random_token(50)
        query = """
        INSERT INTO auth_token(user_id,created_at,expires_at,token)
        VALUES ((SELECT id FROM user WHERE email=%s AND active=1),%s,%s,%s)
        """
        created_at = datetime.datetime.now()
        expires_at = created_at + datetime.timedelta(days=2)
        vars = (email,created_at,expires_at,token)
        mycursor.execute(query,vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return False

def get_token(email):
    try:
        query = """SELECT token FROM auth_token,user WHERE auth_token.expires_at > now() AND user.id=auth_token.user_id AND user.email=%s AND user.active=1"""
        vars = (email,)
        mycursor.execute(query,vars)
        result = mycursor.fetchone()
        if result is None:
            mydb.commit()
            return None
        else:
            result = result[0]
            mydb.commit()
            return result
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return None

def get_user_id(email):
    if check_user_exists(email) is not True:
        return None
    try:
        query ="""SELECT id FROM user WHERE email=%s AND active=1"""
        vars = (email,)
        mycursor.execute(query,vars)
        result = mycursor.fetchone()
        mydb.commit()
        if result is None:
            return None
        else:
            result = result[0]
            return result
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return None

def check_user_valid(user_id):
    try:
        query="""SELECT COUNT(*) FROM user WHERE id=%s AND active=1"""
        vars = (user_id,)
        mycursor.execute(query,vars)
        result = mycursor.fetchone()
        result = result[0]
        print(result==0)
        mydb.commit()
        if result == 0:
            return False
        else:
            return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def check_logged_in(user_id,token):
    if check_user_valid(user_id) is False:
        return False
    try:
        query="""SELECT COUNT(*) FROM auth_token AS au, user AS u WHERE au.user_id=%s AND
        au.token=%s AND au.expires_at > now() AND u.active=1"""
        vars = (user_id,token,)
        mycursor.execute(query,vars)
        result = mycursor.fetchone()
        result = result[0]
        mydb.commit()
        if result == 0:
            return False
        else:
            return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def logout(user_id):
    if check_user_valid(user_id) is False:
        return False
    try:
        query = """UPDATE auth_token SET expires_at=now() WHERE
        user_id=%s AND expires_at>now()"""
        vars = (user_id,)
        mycursor.execute(query, vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def check_answer(email,answer):
    if check_user_exists(email) is False:
        return False
    try:
        answer = hashlib.sha256(answer).hexdigest()
        print(answer)
        query = """SELECT COUNT(*) FROM user WHERE email=%s AND security_answer=%s AND active=1"""
        vars = (email, answer,)
        mycursor.execute(query, vars)
        result = mycursor.fetchone()
        mydb.commit()
        result = result[0]
        if result == 0:
            return False
        else:
            return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return None

def update_password(user_id, new_password):
    try:
        new_password = hashlib.sha256(new_password).hexdigest()
        query = """UPDATE user SET password_hash=%s WHERE id=%s AND active=1"""
        vars = (new_password, user_id,)
        mycursor.execute(query, vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return False

def update_email(user_id,new_email):
    try:
        query = """UPDATE user SET email=%s WHERE id=%s AND active=1"""
        vars = (new_email, user_id,)
        mycursor.execute(query, vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return False

def delete_user(user_id):
    try:
        query = """UPDATE user SET active=0 WHERE id=%s AND active=1"""
        vars = (user_id,)
        mycursor.execute(query,vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return False

def view_user_allergies(user_id,fv,tv):
    try:
        query = """SELECT DISTINCT au.id,au.allergy_id,name FROM allergy AS a,user AS u, user_allergy AS au
        WHERE a.id=au.allergy_id AND u.active=1 AND au.user_id=%s LIMIT %s,%s"""
        vars = (user_id,fv,tv,)
        mycursor.execute(query,vars)
        result = mycursor.fetchall()
        print(result)
        if len(result)>0:
            allergies = []
            for i in result:
                print(i)
                temp = {}
                temp['id']=i[0]
		temp['allergy_id']=i[1]
                temp['name']=i[2]
                allergies.append(temp)
            for i in allergies:
                print(i)
            return allergies
        else:
            return []
        mydb.commit()
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return None

def view_avail_allergies(fv,tv):
    try:
        query = """SELECT id,name FROM allergy LIMIT %s,%s"""
        vars = (fv,tv,)
        mycursor.execute(query, vars)
        result = mycursor.fetchall()
        print(result)
        if len(result)>0:
            allergies = []
            for i in result:
                print(i)
                temp = {}
                temp['id']=i[0]
                temp['name']=i[1]
                allergies.append(temp)
            for i in allergies:
                print(i)
            return allergies
        else:
            return []
        mydb.commit()
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return None

def update_user_allergies(user_id,allergies):
    try:
        query = """DELETE FROM user_allergy WHERE user_id=%s"""
        vars = (int(user_id),)
        mycursor.execute(query, vars)
        mydb.commit()
        for i in allergies:
            print(i)
            query = """INSERT INTO user_allergy(allergy_id,user_id) VALUES(%s,%s)"""
            vars = (int(i),int(user_id))
            mycursor.execute(query,vars)
            mydb.commit()
        return True
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return False

def add_new_allergy(allergy_name):
    try:
        query3 = """SELECT COUNT(*) FROM allergy WHERE name=%s"""
        vars3 = (allergy_name,)
        mycursor.execute(query3,vars3)
        mydb.commit()
        result = mycursor.fetchone()
        print("result from select is {}".format(result))
        if result[0]!=0:
            return result[0]
        else:
            query = """INSERT INTO allergy(name) VALUES( %s )"""
            vars = (allergy_name,)
            mycursor.execute(query, vars)
            print("allergy added")
            mydb.commit()
            query2 = """SELECT id FROM allergy WHERE name=%s"""
            vars2 = (allergy_name,)
            mycursor.execute(query2,vars2)
            mydb.commit()
            result = mycursor.fetchone()
            print("result from select is {}".format(result))
            if result is not None:
                return result[0]
            else:
                return None
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return None

def view_all_meals():
    try:
        query = """SELECT name, pic_url FROM recipes ORDER BY name"""
        vars = ()
        mycursor.execute(query, vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def view_meals_for_user(user_id,date,fv,tv):
    try:
        query = """SELECT c.id,r.id,r.name, r.pic_url FROM calendar AS c, recipe AS r
         WHERE c.user_id=%s AND r.id=c.recipe_id LIMIT %s,%s"""
        vars = (user_id,fv,tv)
        mycursor.execute(query, vars)
        result = mycursor.fetchall()
        mydb.commit()
        if len(result)==0:
            return []
        print(result)
        meals = []
        for i in result:
            temp = {
                'calendar_id':i[0],
                'meal_id':i[1],
                'name':i[2],
                'pic_url':i[3]
            }
            meals.append(temp)
        return meals
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return None

def view_meal(recipe_id):
    try:
        #print("recipe_id={}".format(recipe_id))
        query = """SELECT name, prep_time, directions, pic_url, servings FROM recipe WHERE id=%s"""
        vars = (recipe_id,)
        mycursor.execute(query, vars)
        result = mycursor.fetchone()
        #print("result from top query is")
        #print(result)
        mydb.commit()
        if result is None:
            return None
        else:
            temp = {
                'meal_name':result[0],
                'meal_prep_time':result[1],
                'meal_directions':result[2],
                'meal_img_url':result[3],
                'meal_servings':result[4]
            }
            query = """SELECT ingredient_id,amount,unit FROM recipe_ingredient WHERE recipe_id=%s"""
            vars = (recipe_id,)
            mycursor.execute(query,vars)
            result = mycursor.fetchall()
            mydb.commit()
            if result is None:
                return None
            else:
                l = []
                for i in result:
                    t = {
                        'amount':i[1],
                        'unit':i[2]
                    }
                    query = """SELECT name FROM ingredient WHERE id=%s"""
                    vars = (i[0],)
                    mycursor.execute(query,vars)
                    r = mycursor.fetchone()
                    t['name']=r[0]
                    l.append(t)
                temp['meal_ingredients']=l
                return temp
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return False

def delete_meal(calendar_id):
    try:
        query = """DELETE FROM calendar where id=%s"""
        vars = (calendar_id,)
        mycursor.execute(query, vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def add_meal(user_id,recipe_id,date):
    try:
        query = """SELECT COUNT(*) FROM recipe WHERE id = %s"""
        vars = (recipe_id,)
        mycursor.execute(query, vars)
        result = mycursor.fetchone()
        mydb.commit()
        if result[0]==0:
            return False
        query = """INSERT INTO calendar (user_id, recipe_id, date) VALUES (%s,%s,%s)"""
        vars = (user_id, recipe_id, date,)
        mycursor.execute(query, vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return False

def search_meals(meal_name,from_val,to_val):
    try:
        meal_name = "%{}%".format(meal_name)
        query = """SELECT id,name,pic_url FROM recipe
        WHERE name LIKE %s LIMIT %s,%s"""
        vars = (meal_name,from_val,to_val,)
        mycursor.execute(query, vars)
        result = mycursor.fetchall()
        mydb.commit()
        if result is None:
            return []
        else:
            temp_ar = []
            for i in result:
                temp = {
                    'id':i[0],
                    'name':i[1],
                    'img_url':i[2]
                }
                temp_ar.append(temp)
            return temp_ar
    except mysql.connector.Error as error:
        mydb.rollback()
        print("Failed to check {}".format(error))
        return None

#view_user_allergies(2,0,4)
#update_user_allergies(4,[1,2,3,4,5])
view_meal(3)
