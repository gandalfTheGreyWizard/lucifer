import shapefile
import json
from argparse import ArgumentParser
from os import listdir
from os.path import isfile, join
from pymongo import MongoClient
from dotenv import dotenv_values

config = dotenv_values('.env')

try:
    client = MongoClient(config['MONGO_CONNECTION_URL'])
except Exception as e:
    print("Could not connect to mongo, make sure the mongo connection url is correct in .env")
    print(e)

shape_file_db = client['shapes']
shapes_collection = shape_file_db['shapes']

parser = ArgumentParser(prog="shape_files_parser", description="Convert shape files to geojson")
parser.add_argument("-i", "--input", dest="input", help="Input shape file path")
parser.add_argument("-o", "--output", dest="output", help="Output geojson file path")

def write_to_file(json_object, path):
    with open(path, 'w') as f:
        f.write(json.dumps(json_object))
args = parser.parse_args()


# try:
    # sf = shapefile.Reader(args.input)
# except Exception as e:
    # print(e)
    # exit(1)
# for index,each_shape in enumerate(sf.shapeRecords()):
    # feature_collection['features'].append(each_shape)
def insert_shapes_to_mongo():
    try:
        feature_collection = {
            "type": "FeatureCollection",
            "features": []
        }
        sf = shapefile.Reader(args.input)
        feilds = sf.fields[1:]
        feild_names = [field[0] for field in feilds]
        for each_shape_records in sf.shapeRecords():
            print(feild_names)
            record = each_shape_records.record
            feature = {
                    "type": "Feature",
                    "geometry": {},
                    }
            properties = dict(zip(feild_names, record))
            feature.update(properties)
            feature['geometry'] = each_shape_records.shape.__geo_interface__
            try:
                inserted_object = shapes_collection.insert_one(feature)
                print("inserted object {}".format(inserted_object))
            except Exception as e:
                print(e)
    except Exception as e:
        print(e)


def generate_feature_collections_as_json():
    feature_collection = {
        "type": "FeatureCollection",
        "features": []
    }
    try:
        # onlyfiles = [f for f in listdir(args.input) if isfile(join(args.input, f))]
        shapefiles = [f for f in listdir(args.input) if f.split(".")[-1] == "shp"]
        print(shapefiles[1:])
        exit
        for each_file in shapefiles[1:]:
            sf = shapefile.Reader(args.input + each_file)
            print('processing file', each_file)
            feilds = sf.fields[1:]
            feild_names = [field[0] for field in feilds]
            for each_shape_records in sf.shapeRecords():
                print(feild_names)
                record = each_shape_records.record
                print(record)
                feature = {
                        "type": "Feature",
                        "geometry": {},
                        "properties": dict(zip(feild_names, record))
                        }
                feature['geometry'] = each_shape_records.shape.__geo_interface__
                feature_collection['features'].append(feature)
        # write_to_file(feature_collection, '{}feature_collection_new.geojson'.format(args.output))
    except Exception as e:
        print(e)

insert_shapes_to_mongo()
