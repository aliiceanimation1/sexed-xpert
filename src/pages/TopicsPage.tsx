import {
  ChevronRight,
} from 'lucide-react'
import LockIcon from '../assets/images/topic-card-bgs/lock-icon.svg?react'
import { Disclaimer } from '../components/EmergencyHelp'
import { TOPICS, useAppStore } from '../store/useAppStore'

export function TopicsPage() {
  const startTopicChat = useAppStore((s) => s.startTopicChat)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-4xl text-[#0b0b0b]">
        Explore <span className="text-[#634ffb]">Topics</span>
      </h1>
      <p className="mt-2 text-sm text-[#5F4E63]">
        Tap any card to start a guided conversation.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((topic) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => startTopicChat(topic.title)}
              className={`topic-card topic-card-${topic.id} group relative overflow-hidden p-5 text-left`}
            >
              <div
                className="mb-4 lock-icon-wrapper flex size-11 items-center justify-center rounded-xl"
              >
                <LockIcon />
              </div>
              <h3 className="font-display text-[#0b0b0b]">{topic.title}</h3>
              <p className="mt-1 text-xs text-[#4e4e4e]">Tap to chat</p>
              <ChevronRight
                size={16}
                className="absolute bottom-5 right-5 text-[#634ffb] opacity-0 transition group-hover:opacity-100"
              />
              <div
                className="absolute -right-8 -top-8 size-24 rounded-full opacity-10"
                style={{ backgroundColor: topic.color }}
              />
            </button>
          )
        )}
      </div>

      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  )
}
