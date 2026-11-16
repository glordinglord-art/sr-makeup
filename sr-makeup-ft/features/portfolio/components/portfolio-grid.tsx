"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { PortfolioItem } from "../types/portfolio.types";

interface PortfolioGridProps {
  items?: PortfolioItem[];
  maxItems?: number;
  showFilters?: boolean;
  featuredOnly?: boolean;
}

const FILTER_TABS = [
  { id: "all", label: "Todos" },
  { id: "cabello", label: "Peinados" },
  { id: "novias", label: "Novias" },
  { id: "social", label: "Social & Fiesta" },
  { id: "quinceaneras", label: "Quinceañeras" },
  { id: "artistico", label: "Artístico" },
];

const CATEGORY_LABELS: Record<string, string> = {
  cabello: "Peinados",
  novias: "Novias",
  social: "Social",
  quinceaneras: "Quinceañeras",
  artistico: "Artístico",
  editorial: "Editorial",
  automaquillaje: "Automaquillaje",
};

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
    isFeatured: false,
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
    isFeatured: false,
    createdAt: "2026-01-06",
  },
  {
    id: "7",
    title: "Recogido Trenzado Floral (Novia & Gala)",
    category: "cabello",
    imageUrl: "/images/peinados/peinado-1-recogido-floral.jpg",
    description: "Moño bajo tejido con volumen suave y tocado artesanal de perlas y flores blancas.",
    isFeatured: true,
    createdAt: "2026-01-07",
  },
  {
    id: "8",
    title: "Chignon Clásico Pulido",
    category: "cabello",
    imageUrl: "/images/peinados/peinado-2-chignon-clasico.jpg",
    description: "Recogido bajo limpio y atemporal con acabado sedoso ideal para bodas y grados.",
    isFeatured: true,
    createdAt: "2026-01-08",
  },
  {
    id: "9",
    title: "Semirecogido con Trenza & Listón",
    category: "cabello",
    imageUrl: "/images/peinados/peinado-3-semirecogido-liston.jpg",
    description: "Trenza lateral pegada entrelazada con listón rojo satinado y caída natural.",
    isFeatured: false,
    createdAt: "2026-01-09",
  },
  {
    id: "10",
    title: "Boxeadoras con Kanekalon Bicolor",
    category: "cabello",
    imageUrl: "/images/peinados/peinado-4-trenzas-kanekalon-bicolor.jpg",
    description: "Trenzas boxeadoras definidas con extensiones en rosa pastel y tono vino profundo.",
    isFeatured: true,
    createdAt: "2026-01-10",
  },
  {
    id: "11",
    title: "Trenzas Pegadas con Diseño Lateral",
    category: "cabello",
    imageUrl: "/images/peinados/peinado-5-trenzas-diseno-lateral.jpg",
    description: "Perfil con particiones limpias y trenzado en kanekalon bicolor de larga duración.",
    isFeatured: false,
    createdAt: "2026-01-11",
  },
  {
    id: "12",
    title: "Trenzas Geométricas en Vino & Rosa",
    category: "cabello",
    imageUrl: "/images/peinados/peinado-6-trenzas-geometricas-vino.jpg",
    description: "Diseño artístico con líneas geométricas laterales y acabado pulido en las puntas.",
    isFeatured: false,
    createdAt: "2026-01-12",
  },
];

export function PortfolioGrid({
  items = SAMPLE_LOOKS,
  maxItems,
  showFilters = true,
  featuredOnly = false,
}: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState<boolean>(false);

  const baseItems = featuredOnly ? items.filter((item) => item.isFeatured) : items;

  const filteredItems =
    selectedCategory === "all"
      ? baseItems
      : baseItems.filter((item) => item.category === selectedCategory);

  const visibleItems =
    typeof maxItems === "number" ? filteredItems.slice(0, maxItems) : filteredItems;

  const activeItem = activeIndex !== null ? visibleItems[activeIndex] ?? null : null;

  const handleClose = useCallback(() => {
    setActiveIndex(null);
    setZoomed(false);
  }, []);

  const handlePrev = useCallback(() => {
    setZoomed(false);
    setActiveIndex((idx) => {
      if (idx === null || visibleItems.length === 0) return null;
      return (idx - 1 + visibleItems.length) % visibleItems.length;
    });
  }, [visibleItems.length]);

  const handleNext = useCallback(() => {
    setZoomed(false);
    setActiveIndex((idx) => {
      if (idx === null || visibleItems.length === 0) return null;
      return (idx + 1) % visibleItems.length;
    });
  }, [visibleItems.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, handleClose, handlePrev, handleNext]);

  return (
    <div className="space-y-8">
      {/* Selector de categorías optimizado para móvil y desktop */}
      {showFilters && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 px-1 -mx-1 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTER_TABS.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                    : "bg-white hover:bg-rose-50 text-stone-700 border border-rose-100"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid de Fotos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {visibleItems.map((item, idx) => {
          const isHairWork = item.category === "cabello";
          const catLabel = CATEGORY_LABELS[item.category] || item.category;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveIndex(idx);
                setZoomed(false);
              }}
              className={`group text-left relative overflow-hidden rounded-3xl shadow-sm border border-rose-100/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-rose-950/10 cursor-pointer flex flex-col ${
                isHairWork
                  ? "bg-gradient-to-b from-[#fdf6f8] via-[#faf0f3] to-[#f5e3e9]"
                  : "bg-stone-100"
              }`}
            >
              <div className="aspect-4/5 w-full relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={`h-full w-full transition-transform duration-700 ${
                    isHairWork
                      ? "object-contain p-4 pb-24 mix-blend-multiply group-hover:scale-105"
                      : "object-cover group-hover:scale-108"
                  }`}
                  loading="lazy"
                />

                {!isHairWork && (
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
                )}

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <Badge
                    variant="default"
                    className="bg-white/95 text-stone-800 capitalize backdrop-blur-md text-[10px] font-semibold tracking-wider px-3 py-1 shadow-xs border border-rose-100/70"
                  >
                    {catLabel}
                  </Badge>

                  <span className="h-8 w-8 rounded-full bg-white/90 text-stone-700 border border-rose-100/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                    <ZoomIn className="h-4 w-4 text-rose-500" />
                  </span>
                </div>

                {isHairWork ? (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white/95 via-white/90 to-white/0 pt-8 pb-5 px-5 text-stone-900 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-rose-500 block">
                      Shirley Ram · Sr.Makeup
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-bold leading-snug">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-stone-600 line-clamp-2 pt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                ) : (
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
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Visor Modal estilo Mercado Libre */}
      {activeItem && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-rose-100/40 flex flex-col lg:grid lg:grid-cols-12 max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 h-10 w-10 rounded-full bg-white/95 hover:bg-rose-50 text-stone-800 border border-stone-200 flex items-center justify-center shadow-md cursor-pointer"
              title="Cerrar visor"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Zona de imagen grande con zoom y navegación */}
            <div className="lg:col-span-8 relative bg-gradient-to-b from-[#fdf6f8] to-[#f8eaef] flex flex-col justify-between min-h-[340px] sm:min-h-[460px] lg:min-h-[540px]">
              <div className="relative flex-1 flex items-center justify-center overflow-auto p-4 sm:p-8">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  onClick={() => setZoomed((z) => !z)}
                  className={`max-h-[54vh] lg:max-h-[64vh] w-auto object-contain rounded-2xl transition-transform duration-300 ${
                    activeItem.category === "cabello" ? "mix-blend-multiply" : ""
                  } ${zoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"}`}
                />

                {/* Flecha anterior */}
                {visibleItems.length > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white text-stone-800 border border-rose-100 flex items-center justify-center shadow-md cursor-pointer"
                    title="Anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}

                {/* Flecha siguiente */}
                {visibleItems.length > 1 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white text-stone-800 border border-rose-100 flex items-center justify-center shadow-md cursor-pointer"
                    title="Siguiente"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}

                {/* Botón zoom */}
                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/95 hover:bg-rose-50 text-stone-700 border border-rose-100 text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  {zoomed ? (
                    <>
                      <ZoomOut className="h-3.5 w-3.5 text-rose-500" />
                      <span>Alejar</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="h-3.5 w-3.5 text-rose-500" />
                      <span>Acercar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tira de miniaturas tipo Mercado Libre */}
              {visibleItems.length > 1 && (
                <div className="border-t border-rose-100/80 bg-white/85 px-4 py-2.5 flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {visibleItems.map((thumb, idx) => (
                    <button
                      key={thumb.id}
                      type="button"
                      onClick={() => {
                        setActiveIndex(idx);
                        setZoomed(false);
                      }}
                      className={`h-12 w-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer bg-[#fdf6f8] ${
                        idx === activeIndex
                          ? "border-rose-500 ring-2 ring-rose-200 scale-105"
                          : "border-stone-200 opacity-65 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={thumb.imageUrl}
                        alt={thumb.title}
                        className={`h-full w-full ${
                          thumb.category === "cabello"
                            ? "object-contain p-0.5 mix-blend-multiply"
                            : "object-cover"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Panel derecho de detalles */}
            <div className="lg:col-span-4 p-5 sm:p-7 flex flex-col justify-between gap-5 bg-white overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-rose-50 text-rose-600 border-rose-200 text-[11px] font-bold">
                    {CATEGORY_LABELS[activeItem.category] || activeItem.category}
                  </Badge>
                  <span className="text-[11px] text-stone-400">
                    {activeIndex + 1} de {visibleItems.length}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                  {activeItem.title}
                </h3>

                {activeItem.description && (
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {activeItem.description}
                  </p>
                )}

                <div className="pt-2 border-t border-rose-100 flex items-center gap-2 text-xs text-stone-500">
                  <Sparkles className="h-4 w-4 text-rose-400 shrink-0" />
                  <span>Trabajo realizado por Shirley Ram · Sr.Makeup</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <Link href="/agendar" onClick={handleClose} className="block">
                  <Button
                    variant="primary"
                    className="w-full rounded-2xl gap-2 py-5 text-sm font-bold shadow-md shadow-rose-200"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Agendar este Look</span>
                  </Button>
                </Link>
                <p className="text-[11px] text-center text-stone-400">
                  Toca la imagen para acercar o usa las flechas para ver más.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
