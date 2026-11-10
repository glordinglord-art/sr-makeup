"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  title?: string;
  category?: string;
  description?: string;
}

export function BeforeAfterSlider({
  beforeImage = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=900&auto=format&fit=crop",
  afterImage = "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=900&auto=format&fit=crop",
  title = "Transformación Social Glam & Piel Blindada",
  category = "Piel Blindada 16h",
  description = "Técnica de unificación de tono, corrección de ojeras con textura invisible y acabado luminoso atemporal.",
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(pos, 5), 95));
  };

  return (
    <div className="rounded-3xl bg-white border border-rose-100 p-6 sm:p-10 shadow-xl shadow-rose-950/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Slider interactivo */}
        <div className="lg:col-span-7">
          <div
            className="relative aspect-4/5 sm:aspect-16/10 w-full overflow-hidden rounded-2xl select-none cursor-ew-resize border border-rose-100/70"
            onMouseMove={handleSliderMove}
            onTouchMove={handleSliderMove}
          >
            {/* Foto "Después" (Fondo completo) */}
            <img
              src={afterImage}
              alt="Después del Maquillaje por Shirley Ram"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-rose-500/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                Después (Glam)
              </span>
            </div>

            {/* Foto "Antes" (Recortada según el slider) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={beforeImage}
                alt="Antes del Maquillaje"
                className="absolute inset-0 h-full w-full object-cover grayscale-[20%]"
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Antes (Natural)
                </span>
              </div>
            </div>

            {/* Barra divisora y tirador */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-white text-rose-500 shadow-xl border-2 border-rose-300 flex items-center justify-center text-xs font-bold">
                ↔
              </div>
            </div>
          </div>
          <p className="text-center text-[11px] text-stone-400 mt-3 font-medium">
            Desliza hacia los lados para comparar el Antes y Después
          </p>
        </div>

        {/* Explicación técnica de la transformación */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-rose-500 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="h-4 w-4" />
            <span>Técnica Profesional</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
            {title}
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            {description}
          </p>

          <div className="space-y-2.5 pt-2 border-t border-rose-50">
            <div className="flex items-center gap-2 text-xs text-stone-700">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span><strong>Skincare preparatorio:</strong> Hidratación profunda según tipo de piel.</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-700">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span><strong>Piel Blindada:</strong> Resistencia a calor, humedad y emociones.</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-700">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span><strong>Diseño de Ojos:</strong> Foco en destacar la forma natural de tu mirada.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

