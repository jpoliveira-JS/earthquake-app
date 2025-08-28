'use client'

import { EarthquakeFeature } from '@/types/earthquake'

interface Props {
  earthquakes: EarthquakeFeature[]
  onClickItem: (coords: [number, number]) => void
}

export default function Sidebar({ earthquakes, onClickItem }: Props) {
  return (
    <aside className='sidebar'>
      <h2>Earthquakes</h2>
      <ul>
        {earthquakes.map(eq => (
          <li
            key={eq.id}
            onClick={() =>
              onClickItem([
                eq.geometry.coordinates[1],
                eq.geometry.coordinates[0],
              ])
            }
            className='my-2 cursor-pointer hover:underline'
          >
            <strong>{eq.properties.place}</strong> — Mag {eq.properties.mag}
          </li>
        ))}
      </ul>
    </aside>
  )
}
