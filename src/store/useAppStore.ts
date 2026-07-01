import type { FC, SVGProps } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import PubertyIcon from '../assets/images/select-icons/puberty.svg?react'
import RelationshipsIcon from '../assets/images/select-icons/relationships.svg?react'
import ConsentIcon from '../assets/images/select-icons/consent.svg?react'
import ContraceptionIcon from '../assets/images/select-icons/contraception.svg?react'
import LgbtqIcon from '../assets/images/select-icons/lgbtq.svg?react'
import MentalIcon from '../assets/images/select-icons/mental.svg?react'
import PregnancyIcon from '../assets/images/select-icons/pregnancy.svg?react'

export type MindTopicIcon = FC<SVGProps<SVGSVGElement>>

export type OnboardingStep = 'splash' | 'intro' | 'age' | 'mind' | 'privacy'
export type AppView = 'chat' | 'topics' | 'saved' | 'clinic'
export type AgeRange = '13-14' | '15-16' | '17' | '18+'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  saved?: boolean
}

export interface Clinic {
  id: string
  name: string
  distance: string
  tags: string[]
  status: 'Open' | 'Closed'
}

interface AppState {
  onboardingComplete: boolean
  onboardingStep: OnboardingStep
  currentView: AppView
  ageRange: AgeRange | null
  selectedTopics: string[]
  messages: Message[]
  savedMessageIds: string[]
  setOnboardingStep: (step: OnboardingStep) => void
  completeOnboarding: () => void
  skipOnboarding: () => void
  setAgeRange: (age: AgeRange) => void
  toggleTopic: (topic: string) => void
  setCurrentView: (view: AppView) => void
  sendMessage: (content: string) => void
  toggleSaveMessage: (id: string) => void
  startNewChat: () => void
  startTopicChat: (topic: string) => void
}

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hey 👋 I'm SexEdXpert. Ask me anything — totally anonymous. Tap a suggestion below or type your own question.",
}

const MOCK_RESPONSES: Record<string, string> = {
  default:
    "That's a great question. SexEdXpert provides educational information reviewed by clinicians. For personal medical advice, please speak with a healthcare provider. Would you like to know more about this topic?",
  consent:
    'Consent means freely agreeing to something without pressure. It must be enthusiastic, informed, and ongoing — you can change your mind at any time. No one owes anyone sexual activity.',
  period:
    'Periods vary a lot from person to person. Cycles between 21-35 days are common. If you have very heavy bleeding, severe pain, or missed periods for months, talking to a clinician is a good idea.',
  condoms:
    'Condoms are a barrier method that help prevent pregnancy and reduce STI risk. They work best when used correctly every time — check the expiry date and avoid oil-based lubricants with latex condoms.',
  gay: "Exploring your sexuality is normal. There's no rush to label yourself. Trusted resources and supportive communities can help. You're not alone.",
  'say no':
    'You always have the right to say no — without explanation. Clear words, body language, and leaving an unsafe situation are all valid. People who respect you will respect your boundaries.',
}

function getMockResponse(content: string): string {
  const lower = content.toLowerCase()
  if (lower.includes('consent')) return MOCK_RESPONSES.consent
  if (lower.includes('period')) return MOCK_RESPONSES.period
  if (lower.includes('condom')) return MOCK_RESPONSES.condoms
  if (lower.includes('gay')) return MOCK_RESPONSES.gay
  if (lower.includes('say no') || lower.includes('no?')) return MOCK_RESPONSES['say no']
  return MOCK_RESPONSES.default
}

export const CLINICS: Clinic[] = [
  {
    id: '1',
    name: 'Youth Health Hub',
    distance: '1.4 mi',
    tags: ['Teen friendly', 'Walk-in'],
    status: 'Open',
  },
  {
    id: '2',
    name: 'Planned Care Clinic',
    distance: '1.4 mi',
    tags: ['Free', 'Confidential'],
    status: 'Open',
  },
  {
    id: '3',
    name: 'Crisis & Support Line',
    distance: '1.4 mi',
    tags: ['Hotline', 'Multi-lingual'],
    status: 'Open',
  },
  {
    id: '4',
    name: 'Community Wellness Center',
    distance: '1.4 mi',
    tags: ['LGBTQ+ affirming'],
    status: 'Open',
  },
]

export const TOPICS = [
  { id: 'body', title: 'Body & Puberty', color: '#a855f7' },
  { id: 'relationships', title: 'Relationships', color: '#ec4899' },
  { id: 'consent', title: 'Consent', color: '#6366f1' },
  { id: 'contraception', title: 'Contraception', color: '#14b8a6' },
  { id: 'stis', title: 'STIs', color: '#f59e0b' },
  { id: 'lgbtq', title: 'LGBTQ+', color: '#8b5cf6' },
  { id: 'mental', title: 'Mental Health', color: '#06b6d4' },
]

export const MIND_TOPICS: {
  id: string
  title: string
  icon: MindTopicIcon
}[] = [
  { id: 'body', title: 'Body changes', icon: PubertyIcon },
  { id: 'relationships', title: 'Relationships', icon: RelationshipsIcon },
  { id: 'consent', title: 'Consent', icon: ConsentIcon },
  { id: 'contraception', title: 'Contraception', icon: ContraceptionIcon },
  { id: 'stis', title: 'STIs', icon: PubertyIcon },
  { id: 'lgbtq', title: 'LGBTQ+', icon: LgbtqIcon },
  { id: 'mental', title: 'Mental health', icon: MentalIcon },
  { id: 'pregnancy', title: 'Pregnancy', icon: PregnancyIcon },
]

export const SUGGESTIONS = [
  'What is consent, really?',
  'Is my period normal?',
  'How do condoms work?',
  'I think I might be gay.',
  'How do I say no?',
]

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      onboardingComplete: false,
      onboardingStep: 'splash',
      currentView: 'chat',
      ageRange: null,
      selectedTopics: [],
      messages: [INITIAL_MESSAGE],
      savedMessageIds: [],

      setOnboardingStep: (step) => set({ onboardingStep: step }),

      completeOnboarding: () =>
        set({ onboardingComplete: true, onboardingStep: 'privacy' }),

      skipOnboarding: () => set({ onboardingComplete: true }),

      setAgeRange: (age) => set({ ageRange: age }),

      toggleTopic: (topic) =>
        set((state) => ({
          selectedTopics: state.selectedTopics.includes(topic)
            ? state.selectedTopics.filter((t) => t !== topic)
            : [...state.selectedTopics, topic],
        })),

      setCurrentView: (view) => set({ currentView: view }),

      sendMessage: (content) => {
        const userMsg: Message = {
          id: `user-${Date.now()}`,
          role: 'user',
          content,
        }
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: getMockResponse(content),
        }
        set((state) => ({
          messages: [...state.messages, userMsg, aiMsg],
          currentView: 'chat',
        }))
      },

      toggleSaveMessage: (id) =>
        set((state) => ({
          savedMessageIds: state.savedMessageIds.includes(id)
            ? state.savedMessageIds.filter((mid) => mid !== id)
            : [...state.savedMessageIds, id],
        })),

      startNewChat: () =>
        set({ messages: [INITIAL_MESSAGE], currentView: 'chat' }),

      startTopicChat: (topic) => {
        get().sendMessage(`I'd like to learn about ${topic}`)
      },
    }),
    {
      name: 'sexedxpert-storage',
      partialize: (state) => ({
        onboardingComplete: state.onboardingComplete,
        ageRange: state.ageRange,
        selectedTopics: state.selectedTopics,
        savedMessageIds: state.savedMessageIds,
      }),
    },
  ),
)
