export interface EarthquakeFeature {
  type: "Feature",
  properties: {
    mag: number,
    place: string,
    time: number,
    updated: number,
    tz: number,
    url: string,
    detail: string,
    felt:number,
    cdi: number,
    mmi: number,
    alert: string,
    status: string,
    tsunami: number,
    sig:number,
    net: string,
    code: string,
    ids: string,
    sources: string,
    types: string,
    nst: number,
    dmin: number,
    rms: number,
    gap: number,
    magType: string,
    type: string
  },
  geometry: {
    type: "Point",
    coordinates: [
      number, // longitude,
      number, // latitude,
      number  // depth
    ]
  },
  id: string
}


export interface EarthquakeApiResponse {
  type: "FeatureCollection"
  features: EarthquakeFeature[]
}