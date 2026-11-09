from pymongo import MongoClient
from dotenv import dotenv_values

config = dotenv_values()
try:
    client = MongoClient(config['MONGO_CONNECTION_URL'])
    db = client['shapes']
    shapes_collection = db['shapes']
except Exception as e:
    print('could not connect to mongo ')

def find_one():
    shapes_collection.find_one();
    query_dict = {}
    query_dict['shapeType'] = "ADM3"
    adm3_objects = shapes_collection.find(query_dict)
    for each_object in adm3_objects:
        print(each_object)

find_one()
