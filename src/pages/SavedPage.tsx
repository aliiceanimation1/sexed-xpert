import savedPageEmptyState from '../assets/images/saved-answers.png'
import { Disclaimer } from '../components/EmergencyHelp'
import { useAppStore } from '../store/useAppStore'

export function SavedPage() {
  const { messages, savedMessageIds } = useAppStore()
  const saved = messages.filter(
    (m) => m.role === 'assistant' && savedMessageIds.includes(m.id),
  )

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-4xl text-[#0b0b0b]">
        <span className="text-[#634ffb]">Saved</span> Answers
      </h1>
      <p className="mt-2 text-sm text-[#4e4e4e]">
        Bookmarks are stored only on this device.
      </p>

      {saved.length === 0 ? (
        <div className="mt-16 flex flex-col items-center px-8 py-12 text-center saved-page-empty-state">
          <img src={savedPageEmptyState} alt="No saved answers yet" className='w-[43px] h-[43px] mx-auto' />
          <h3 className="font-display text-2xl text-[#000000] mt-4">No saved answers yet</h3>
          <p className="mt-2 max-w-xs text-sm text-[#988B9A]">
            Tap the bookmark icon on any reply to save it here.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {saved.map((msg) => (
            <div
              key={msg.id}
              className="rounded-2xl bg-white p-5 text-sm leading-relaxed shadow-sm"
            >
              {msg.content}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  )
}
