'use client'

import { EarthquakeFeature } from '@/types/earthquake'

interface Props {
  earthquakes: EarthquakeFeature[]
}

export default function Sidebar({ earthquakes }: Props) {
  return (
    <aside className='sidebar'>
      <h2>Earthquakes</h2>
      <ul>
        {earthquakes.map(eq => (
          <li key={eq.id}>
            <strong>{eq.properties.place}</strong> — Mag {eq.properties.mag}
          </li>
        ))}
      </ul>
    </aside>
  )
}
