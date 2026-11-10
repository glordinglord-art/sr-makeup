"use client";

import React, { useState } from "react";
import { Sparkles, Heart } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { BUSINESS_CONFIG } from "@/shared/constants/business";
import { PortfolioItem } from "../types/portfolio.types";

interface PortfolioGridProps {
  items?: PortfolioItem[];
}

const SAMPLE_LOOKS: PortfolioItem[] = [
  {
    id: "1",
    title: "Novia Radiante & Piel Blindada",
    category: "novias",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    description: "Look atemporal de ensueño con acabado glow perlado, tonos tierra y labios nude.",
    productsUsed: ["Charlotte Tilbury Flawless Filter", "Huda Beauty Nude Palette"],
    isFeatured: true,
    createdAt: "2026-01-01",
  },
  {
    id: "2",
    title: "Smokey Glam & Labios Nude",
    category: "social",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
    description: "Ojos ahumados en tonos café profundo con destellos dorados y pestañas de visón.",
    isFeatured: true,
    createdAt: "2026-01-02",
  },
  {
    id: "3",
    title: "Maquillaje Artístico 'Euphoria Glow'",
    category: "artistico",
    imageUrl: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=800&auto=format&fit=crop",
    description: "Diseño gráfico con delineado flotante, perlas incrustadas y pigmentos neón.",
    isFeatured: true,
    createdAt: "2026-01-03",
  },
  {
    id: "4",
    title: "Quinceañera Princesa Romántica",
    category: "quinceaneras",
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
    description: "Tonos rosados suaves, piel de terciopelo luminosa y brillo delicado.",
    isFeatured: true,
    createdAt: "2026-01-04",
  },
  {
    id: "5",
    title: "Editorial Golden Hour",
    category: "artistico",
    imageUrl: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?q=80&w=800&auto=format&fit=crop",
    description: "Maquillaje de alta definición con piel húmeda y toques cálidos en mejillas y labios.",
    isFeatured: false,
    createdAt: "2026-01-05",
  },
  {
    id: "6",
    title: "Social Glam 'Red Carpet'",
    category: "social",
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
    description: "Clásico y sofisticado con labios carmín mate y piel ultra pulida.",
    isFeatured: true,
    createdAt: "2026-01-06",
  },
];

export function PortfolioGrid({ items = SAMPLE_LOOKS }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredItems = selectedCategory === "all"
    ? items
    : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-10">
      {/* Selector de categorías */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
            selectedCategory === "all"
              ? "bg-rose-500 text-white shadow-md shadow-rose-200"
              : "bg-white hover:bg-rose-50 text-stone-700 border border-rose-100"
          }`}
        >
          Todos los Trabajos
        </button>
        {BUSINESS_CONFIG.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              selectedCategory === cat.id
                ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                : "bg-white hover:bg-rose-50 text-stone-700 border border-rose-100"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid de Fotos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-3xl bg-stone-100 shadow-sm border border-rose-100/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-rose-950/10"
          >
            <div className="aspect-4/5 w-full relative overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute top-4 left-4">
                <Badge variant="default" className="bg-white/95 text-stone-800 capitalize backdrop-blur-md text-[10px] font-semibold tracking-wider px-3 py-1 shadow-xs">
                  {item.category}
                </Badge>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-rose-300 block">
                  Shirley Ram · Sr.Makeup
                </span>
                <h4 className="font-serif text-xl font-bold leading-snug drop-shadow-sm">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-stone-200 line-clamp-2 pt-1 font-light">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
