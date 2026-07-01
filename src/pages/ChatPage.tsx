import { useState, useRef, useEffect } from 'react'
import { Send, Bookmark, ThumbsUp, ThumbsDown } from 'lucide-react'
import logoImg from '../assets/images/ai-icon.png'
import { Disclaimer } from '../components/EmergencyHelp'
import { useAppStore, SUGGESTIONS } from '../store/useAppStore'

export function ChatPage() {
  const { messages, sendMessage, toggleSaveMessage, savedMessageIds } =
    useAppStore()
  const [input, setInput] = useState('')
  const [messageFeedback, setMessageFeedback] = useState<
    Record<string, 'like' | 'dislike'>
  >({})
  const bottomRef = useRef<HTMLDivElement>(null)

  const toggleFeedback = (id: string, type: 'like' | 'dislike') => {
    setMessageFeedback((prev) => {
      if (prev[id] === type) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: type }
    })
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    sendMessage(trimmed)
    setInput('')
  }

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col px-4 py-6">
      <div className="flex-1 space-y-6 overflow-y-auto pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {msg.role === 'assistant' && (
              <img
                src={logoImg}
                alt=""
                className="mt-1 size-8 shrink-0 rounded-full bg-white p-0.5 shadow"
              />
            )}
            <div
              className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
              }`}
            >
              <p>{msg.content}</p>
              {(msg.role === 'assistant' || msg.id === 'welcome') && (
                <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleFeedback(msg.id, 'like')}
                      className={
                        messageFeedback[msg.id] === 'like'
                          ? 'text-[#634ffb]'
                          : 'text-gray-500 hover:text-[#634ffb]'
                      }
                      aria-label="Like"
                      aria-pressed={messageFeedback[msg.id] === 'like'}
                    >
                      <ThumbsUp
                        size={14}
                        fill={
                          messageFeedback[msg.id] === 'like'
                            ? 'currentColor'
                            : 'none'
                        }
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleFeedback(msg.id, 'dislike')}
                      className={
                        messageFeedback[msg.id] === 'dislike'
                          ? 'text-[#634ffb]'
                          : 'text-gray-500 hover:text-[#634ffb]'
                      }
                      aria-label="Dislike"
                      aria-pressed={messageFeedback[msg.id] === 'dislike'}
                    >
                      <ThumbsDown
                        size={14}
                        fill={
                          messageFeedback[msg.id] === 'dislike'
                            ? 'currentColor'
                            : 'none'
                        }
                      />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSaveMessage(msg.id)}
                    className={
                      savedMessageIds.includes(msg.id)
                        ? 'text-[#634ffb]'
                        : 'text-gray-500 hover:text-[#634ffb]'
                    }
                    aria-label="Bookmark"
                  >
                    <Bookmark
                      size={14}
                      fill={
                        savedMessageIds.includes(msg.id)
                          ? 'currentColor'
                          : 'none'
                      }
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="shrink-0 space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => sendMessage(s)}
              className="shrink-0 rounded-full border border-[#634ffb]/20 bg-white px-4 py-1.5 text-xs text-[#4e4e4e] transition hover:border-[#634ffb]/40 hover:bg-[#634ffb]/5"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything — it's private."
            className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#634ffb] to-[#2088f5] text-white transition hover:opacity-90 disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </div>

        <Disclaimer />
      </div>
    </div>
  )
}
