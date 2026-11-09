const Shapes = require('../models/shapes');

exports.getamd1 = async (req, res) => {
  const responseFeatureCollection = {};
  responseFeatureCollection['type'] = "FeatureCollection";
  responseFeatureCollection['features'] = [];
  const response = await Shapes.find({ "shapeType": "ADM1" }).limit(2).lean();
  response.forEach((eachShape) => {
    const tempObject = {};
    tempObject['geometry'] = eachShape['geometry'];
    delete eachShape['geometry'];
    console.log(eachShape);
    tempObject['properties'] = eachShape;
    responseFeatureCollection['features'].push(tempObject)
  });
  res.send(responseFeatureCollection);
}
