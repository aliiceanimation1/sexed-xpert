import { ArrowRight } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  showArrow?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  showArrow = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex cursor-pointer items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all disabled:opacity-50'

  const variants = {
    primary: 'btn-primary rounded-full text-white',
    ghost: 'rounded-full text-[#4e4e4e] hover:bg-black/5',
    outline:
      'rounded-full border border-[#634ffb]/30 text-[#634ffb] hover:bg-[#634ffb]/5',
  }

  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {showArrow && <ArrowRight size={16} />}
    </button>
  )
}
