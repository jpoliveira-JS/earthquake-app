'use client'

import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { LatLngTuple } from 'leaflet'

import { EarthquakeApiResponse, EarthquakeFeature } from '@/types/earthquake'
import { useEffect, useRef } from 'react'
interface Props {
  data?: EarthquakeApiResponse
  selectedCoords?: [number, number]
}

export default function EarthquakeMap({ data, selectedCoords }: Props) {
  const center: LatLngTuple = [20, 0]
  const mapRef = useRef<L.Map>(null)
  const layerRef = useRef<Map<string, L.Layer>>(new Map())

  // eslint-disable-next-line
  const onEachFeature = (feature: EarthquakeFeature, layer: any) => {
    const { place, mag, time } = feature.properties
    layer.bindPopup(
      `<strong>${place}</strong><br>Magnitude: ${mag}<br>${new Date(
        time,
      ).toLocaleString('en-GB')}`,
    )

    layerRef.current.set(feature.id, layer)
  }

  const pointToLayer = (feature: EarthquakeFeature, latlng: L.LatLng) => {
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

  useEffect(() => {
    if (!selectedCoords || !mapRef.current || !data) return

    const map = mapRef.current
    const [lat, lng] = selectedCoords

    //center the map
    map.setView([lat, lng], 6)

    const match = data.features.find(
      f =>
        f.geometry.coordinates[1] === lat && f.geometry.coordinates[0] === lng,
    )

    if (match) {
      const layer = layerRef.current.get(match.id)
      if (layer) {
        layer.openPopup()
      }
    }
  }, [selectedCoords, data, mapRef])

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={3}
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
