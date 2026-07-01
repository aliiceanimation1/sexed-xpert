import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '../components/Button'
import { GradientBackground } from '../components/GradientBackground'
import { LogoInline } from '../components/Logo'
import { OnboardingProgress } from '../components/OnboardingProgress'
import { useAppStore, type AgeRange } from '../store/useAppStore'
import ageImage from '../assets/images/age.png'

const AGE_OPTIONS: AgeRange[] = ['13-14', '15-16', '17', '18+']

export function AgePage() {
  const { ageRange, setAgeRange, setOnboardingStep, skipOnboarding } =
    useAppStore()

  return (
    <GradientBackground className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 p-4 md:flex-row md:items-center md:p-8">
        <div className="hidden flex-1 md:block">
          <img src={ageImage} alt="Age" className="w-full h-full max-w-[450px] object-cover" />
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

            <OnboardingProgress step={1} />
            <div className="text-center">
              <h2 className="mt-8 font-display text-3xl text-[#0b0b0b] md:text-4xl">
                How old are <span className='text-[#634ffb]'>you</span>?
              </h2>
              <p className="mt-2 text-base text-[#4e4e4e]">
                Answers are localized by educators in your region.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {AGE_OPTIONS.map((age) => (
                <button
                  key={age}
                  type="button"
                  onClick={() => setAgeRange(age)}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 px-5 py-4 text-left transition ${ageRange === age
                    ? 'border-[#634ffb] bg-[#634ffb]/5'
                    : 'border-transparent bg-[#f8f6ff] hover:border-[#634ffb]/20'
                    }`}
                >
                  <div
                    className={`flex size-5 items-center justify-center rounded-md border-2 ${ageRange === age
                      ? 'border-[#634ffb] bg-[#634ffb] text-white'
                      : 'border-gray-300'
                      }`}
                  >
                    {ageRange === age && <Check size={12} />}
                  </div>
                  <span className="text-base font-medium">{age}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex w-full justify-center">
            <Button
              showArrow
              disabled={!ageRange}
              className='w-full'
              onClick={() => setOnboardingStep('mind')}
            >
              Continue
            </Button>
          </div>
        </motion.div>
      </div>
    </GradientBackground>
  )
}
