import { useAppStore } from '../store/useAppStore'
import { SplashPage } from './SplashPage'
import { PrivacyPage } from './PrivacyPage'
import { IntroPage } from './IntroPage'
import { AgePage } from './AgePage'
import { MindPage } from './MindPage'

export function OnboardingFlow() {
  const step = useAppStore((s) => s.onboardingStep)

  switch (step) {
    case 'splash':
      return <SplashPage />
    case 'intro':
      return <IntroPage />
    case 'privacy':
      return <PrivacyPage />
    case 'age':
      return <AgePage />
    case 'mind':
      return <MindPage />
    default:
      return <SplashPage />
  }
}
