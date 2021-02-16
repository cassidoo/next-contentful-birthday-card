import { useState } from 'react'
import Link from 'next/link'
import { Listbox, ListboxOption } from '@reach/listbox'
import '@reach/listbox/styles.css'

export default function Form({ cards }) {
  let [to, setTo] = useState('')
  let [from, setFrom] = useState('')
  let [selectedSlug, setSelectedSlug] = useState('upgrade')

  return (
    <div>
      <input
        type="text"
        placeholder="To:"
        value={to}
        onChange={(e) => {
          setTo(e.target.value)
        }}
      />
      <input
        type="text"
        placeholder="From:"
        value={from}
        onChange={(e) => {
          setFrom(e.target.value)
        }}
      />
      <Listbox value={selectedSlug} onChange={setSelectedSlug}>
        {cards.map((card) => {
          return <ListboxOption value={card.slug}>{card.message}</ListboxOption>
        })}
      </Listbox>
      Give this link to your friends! <br />
      <Link href={`/card/${selectedSlug}?to=${to}&from=${from}`}>
        <a>Wee</a>
      </Link>
    </div>
  )
}
