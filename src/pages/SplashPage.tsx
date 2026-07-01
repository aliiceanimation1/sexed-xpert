import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, Shield, Heart } from 'lucide-react'
import { GradientBackground } from '../components/GradientBackground'
import Logo from '../assets/images/logo.svg?react'
import { useAppStore } from '../store/useAppStore'

export function SplashPage() {
  const setOnboardingStep = useAppStore((s) => s.setOnboardingStep)

  useEffect(() => {
    const timer = setTimeout(() => setOnboardingStep('intro'), 3000)
    return () => clearTimeout(timer)
  }, [setOnboardingStep])

  return (
    <GradientBackground className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center px-6 text-center">
        <div className="splash-logo">
          <Logo
            width={73}
            height={77}
            aria-label="SexEdXpert"
            role="img"
            className="splash-logo__icon"
          />
        </div>
        <h1 className="font-display leading-none tracking-tight text-4xl mt-4 sm:text-5xl md:text-6xl">
          <span className="text-[#634ffb]">SexEd</span>
          <span className="text-[#0b0b0b]">Xpert</span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <p className="mt-4 max-w-xs text-base font-medium text-[#4e4e4e]">
            Your private, judgment-free check
            sexual <br /> health educator.
          </p>

          <div className="mt-3 w-64">
            <div className="h-[7px] overflow-hidden rounded-full bg-white">
              <div className="loading-bar-fill gradient-bar h-full rounded-full" />
            </div>
            <p className="mt-3 text-xs font-medium uppercase tracking-[3.6px] text-[#4e4e4e]">
              Loading securely
            </p>
          </div>

          <div className="mt-6 flex items-center gap-6 text-xs font-medium text-[#4e4e4e]">
            <span className="flex items-center gap-1.5">
              <Lock size={14} />
              Anonymous
            </span>
            <span className="flex items-center gap-1.5">
              <Shield size={14} />
              Safe
            </span>
            <span className="flex items-center gap-1.5">
              <Heart size={14} />
              Free
            </span>
          </div>
        </motion.div>
      </div>
    </GradientBackground>
  )
}
