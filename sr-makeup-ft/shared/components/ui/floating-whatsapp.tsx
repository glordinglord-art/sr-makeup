"use client";

import React, { useState } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { BUSINESS_CONFIG } from "@/shared/constants/business";
import { BrandLogo } from "./brand-logo";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMsg = encodeURIComponent(
    "¡Hola Shirley! Vengo de tu página web y me gustaría consultar disponibilidad para una cita de maquillaje ✨"
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
      {/* Popover de saludo rápido */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 rounded-3xl bg-white p-5 shadow-2xl border border-rose-100 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between pb-3 border-b border-rose-50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <BrandLogo size="sm" showText={false} />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-300" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-stone-900 leading-tight">
                  Shirley Ram
                </h4>
                <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  En línea · Técnica Profesional
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-stone-600 space-y-2">
            <div className="bg-rose-50/70 p-3 rounded-2xl rounded-tl-xs border border-rose-100/60">
              <p>
                ¡Hola! Soy Shirley Ram 💖 ¿Tienes un evento especial o boda en mente?
              </p>
              <p className="mt-1 font-medium text-stone-800">
                Escríbeme directamente y reservamos tu espacio con amor.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${defaultMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 text-xs font-semibold shadow-md shadow-emerald-200 transition-all hover:scale-[1.02] active:scale-95"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>Chatear por WhatsApp</span>
          </a>
        </div>
      )}

      {/* Botón flotante principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 px-4 sm:px-5 shadow-xl shadow-emerald-600/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Abrir WhatsApp con Shirley"
      >
        <div className="relative">
          <MessageCircle className="h-5 w-5 fill-white" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-rose-400 border-2 border-white animate-ping" />
        </div>
        <span className="text-xs font-semibold tracking-wide hidden sm:inline-block">
          Escríbele a Shirley
        </span>
      </button>
    </div>
  );
}

