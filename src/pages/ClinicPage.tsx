import { Search } from 'lucide-react'
import { useState } from 'react'
import { Disclaimer } from '../components/EmergencyHelp'
import { CLINICS } from '../store/useAppStore'
import clinicIcon from '../assets/images/find-help-icon.png'

export function ClinicPage() {
  const [query, setQuery] = useState('')

  const filtered = CLINICS.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-4xl text-[#0b0b0b]">
        Find help near you
      </h1>
      <p className="mt-2 text-sm text-[#5F4E63]">
        Verified, teen-friendly clinics and crisis services
      </p>

      <div className="relative mt-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8690]"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by city or postcode"
          className="w-full rounded-full bg-white py-4 pl-12 pr-4 text-sm outline-none ring-1 ring-[#E7D8EB] focus:ring-[#634ffb]/30"
        />
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map((clinic) => (
          <div
            key={clinic.id}
            className="flex items-center gap-4 rounded-2xl bg-white p-4 border-1 border-[#E8DAEB]"
          >
            <img src={clinicIcon} alt={clinic.name} className="w-[43px] h-[43px]" />
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-base text-[#0b0b0b]">{clinic.name}</h3>
              <p className="text-xs text-[#988B9A]">{clinic.distance}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {clinic.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#F0F1F9] px-2.5 py-0.5 text-xs text-[#4C4C4C]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-[#644AF6] px-3 py-1 text-xs font-medium text-white">
              {clinic.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  )
}
