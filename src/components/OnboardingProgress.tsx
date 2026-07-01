interface OnboardingProgressProps {
  step: number
  total?: number
}

export function OnboardingProgress({ step, total = 4 }: OnboardingProgressProps) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            i < step
              ? 'bg-[#644AF6] w-full'
              : i === step
                ? 'bg-[#644AF6] w-full'
                : 'w-10 bg-[#3C3C3C]'
          }`}
        />
      ))}
    </div>
  )
}
