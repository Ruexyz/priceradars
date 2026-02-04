import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: number
}

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
      {/* Outer particle ring */}
      <circle cx="24" cy="4" r="3" fill="#FF6B00" opacity="0.9" />
      <circle cx="37.5" cy="8.5" r="2.5" fill="#FF6B00" opacity="0.8" />
      <circle cx="44" cy="20" r="2" fill="#FF6B00" opacity="0.7" />
      <circle cx="43" cy="34" r="2.5" fill="#FF6B00" opacity="0.75" />
      <circle cx="35" cy="42" r="3" fill="#FF6B00" opacity="0.85" />
      <circle cx="24" cy="46" r="2.5" fill="#FF6B00" opacity="0.8" />
      <circle cx="13" cy="42" r="2" fill="#FF6B00" opacity="0.7" />
      <circle cx="5" cy="34" r="2.5" fill="#FF6B00" opacity="0.75" />
      <circle cx="4" cy="20" r="3" fill="#FF6B00" opacity="0.85" />
      <circle cx="10.5" cy="8.5" r="2" fill="#FF6B00" opacity="0.7" />
      
      {/* Inner particle ring */}
      <circle cx="24" cy="10" r="2" fill="#FF8533" opacity="0.9" />
      <circle cx="32" cy="13" r="1.5" fill="#FF8533" opacity="0.8" />
      <circle cx="37" cy="22" r="2" fill="#FF8533" opacity="0.85" />
      <circle cx="35" cy="32" r="1.5" fill="#FF8533" opacity="0.75" />
      <circle cx="28" cy="38" r="2" fill="#FF8533" opacity="0.9" />
      <circle cx="20" cy="38" r="1.5" fill="#FF8533" opacity="0.8" />
      <circle cx="13" cy="32" r="2" fill="#FF8533" opacity="0.85" />
      <circle cx="11" cy="22" r="1.5" fill="#FF8533" opacity="0.75" />
      <circle cx="16" cy="13" r="2" fill="#FF8533" opacity="0.9" />
      
      {/* Center core */}
      <circle cx="24" cy="24" r="6" fill="#FF6B00" />
      <circle cx="24" cy="24" r="3" fill="#FF8533" />
      
      {/* Connecting particles (radar effect) */}
      <circle cx="24" cy="17" r="1" fill="#FF6B00" opacity="0.6" />
      <circle cx="30" cy="20" r="1" fill="#FF6B00" opacity="0.6" />
      <circle cx="30" cy="28" r="1" fill="#FF6B00" opacity="0.6" />
      <circle cx="24" cy="31" r="1" fill="#FF6B00" opacity="0.6" />
      <circle cx="18" cy="28" r="1" fill="#FF6B00" opacity="0.6" />
      <circle cx="18" cy="20" r="1" fill="#FF6B00" opacity="0.6" />
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
          @keyframes pulse {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
          }
          @keyframes orbit {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .particle-outer { animation: pulse 2s ease-in-out infinite; transform-origin: center; }
          .particle-inner { animation: pulse 1.5s ease-in-out infinite; transform-origin: center; }
          .orbit-group { animation: orbit 20s linear infinite; transform-origin: 24px 24px; }
        `}
      </style>
      
      {/* Outer rotating particle ring */}
      <g className="orbit-group">
        <circle cx="24" cy="4" r="3" fill="#FF6B00" className="particle-outer" style={{ animationDelay: '0s' }} />
        <circle cx="37.5" cy="8.5" r="2.5" fill="#FF6B00" className="particle-outer" style={{ animationDelay: '0.2s' }} />
        <circle cx="44" cy="20" r="2" fill="#FF6B00" className="particle-outer" style={{ animationDelay: '0.4s' }} />
        <circle cx="43" cy="34" r="2.5" fill="#FF6B00" className="particle-outer" style={{ animationDelay: '0.6s' }} />
        <circle cx="35" cy="42" r="3" fill="#FF6B00" className="particle-outer" style={{ animationDelay: '0.8s' }} />
        <circle cx="24" cy="46" r="2.5" fill="#FF6B00" className="particle-outer" style={{ animationDelay: '1s' }} />
        <circle cx="13" cy="42" r="2" fill="#FF6B00" className="particle-outer" style={{ animationDelay: '1.2s' }} />
        <circle cx="5" cy="34" r="2.5" fill="#FF6B00" className="particle-outer" style={{ animationDelay: '1.4s' }} />
        <circle cx="4" cy="20" r="3" fill="#FF6B00" className="particle-outer" style={{ animationDelay: '1.6s' }} />
        <circle cx="10.5" cy="8.5" r="2" fill="#FF6B00" className="particle-outer" style={{ animationDelay: '1.8s' }} />
      </g>
      
      {/* Inner particle ring */}
      <circle cx="24" cy="10" r="2" fill="#FF8533" className="particle-inner" style={{ animationDelay: '0.1s' }} />
      <circle cx="32" cy="13" r="1.5" fill="#FF8533" className="particle-inner" style={{ animationDelay: '0.3s' }} />
      <circle cx="37" cy="22" r="2" fill="#FF8533" className="particle-inner" style={{ animationDelay: '0.5s' }} />
      <circle cx="35" cy="32" r="1.5" fill="#FF8533" className="particle-inner" style={{ animationDelay: '0.7s' }} />
      <circle cx="28" cy="38" r="2" fill="#FF8533" className="particle-inner" style={{ animationDelay: '0.9s' }} />
      <circle cx="20" cy="38" r="1.5" fill="#FF8533" className="particle-inner" style={{ animationDelay: '1.1s' }} />
      <circle cx="13" cy="32" r="2" fill="#FF8533" className="particle-inner" style={{ animationDelay: '1.3s' }} />
      <circle cx="11" cy="22" r="1.5" fill="#FF8533" className="particle-inner" style={{ animationDelay: '1.5s' }} />
      <circle cx="16" cy="13" r="2" fill="#FF8533" className="particle-inner" style={{ animationDelay: '1.7s' }} />
      
      {/* Center core */}
      <circle cx="24" cy="24" r="6" fill="#FF6B00" />
      <circle cx="24" cy="24" r="3" fill="#FF8533" />
      
      {/* Connecting particles */}
      <circle cx="24" cy="17" r="1" fill="#FF6B00" opacity="0.6" />
      <circle cx="30" cy="20" r="1" fill="#FF6B00" opacity="0.6" />
      <circle cx="30" cy="28" r="1" fill="#FF6B00" opacity="0.6" />
      <circle cx="24" cy="31" r="1" fill="#FF6B00" opacity="0.6" />
      <circle cx="18" cy="28" r="1" fill="#FF6B00" opacity="0.6" />
      <circle cx="18" cy="20" r="1" fill="#FF6B00" opacity="0.6" />
    </svg>
  )
}
