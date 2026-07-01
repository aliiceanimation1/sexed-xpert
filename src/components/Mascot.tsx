interface MascotProps {
  speech?: string
  variant?: 'wave' | 'think' | 'shield' | 'point'
}

export function Mascot({ speech, variant = 'wave' }: MascotProps) {
  const poses = {
    wave: '🙋',
    think: '🤔',
    shield: '🛡️',
    point: '👉',
  }

  return (
    <div className="relative flex flex-col items-center">
      {speech && (
        <div className="relative mb-4">
          <div className="rounded-2xl bg-white px-6 py-3 text-2xl font-display text-[#634ffb] shadow-lg">
            {speech}
          </div>
          <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
        </div>
      )}
      <div className="animate-float relative">
        <div className="flex h-64 w-56 items-end justify-center md:h-80 md:w-72">
          <div className="relative flex h-[85%] w-[75%] flex-col items-center">
            <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-[#fcd9b0] shadow-inner md:h-28 md:w-28">
              <span className="text-4xl">{poses[variant]}</span>
            </div>
            <div className="relative -mt-4 h-40 w-full rounded-t-[80px] bg-gradient-to-b from-[#634ffb] to-[#4f3fd4] shadow-xl md:h-48">
              <div className="absolute left-1/2 top-8 h-3 w-16 -translate-x-1/2 rounded-full bg-[#fcd9b0]/30" />
            </div>
            <div className="absolute -bottom-2 left-1/2 h-4 w-32 -translate-x-1/2 rounded-full bg-black/10 blur-sm" />
          </div>
        </div>
      </div>
    </div>
  )
}
