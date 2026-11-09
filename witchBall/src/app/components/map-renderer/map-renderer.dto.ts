export type Shapes = {
  type: "Feature";
  geometry: {
    type: "Point" | "LineString" | "Polygon" | "MultiPolygon";
    coordinates: [[number, number]] | [[[number, number]]] | [[[[ number, number ]]]] ;
  };
  properties: {
    shapeName: string;
    shapeISO: string;
    shapeID: string;
    shapeGroup: string;
    shapeType: string;
    _id: string;
  }
}

export type GeoJSON = {
  type: "FeatureCollection";
  features: [Shapes];
}
