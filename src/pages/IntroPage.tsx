import { motion } from 'framer-motion'
import { Lock, CheckCircle, Headphones } from 'lucide-react'
import { GradientBackground } from '../components/GradientBackground'
import { LogoInline } from '../components/Logo'
import { Button } from '../components/Button'
import { OnboardingProgress } from '../components/OnboardingProgress'
import { EmergencyHelp } from '../components/EmergencyHelp'
import { useAppStore } from '../store/useAppStore'
import introImage from '../assets/images/intro.png'

const BADGES = [
  { icon: Lock, label: 'Anonymous' },
  { icon: CheckCircle, label: 'Reviewed' },
  { icon: Headphones, label: '24/7 Support' },
]

export function IntroPage() {
  const { setOnboardingStep, skipOnboarding } = useAppStore()

  return (
    <GradientBackground className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 p-4 md:flex-row md:items-center md:p-8">
        <div className="hidden flex-1 md:block">
          <img src={introImage} alt="Intro" className="w-full h-full max-w-[450px] object-cover" />
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

            <OnboardingProgress step={0} />
            <div>
              <h2 className="mt-8 font-display text-3xl leading-tight text-center text-[#0b0b0b] md:text-4xl">
                Hey! <br /> I&apos;m <span className="text-[#634ffb]">SexEdXpert</span>
              </h2>
              <p className="mt-4 text-base text-center leading-relaxed text-[#615065] font-medium max-w-[400px] mx-auto">
                Ask me anything about your body, relationships, consent or
                wellbeing. No judgment. No accounts. Totally anonymous.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 justify-between">
                {BADGES.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center grow gap-2 bg-[#644AF6]/10 rounded-[10px] px-4 py-2.5"
                  >
                    <Icon size={18} className="text-[#644AF6]" />
                    <span className="text-sm font-medium text-[#615065]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 w-full">
            <Button showArrow className='w-full' onClick={() => setOnboardingStep('age')}>
              Continue
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
