
import { Gavel } from "lucide-react";
import Image from "next/image";

interface LexSightLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function LexSightLogo({ className = '', width = 32, height = 32 }: LexSightLogoProps) {
  return (
    <div className={`relative inline-block ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
      <Image
        src="/logo.png"
        alt="LexSight Logo"
        width={width}
        height={height}
        className="object-contain transition-transform duration-500 ease-out hover:animate-logo-wiggle brightness-0 saturate-100"
        style={{
          filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(148deg) brightness(91%) contrast(101%)'
        }}
        priority
      />
    </div>
  )
}
