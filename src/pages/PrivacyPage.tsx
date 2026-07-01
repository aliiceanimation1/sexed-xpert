import { motion } from 'framer-motion'
import Account from '../assets/images/privacy-icons/account.svg?react'
import Anonymous from '../assets/images/privacy-icons/anonymous.svg?react'
import Reviewed from '../assets/images/privacy-icons/reviewed.svg?react'
import Trained from '../assets/images/privacy-icons/trained.svg?react'
import { GradientBackground } from '../components/GradientBackground'
import { LogoInline } from '../components/Logo'
import { Button } from '../components/Button'
import { OnboardingProgress } from '../components/OnboardingProgress'
import { EmergencyHelp } from '../components/EmergencyHelp'
import { useAppStore } from '../store/useAppStore'
import privacyImage from '../assets/images/privacy.png'

const PRIVACY_ITEMS = [
  { icon: Account, text: 'No account, no name, no email needed.' },
  { icon: Anonymous, text: 'Conversations are anonymous & never sold.' },
  { icon: Reviewed, text: 'Every answer is reviewed by clinicians.' },
  { icon: Trained, text: 'A trained human is one tap away, 24/7.' },
]

export function PrivacyPage() {
  const { completeOnboarding, skipOnboarding } = useAppStore()

  return (
    <GradientBackground className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 p-4 md:flex-row md:items-center md:p-8">
        <div className="hidden flex-1 md:block">
          <img src={privacyImage} alt="Privacy" className="w-full h-full max-w-[450px] object-cover" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="onboarding-card flex-1 p-6 md:p-8"
        >
          <div>

            <div className="mb-6 flex items-center justify-between">
              <LogoInline />
              <button
                type="button"
                onClick={skipOnboarding}
                className="flex items-center gap-1 cursor-pointer text-sm text-[#4e4e4e] hover:text-[#634ffb]"
              >
                <span className='text-[#615065]'>Skip</span> <span className="text-[#644AF6] font-[20px]">→</span>
              </button>
            </div>

            <OnboardingProgress step={3} />
            <div className="text-center">
              <h2 className="mt-8 font-display text-3xl text-[#0b0b0b] md:text-4xl">
                Your privacy <span className="text-[#634ffb]">promise</span>
              </h2>
              <p className="mt-2 text-lg text-[#4e4e4e]">Read this — It matters</p>
            </div>

            <ul className="mt-8 space-y-3">
              {PRIVACY_ITEMS.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center border-1 border-[#E8DAEB] gap-3 rounded-xl bg-[#f8f6ff] px-4 py-3"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#fff]/10 border-1 border-[#644AF6] text-[#644AF6]">
                    <Icon />
                  </div>
                  <span className="text-sm text-[#615065]">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 w-full">
            <Button showArrow className='w-full' onClick={completeOnboarding}>
              Let's Go!
            </Button>
          </div>
        </motion.div>

        <div className="md:hidden">
          <EmergencyHelp />
        </div>
      </div>

      <div className="fixed bottom-4 left-4 hidden md:block">
        <EmergencyHelp />
      </div>
    </GradientBackground>
  )
}
