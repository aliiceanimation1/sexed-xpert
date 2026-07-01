import logoImg from '../assets/images/logo.png'
import siteLogo from '../assets/images/site-logo.png'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

const sizes = {
  sm: { img: 32, text: 'text-sm' },
  md: { img: 48, text: 'text-base' },
  lg: { img: 96, text: 'text-5xl md:text-7xl' },
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const s = sizes[size]

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex items-center justify-center rounded-[48px] bg-white shadow-lg"
        style={{ width: s.img + 8, height: s.img + 8 }}
      >
        <img
          src={logoImg}
          alt="SexEdXpert"
          width={s.img}
          height={s.img}
          className="object-contain"
        />
      </div>
      {showText && (
        <h1 className={`font-display leading-none tracking-tight ${s.text}`}>
          <span className="text-[#634ffb]">SexEd</span>
          <span className="text-[#0b0b0b]">Xpert</span>
        </h1>
      )}
    </div>
  )
}

export function LogoInline({main = false}: {main?: boolean}) {
  return (
    <img src={siteLogo} alt="SexEdXpert" width={main ? 162 : 145} className="site-logo" />
  )
}
