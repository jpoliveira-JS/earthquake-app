'use client'

import { EarthquakeFeature } from '@/types/earthquake'
import { useState } from 'react'

interface Props {
  earthquakes: EarthquakeFeature[]
  onClickItem: (coords: [number, number]) => void
  changeParams: (newParams: { minMag: number; days: number }) => void
  currentParams: { minMag: number; days: number }
}

export default function Sidebar({
  earthquakes,
  onClickItem,
  changeParams,
  currentParams,
}: Props) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const minMagMatch = query.match(/magnitude\s+(\d+)/i)
    const daysMatch = query.match(/last\s+(\d+)\s+days?/i)

    changeParams({
      minMag: minMagMatch ? Number(minMagMatch[1]) : 3,
      days: daysMatch ? Number(daysMatch[1]) : 7,
    })
  }

  return (
    <aside className='sidebar'>
      <div className='sticky top-0 pt-4 pb-2 bg-white z-10'>
        <h1 className='text-xl font-bold pb-2'>
          Earthquakes above Magnitude {currentParams.minMag}
          <br /> in the last {currentParams.days} days
        </h1>
        <p className='text-gray-500'>
          To filter simply type an expression using these keywords:
          <br />
          magnitude 4 - sets minimum magnitude to 4<br />
          last 30 days - sets the time range to the last 30 days
        </p>
        <form
          onSubmit={handleSubmit}
          className='my-2 flex flex-row gap-2 items-center'
        >
          <input
            type='text'
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='e.g. "Magnitude 6 in the last 30 days"'
            className='border p-2 rounded w-full'
          />
          <button
            type='submit'
            className='mr-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer'
          >
            Search
          </button>
        </form>
      </div>
      <ul>
        {earthquakes.map(eq => {
          const date = new Date(eq.properties.time).toLocaleString('en-GB')
          return (
            <li
              key={eq.id}
              onClick={() =>
                onClickItem([
                  eq.geometry.coordinates[1],
                  eq.geometry.coordinates[0],
                ])
              }
              className='my-4 cursor-pointer group flex flex-row'
            >
              <div className='mr-4 self-center min-w-[50px] text-center p-2 bg-red-500 text-white font-bold rounded'>
                <strong>{eq.properties.mag.toFixed(1)}</strong>
              </div>
              <div className='overflow-hidden flex flex-col group-hover:underline'>
                <strong className='truncate'>{eq.properties.place}</strong>
                <p>{date}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
