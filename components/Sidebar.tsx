'use client'

import { EarthquakeFeature } from '@/types/earthquake'

interface Props {
  earthquakes: EarthquakeFeature[]
  onClickItem: (coords: [number, number]) => void
}

export default function Sidebar({ earthquakes, onClickItem }: Props) {
  return (
    <aside className='sidebar '>
      <h2>Earthquakes</h2>
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
