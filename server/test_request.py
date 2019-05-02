import requests
import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="testuser",
    password="password",
    database="test_db"
)

c = db.cursor()

def add_recipe(name,directions,pic_url,prep_time,servings):
    try:
        query = """SELECT COUNT(*) FROM recipe WHERE name=%s AND directions=%s AND prep_time=%s AND servings=%s AND pic_url=%s"""
        vars = (name,directions,prep_time,servings,pic_url,)
        c.execute(query,vars)
        result = c.fetchone()
        count = result[0]
        db.commit()
        if count==0:
            query = """INSERT INTO recipe(name,directions,prep_time,servings,pic_url) VALUES(%s,%s,%s,%s,%s)"""
            vars = (name,directions,prep_time,servings,pic_url)
            c.execute(query,vars)
            db.commit()
        else:
            return
    except mysql.connector.Error as error:
        db.rollback()
        print("Failed Query: {}".format(error))
        return

def get_recipe_id(name,directions,pic_url,prep_time,servings):
    try:
        query="""SELECT id FROM recipe WHERE name=%s AND directions=%s AND prep_time=%s AND servings=%s AND pic_url=%s"""
        vars = (name,directions,prep_time,servings,pic_url,)
        c.execute(query,vars)
        result = c.fetchone()
        db.commit()
        if result is None:
            return None
        else:
            return result[0]
    except mysql.connector.Error as error:
        db.rollback()
        print("Failed Query: {}".format(error))
        return

def get_ingredient_id(name,image):
    try:
        query="""SELECT id FROM ingredient WHERE name=%s AND image=%s"""
        vars = (name,image,)
        c.execute(query,vars)
        result = c.fetchone()
        db.commit()
        if result is None:
            return None
        else:
            return result[0]
    except mysql.connector.Error as error:
        db.rollback()
        print("Failed Query: {}".format(error))
        return

def add_ingredient(name,image):
    try:
        query = """SELECT COUNT(*) FROM ingredient WHERE name=%s AND image=%s"""
        vars = (name,image,)
        c.execute(query,vars)
        result = c.fetchone()
        count = result[0]
        db.commit()
        if count==0:
            query = """INSERT INTO ingredient(name,image) VALUES(%s,%s)"""
            vars = (name,image)
            c.execute(query,vars)
            db.commit()
        else:
            return
    except mysql.connector.Error as error:
        db.rollback()
        print("Failed Query: {}".format(error))
        return

def add_ingredient_recipe(recipe_id,ingredient_id,amount,unit):
    try:
        query = """INSERT INTO recipe_ingredient(recipe_id,ingredient_id,amount,unit) VALUES(%s,%s,%s,%s)"""
        vars = (recipe_id,ingredient_id,amount,unit)
        c.execute(query,vars)
        db.commit()
        return
    except mysql.connector.Error as error:
        db.rollback()
        print("Failed Query: {}".format(error))
        return

api_key = "cc251b0882msh0c9bd1b8a8810eap1e6266jsn7f0b08dc3551"

for j in range(10,41):
    URL = """https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/{}/information""".format(j)
    headers = {"X-RapidAPI-Key":api_key}

    r = requests.get(url=URL,headers=headers)

    data = r.json()
    recipe_name = data['title']
    directions = data['instructions']
    pic_url = data['image']
    prep_time = data['readyInMinutes']
    servings = data['servings']
    add_recipe(recipe_name,directions,pic_url,prep_time,servings)
    print("Added Recipe")
    recipe_id = get_recipe_id(recipe_name,directions,pic_url,prep_time,servings)
    ingredients = data['extendedIngredients']
    for i in ingredients:
        name = i['name']
        image = i['image']
        amount = i['amount']
        unit = i['unit']
        add_ingredient(name,image)
        ingredient_id=get_ingredient_id(name,image)
        add_ingredient_recipe(recipe_id,ingredient_id,amount,unit)
    print("Added Ingredient")
    print("Done with {} iteration".format(j))
