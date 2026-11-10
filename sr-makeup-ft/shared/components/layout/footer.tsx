"use client";

import Link from "next/link";
import { Heart, MessageCircle, MapPin, Sparkles } from "lucide-react";
import { BrandLogo } from "@/shared/components/ui/brand-logo";
import { BUSINESS_CONFIG } from "@/shared/constants/business";

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-rose-100 bg-[#fffbfc] py-16 text-stone-600">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Columna Marca & Bio */}
        <div className="md:col-span-5 space-y-4">
          <BrandLogo size="md" showText={true} />
          
          <div className="space-y-1.5 text-xs text-stone-600 bg-rose-50/50 p-4 rounded-2xl border border-rose-100/70 inline-block w-full">
            {BUSINESS_CONFIG.bioItems.map((item, index) => (
              <p key={index} className="font-medium">
                {item}
              </p>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
            <MapPin className="h-4 w-4 text-rose-500 shrink-0" />
            <span>{BUSINESS_CONFIG.location} · Servicios en estudio y a domicilio</span>
          </div>
        </div>

        {/* Columna Horarios */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-900 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-rose-500" />
            <span>Horarios de Atención</span>
          </h4>
          <ul className="text-xs space-y-2 text-stone-600">
            <li className="flex justify-between border-b border-rose-50 pb-1">
              <span className="font-medium text-stone-800">Lunes a Viernes:</span>
              <span>{BUSINESS_CONFIG.schedule.weekdays}</span>
            </li>
            <li className="flex justify-between border-b border-rose-50 pb-1">
              <span className="font-medium text-stone-800">Sábados:</span>
              <span>{BUSINESS_CONFIG.schedule.saturdays}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-stone-800">Domingos & Festivos:</span>
              <span>Citas con reserva</span>
            </li>
          </ul>
        </div>

        {/* Columna Redes & Contacto */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-900">
            Conecta conmigo
          </h4>
          <p className="text-xs text-stone-500">
            Sígueme en Instagram para ver el proceso detrás de cada maquillaje y looks diarios.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={BUSINESS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors text-xs font-semibold"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@{BUSINESS_CONFIG.instagram}</span>
            </a>

            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=Hola%20Shirley!%20Vengo%20de%20tu%20web%20y%20me%20gustar%C3%ADa%20agendar%20una%20cita%20de%20maquillaje`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
              title="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 mt-12 pt-8 border-t border-rose-100/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400">
        <p>© 2026 {BUSINESS_CONFIG.name} · Shirley Ram. Todos los derechos reservados.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0 text-stone-500">
          Hecho con <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> para realzar tu belleza
        </p>
      </div>
    </footer>
  );
}
