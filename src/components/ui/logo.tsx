import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: number
}

/**
 * PriceRadars Bullseye Logo
 * 
 * 3 concentric rings + center dot
 * Ultra-minimal, works at any size (16px favicon to 128px hero)
 * Communicates "targeting the best price"
 */
export function Logo({ className, size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-label="PriceRadars Logo"
    >
      {/* Outer ring */}
      <circle cx="24" cy="24" r="22" stroke="#FF6600" strokeWidth="2.5" opacity="0.3" />
      {/* Middle ring */}
      <circle cx="24" cy="24" r="14.5" stroke="#FF6600" strokeWidth="2.5" opacity="0.6" />
      {/* Inner ring */}
      <circle cx="24" cy="24" r="7" stroke="#FF6600" strokeWidth="2.5" />
      {/* Center dot */}
      <circle cx="24" cy="24" r="3" fill="#FF6600" />
    </svg>
  )
}

export function LogoAnimated({ className, size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-label="PriceRadars Logo"
    >
      <style>
        {`
          @keyframes radar-ping {
            0% { opacity: 0; r: 3; }
            30% { opacity: 0.6; }
            100% { opacity: 0; r: 22; }
          }
          .radar-wave { animation: radar-ping 2.5s ease-out infinite; transform-origin: center; }
        `}
      </style>
      
      {/* Static rings */}
      <circle cx="24" cy="24" r="22" stroke="#FF6600" strokeWidth="2.5" opacity="0.3" />
      <circle cx="24" cy="24" r="14.5" stroke="#FF6600" strokeWidth="2.5" opacity="0.6" />
      <circle cx="24" cy="24" r="7" stroke="#FF6600" strokeWidth="2.5" />
      
      {/* Animated ping wave */}
      <circle cx="24" cy="24" r="3" stroke="#FF6600" strokeWidth="1.5" fill="none" className="radar-wave" />
      
      {/* Center dot */}
      <circle cx="24" cy="24" r="3" fill="#FF6600" />
    </svg>
  )
}
