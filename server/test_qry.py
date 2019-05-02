import mysql.connector
import string
import random

mydb = mysql.connector.connect(
    host="localhost",
    user="testuser",
    password="password",
    database="test_db"
)

mycursor = mydb.cursor()

def get_sec_q(email):
    try:
        if check_user_exists_func(email) is False:
            return None
        query = """"SELECT security_question FROM user WHERE email=%s AND active=1"""
        vars = (email,)
        mycursor.execute(query, vars)
        result = mycursor.fetchone()
        if result is not None:
            result = result[0]
            result = result.encode('ascii', 'ignore')
            mydb.commit()
            return result
        else:
            mydb.commit()
            return None
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed Query: {}".format(error))
        return None

def register_user(fname,lname,sec_q,sec_a,email,ph):
    try:
        if check_user_exists_func(email) is True:
            return False
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
        connection.rollback()
        print("Failed to insert {}".format(error))
        return False

def check_user_exists_func(email):
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
        connection.rollback()
        print("Failed to check {}".format(error))
        return True

def login_user_func(email,ph):
    if check_user_exists_func(email) is False:
        return False
    if check_token_exists(email) is True:
        return False
    try:
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
        connection.rollback()
        print("Failed to check {}".format(error))
        return True

def check_token_exists(email):
    if check_user_exists_func(email) is False:
        return False
    try:
        query = """
        SELECT COUNT(*) FROM auth_token WHERE expires_at < now() AND
        user_id = (SELECT id FROM user WHERE email=%s AND active=1)
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
        connection.rollback()
        print("Failed to check {}".format(error))
        return True

def generate_random_token(length):
    return ''.join(random.choice(string.ascii_letters) for m in xrange(length))

def create_token(email):
    try:
        token = generate_random_token(50)
        query = """
        INSERT INTO auth_token(user_id,token)
        VALUES ((SELECT id FROM user WHERE email=%s AND active=1),%s)
        """
        vars = (email,token)
        mycursor.execute(query,vars)
        return True
        mydb.commit()
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def get_token_func(email):
    if check_user_exists_func(email) is not True:
        return None
    if check_token_exists(email) is not True:
        return None
    try:
        query = """SELECT token FROM auth_token WHERE
        expires_at > now() AND user_id=(SELECT id FROM user WHERE email=%s AND active=1)"""
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
        connection.rollback()
        print("Failed to check {}".format(error))
        return None

def get_user_id_func(email):
    if check_user_exists_func(email) is not True:
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
        connection.rollback()
        print("Failed to check {}".format(error))
        return None

def check_user_valid(user_id):
    try:
        query="""SELECT COUNT(*) FROM user WHERE id=%s AND active=1"""
        vars = (user_id,)
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

def check_log_in_func(user_id,token):
    if check_user_valid(user_id) is False:
        return False
    try:
        query="""SELECT COUNT(*) FROM auth_token WHERE user_id=%s AND
        token=%s AND expires_at > now()"""
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

def logout_user(user_id):
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
    if check_user_exists_func(email) is False:
        return False
    try:
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

def update_password_func(user_id, new_password):
    try:
        query = """UPDATE user SET password=%s WHERE user_id=%s AND active=1"""
        vars = (new_password, user_id,)
        mycursor.execute(query, vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def update_email_func(user_id,new_email):
    try:
        query = """UPDATE user SET email=%s WHERE user_id=%s AND active=1"""
        vars = (new_email, user_id,)
        mycursor.execute(query, vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def delete_user_func(user_id):
    try:
        query = """UPDATE user SET active=0 WHERE user_id=%s AND active=1"""
        vars = (new_email,user_id,)
        mycursor.execute(query,vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def view_user_allergies(user_id,fv,tv):
    try:
        query = """SELECT name FROM allergies t1 INNER JOIN user_allergies t2
         ON t1.allergy_id=t2.allergy_id WHERE user_id=%s AND active=1"""
        vars = (user_id,)
        mycursor.execute(query,vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def view_avail_allergies(): #fixed, should display allergy table, not user allergy table
    try:
        query = """SELECT * FROM allergy ORDER BY name"""
        vars = ()
        mycursor.execute(query, vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def update_user_allergies(user_id,allergy_id): #adding allergy to
    try:
        query = """SELECT name FROM allergies t1 INNER JOIN user_allergies t2
         ON t1.allergy_id=t2.allergy_id WHERE user_id=%s AND active=1"""
        vars = (user_id, allergy_id,)
        mycursor.execute(query, vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def add_new_allergy(allergy_name, allergy_desc): #edited, query should work
    try:
        query = """INSERT INTO allergy (name,description) VALUES (%s,%s)"""
        vars = (allergy_name)
        mycursor.execute(query, vars)
        mydb.commit()
        addToUser = update_user_allergies()
        return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def view_all_meals(): #displays recipes by name and pic_url
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

def view_meals_for_user(user_id): # should work maybe i think
    try:
        query = """SELECT name,pic_url FROM recipe INNER JOIN calendar on recipe.id=calendar.recipe_id WHERE user_id=1;"""
        vars = (user_id)
        mycursor.execute(query, vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def view_meal(recipe_id): #should work i think
    try:
        query = """SELECT name, prep_time, directions, pic_url, servings FROM recipe WHERE id=%s"""
        vars = (recipe_id)
        mycursor.execute(query, vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def delete_meal(calendar_id): # query works
    try:
        query = """DELETE FROM calendar where id=%s"""
        vars = (calendar_id)
        mycursor.execute(query, vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def add_meal(user_id,recipe_id,date): #query works
    try:
        query = """INSERT INTO calendar (user_id, recipe_id, date) VALUES (%s,%s,%s)"""
        vars = (user_id, recipe_id, date,)
        mycursor.execute(query, vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False

def search_meal(meal_name):
    try:
        query = """SELECT name FROM recipes WHERE name LIKE %s%"""
        vars = (meal_name,)
        mycursor.execute(query, vars)
        mydb.commit()
        return True
    except mysql.connector.Error as error:
        connection.rollback()
        print("Failed to check {}".format(error))
        return False
