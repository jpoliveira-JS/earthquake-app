'use client'

import dynamic from 'next/dynamic'

import Sidebar from '@/components/Sidebar'
import { useEffect, useState } from 'react'
import { EarthquakeApiResponse } from '@/types/earthquake'
import { getDateXDaysAgo } from '@/utils/date'

const LazyMap = dynamic(() => import('@/components/EarthquakeMap'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

export default function Home() {
  const [data, setData] = useState<EarthquakeApiResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedCoords, setSelectedCoords] = useState<[number, number]>()

  const onClickItem = (coords: [number, number]) => {
    setSelectedCoords(coords)
    // This function can be used to handle clicks on sidebar items
  }

  useEffect(() => {
    async function fetchEarthquakes() {
      try {
        const startDate = getDateXDaysAgo(7)
        const endDate = getDateXDaysAgo(0)
        const res = await fetch(
          `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}`,
        )
        if (!res.ok) throw new Error('Failed to fetch data')
        const data: EarthquakeApiResponse = await res.json()
        setData(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchEarthquakes()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className='page-layout'>
      <Sidebar earthquakes={data?.features || []} onClickItem={onClickItem} />
      <LazyMap data={data} selectedCoords={selectedCoords} />
    </div>
  )
}
