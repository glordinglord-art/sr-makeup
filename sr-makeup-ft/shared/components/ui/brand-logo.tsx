import React from "react";
import { cn } from "@/shared/lib/utils";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
}

export function BrandLogo({ size = "md", className, showText = true }: BrandLogoProps) {
  const sizeMap = {
    sm: "h-10 w-10 text-xs",
    md: "h-14 w-14 text-sm",
    lg: "h-20 w-20 text-base",
    xl: "h-28 w-28 text-lg",
  };

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      {/* Insignia Circular idéntica al logo de Instagram de Shirley Ram */}
      <div
        className={cn(
          "relative shrink-0 rounded-full bg-gradient-to-br from-white via-[#fcf6f7] to-[#f5e6e8] shadow-md shadow-rose-950/5 border border-rose-100 flex items-center justify-center overflow-hidden select-none",
          sizeMap[size]
        )}
      >
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Fondo suave */}
          <circle cx="100" cy="100" r="98" fill="url(#bg-grad)" stroke="#fae1e6" strokeWidth="2" />
          
          <defs>
            <linearGradient id="bg-grad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="0.6" stopColor="#fdf7f8" />
              <stop offset="1" stopColor="#f7e5e8" />
            </linearGradient>
            <linearGradient id="sr-grad" x1="50" y1="50" x2="150" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f9b4c0" />
              <stop offset="1" stopColor="#f48ca1" />
            </linearGradient>
          </defs>

          {/* Letras SR de fondo en rosa pastel */}
          <text
            x="100"
            y="118"
            textAnchor="middle"
            fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', serif"
            fontSize="88"
            fontWeight="300"
            letterSpacing="-2"
            fill="url(#sr-grad)"
            opacity="0.9"
          >
            SR
          </text>

          {/* Firma manuscrita cruzada 'Shirley ram' */}
          <path
            d="M 45 92 Q 65 78 85 90 T 115 88 Q 135 78 158 86"
            stroke="#1a1a1a"
            strokeWidth="1.2"
            fill="none"
            opacity="0.25"
          />
          <text
            x="100"
            y="98"
            textAnchor="middle"
            fontFamily="'Brush Script MT', 'Great Vibes', 'Allura', 'Dancing Script', 'Segoe Script', cursive"
            fontSize="34"
            fontWeight="400"
            fontStyle="italic"
            fill="#1e1e1e"
          >
            Shirley ram
          </text>

          {/* Subtítulo MAQUILLADORA en mayúsculas espaciadas */}
          <text
            x="100"
            y="136"
            textAnchor="middle"
            fontFamily="'Montserrat', 'Inter', 'Helvetica Neue', sans-serif"
            fontSize="9.5"
            fontWeight="500"
            letterSpacing="5"
            fill="#4a4a4a"
          >
            MAQUILLADORA
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif text-lg font-bold tracking-tight text-stone-900 leading-tight">
            Sr.Makeup
          </span>
          <span className="text-[11px] font-medium tracking-widest text-rose-500 uppercase">
            Shirley Ram · Makeup Artist
          </span>
        </div>
      )}
    </div>
  );
}

