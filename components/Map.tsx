'use client'

import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { LatLngTuple } from 'leaflet'

import { EarthquakeApiResponse } from '@/types/earthquake'
interface Props {
  data?: EarthquakeApiResponse
}

export default function Map({ data }: Props) {
  const center: LatLngTuple = [20, 0]

  const onEachFeature = (feature: any, layer: any) => {
    const { place, mag, time } = feature.properties
    layer.bindPopup(
      `<strong>${place}</strong><br>Magnitude: ${mag}<br>${new Date(
        time,
      ).toLocaleString()}`,
    )
  }

  const pointToLayer = (feature: any, latlng: L.LatLng) => {
    const magnitude = feature.properties.mag || 1
    return L.circleMarker(latlng, {
      radius: 4 + magnitude * 2,
      fillColor: '#ff5733',
      color: '#900C3F',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.7,
    })
  }

  return (
    <MapContainer
      center={center}
      zoom={6}
      scrollWheelZoom={true}
      className='map-container'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {data && (
        <GeoJSON
          data={data}
          onEachFeature={onEachFeature}
          pointToLayer={pointToLayer}
        />
      )}
    </MapContainer>
  )
}
