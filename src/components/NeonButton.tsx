import React from 'react'
import { Button } from './ui/button'
interface NeonButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
  }

const NeonButton: React.FC<NeonButtonProps> = ({ children, onClick }) => {
  return (
    <Button 
    onClick={onClick}
    className="btn-neon bg-primary relative text-white hover:text-[#f0f0f0]  text-lg transition duration-1000  delay-900 hover:bg-primary/90 hover:shadow-[0_0_10px_#7393B3,0_0_40px_#7393B3,0_0_80px_#7393B3] w-[160px] h-[45px]"
  >
    {children}
    <svg className="absolute inset-0 w-full h-full" height="50" width="180">
      <polyline 
        points="0,0 180,0 180,50 0,50 0,00"
        className="fill-transparent stroke-primary/90 stroke-2 transition-all duration-800 ease-in-out"
        style={{ strokeDasharray: '40 460', strokeDashoffset: 40 }}
      />
    </svg>
  </Button>
  )
}

export default NeonButton