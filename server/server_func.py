import server_db
import hashlib

def get_security_question(email):
    e = get_sec_q(email)
    if e is not None:
        return e
    else:
        return None

def check_login(email):
    e = check_token_exists(email)
    return e

def login_user(email,password):
    password = hashlib.sha256(password).hexdigest()
    e = login_user_func(email,password)
    return e

def get_token(email):
    e = get_token_func(email)
    return e

def get_user_id(email):
    e = get_user_id_func(email)
    return e

def check_user_exists(email):
    e = check_user_exists_func(email)
    return e

def register(fname,lname,sec_q,sec_a,email,passw):
    passw = hashlib.sha256(passw).hexdigest()
    e = register_user(fname,lname,sec_q,sec_a,email,passw)
    return e

def test_answer(email,sec_a):
    e = check_answer(email,sec_a)
    return e

def check_log_in(token,user_id):
    return check_log_in_func(user_id,token)

def log_out(user_id):
    return logout_user(user_id)

def update_email(email,user_id):
    return update_email_func(email,user_id)

def update_password(user_id,new_p):
    new_p = hashlib.sha256(new_p).hexdigest()
    return update_password_func(user_id,new_p)

def delete_user(user_id):
    return delete_user_func(user_id)

def get_allergies_for_user(user_id,from_val,to_val):
    return view_user_allergies(user_id,from_val,to_val)
