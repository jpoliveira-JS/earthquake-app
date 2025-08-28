export interface EarthquakeFeature {
  id: string
  properties: {
    place: string
    mag: number
    time: number
  }
  geometry: {
    type: string
    coordinates: [number, number, number]
  }
}

export interface EarthquakeApiResponse {
  type: "Point" | "MultiPoint" | "LineString" | "MultiLineString" | "Polygon" | "MultiPolygon" | "GeometryCollection" | "Feature" | "FeatureCollection"
  features: EarthquakeFeature[]
}