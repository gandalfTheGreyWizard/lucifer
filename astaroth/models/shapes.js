const mongoose = require('mongoose');

const GeometrySchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["Point", "LineString", "Polygon", "Multipolygon"],
  },
  coordinates: {
    type: mongoose.Schema.Types.Mixed
  }
});

const ShapesSchema = mongoose.Schema({
  type: String,
  shapeName: String,
  shapeIso: String,
  shapeID: String,
  shapeGroup: String,
  shapeType: String,
  geometry: GeometrySchema
});

module.exports = mongoose.model('shapes', ShapesSchema);

