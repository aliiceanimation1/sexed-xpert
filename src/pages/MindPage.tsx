import { motion } from 'framer-motion'
import { GradientBackground } from '../components/GradientBackground'
import { LogoInline } from '../components/Logo'
import { Button } from '../components/Button'
import { OnboardingProgress } from '../components/OnboardingProgress'
import { useAppStore, MIND_TOPICS } from '../store/useAppStore'
import mindImage from '../assets/images/mind.png'

export function MindPage() {
  const { selectedTopics, toggleTopic, skipOnboarding, setOnboardingStep } =
    useAppStore()

  return (
    <GradientBackground className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 p-4 md:flex-row md:items-center md:p-8">
        <div className="hidden flex-1 lg:block">
          <img src={mindImage} alt="Mind" className="w-full h-full max-w-[450px] object-cover" />
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

            <OnboardingProgress step={2} />
            <div className="text-center">
              <h2 className="mt-8 font-display text-3xl text-[#0b0b0b] md:text-4xl">
                What&apos;s on your mind?
              </h2>
              <p className="mt-2 text-base text-[#4e4e4e]">
                Pick topics you&apos;re curious about. You can always change these
                later.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {MIND_TOPICS.map((topic) => {
                const selected = selectedTopics.includes(topic.id)
                const Icon = topic.icon
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => toggleTopic(topic.id)}
                    className={`rounded-[10px] cursor-pointer flex flex-col text-start sm:max-w-[48.5%] w-full align-start border-1 px-5 py-2.5 text-sm font-medium transition ${selected
                      ? 'bg-[#ffffff] border-[#644AF6] text-[#644AF6] shadow-md'
                      : 'bg-[#f8f6ff] text-[#0b0b0b] border-[#E8DAEB] hover:bg-[#634ffb]/10'
                      }`}
                  >
                    <Icon
                      className={`mb-1 h-6 w-6 shrink-0 ${selected ? 'text-[#644AF6]' : 'text-[#615065]'}`}
                      aria-hidden
                    />
                    <span className="block w-full text-start text-sm font-medium">{topic.title}</span>
                  </button>
                )
              })}
            </div>
          </div>


          <div className="mt-8 w-full">
            <Button showArrow className='w-full' onClick={()=>setOnboardingStep('privacy')}>
              Continue
            </Button>
          </div>
        </motion.div>
      </div>
    </GradientBackground>
  )
}
