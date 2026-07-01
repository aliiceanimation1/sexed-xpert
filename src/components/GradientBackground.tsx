import bgPattern from '../assets/images/bg-pattern.png'
import bgGradient from '../assets/images/bg-gradient.png'

interface GradientBackgroundProps {
  children: React.ReactNode
  className?: string
}

export function GradientBackground({ children, className = '' }: GradientBackgroundProps) {
  return (
    <div className={`relative min-h-full overflow-hidden bg-[#6f5ff1] ${className}`}>
      <div className="pointer-events-none absolute inset-0">
        <img
          src={bgGradient}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={bgPattern}
          alt=""
          className="absolute -top-[50px] left-0 h-[calc(100%+50px)] w-full object-cover opacity-90"
        />
        <div className="absolute left-[625px] top-[186px] size-[650px] rounded-full bg-[rgba(219,62,152,0.4)] blur-[250px] opacity-70" />
        <div className="absolute -bottom-[222px] -right-[196px] size-[600px] rounded-full bg-[rgba(255,132,111,0.4)] blur-[250px]" />
        <div className="absolute left-[285px] top-[561px] size-[400px] rounded-full bg-[rgba(0,226,237,0.3)] blur-[32px] opacity-40" />
        <div className="absolute -left-[160px] -top-[160px] size-[520px] rounded-full bg-[rgba(219,62,152,0.25)] blur-[200px]" />
        <div className="absolute -left-[221px] bottom-[100px] size-[520px] rounded-full bg-[rgba(0,226,237,0.2)] blur-[200px]" />
        <div className="absolute right-[-60px] -top-[260px] size-[520px] rounded-full bg-[rgba(99,79,251,0.3)] blur-[200px]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
