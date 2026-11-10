import React from "react";
import Link from "next/link";
import {
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { BrandLogo } from "@/shared/components/ui/brand-logo";
import { BUSINESS_CONFIG } from "@/shared/constants/business";

export const metadata = {
  title: "Contacto & Reservas | Sr.Makeup · Shirley Ram",
  description: "Contáctate con Shirley Ram a través de WhatsApp, Instagram o reserva tu cita de maquillaje en línea.",
};

export default function ContactoPage() {
  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=Hola%20Shirley!%20Vengo%20de%20tu%20web%20y%20me%20gustar%C3%ADa%20hacerte%20una%20consulta%20sobre%20tus%20servicios%20de%20maquillaje%20✨`;

  return (
    <div className="py-12 sm:py-20 px-6 max-w-6xl mx-auto space-y-16">
      {/* Cabecera de la página */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex justify-center mb-3">
          <BrandLogo size="md" showText={false} />
        </div>
        <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">
          Canales Oficiales
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Hablemos de tu Próximo Look
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          ¿Tienes una boda, fiesta o evento especial? Elige el canal que más te guste para comunicarte directamente con Shirley Ram.
        </p>
      </div>

      {/* Los 3 Canales Principales en Tarjetas VIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Canal 1: WhatsApp */}
        <Card className="flex flex-col justify-between p-8 rounded-3xl border-2 border-emerald-100 bg-white hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group">
          <div className="space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <MessageCircle className="h-7 w-7 fill-emerald-600 text-white" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Respuesta Rápida
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-2">
                WhatsApp Directo
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 leading-relaxed">
                Escríbele directamente al celular de Shirley para cotizaciones personalizadas o fechas especiales.
              </p>
            </div>

            <div className="pt-2 text-xs font-semibold text-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase">Número Oficial</span>
              <span>{BUSINESS_CONFIG.phone}</span>
            </div>
          </div>

          <div className="pt-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button size="md" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-2 shadow-md shadow-emerald-200">
                <MessageCircle className="h-4 w-4" />
                <span>Escribir por WhatsApp</span>
              </Button>
            </a>
          </div>
        </Card>

        {/* Canal 2: Instagram */}
        <Card className="flex flex-col justify-between p-8 rounded-3xl border-2 border-rose-100 bg-white hover:border-rose-300 hover:shadow-xl hover:shadow-rose-900/5 transition-all group">
          <div className="space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full">
                Portafolio Diario
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-2">
                Instagram DM
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 leading-relaxed">
                Mira historias en vivo, antes y después de cada clienta y envíale un mensaje directo.
              </p>
            </div>

            <div className="pt-2 text-xs font-semibold text-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase">Perfil Oficial</span>
              <span>@{BUSINESS_CONFIG.instagram}</span>
            </div>
          </div>

          <div className="pt-6">
            <a
              href={BUSINESS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button size="md" variant="outline" className="w-full border-rose-200 text-rose-700 hover:bg-rose-50 font-semibold gap-2">
                <span>Ver @{BUSINESS_CONFIG.instagram}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </Card>

        {/* Canal 3: Reserva Online */}
        <Card className="flex flex-col justify-between p-8 rounded-3xl border-2 border-stone-200 bg-white hover:border-stone-900 hover:shadow-xl hover:shadow-stone-900/5 transition-all group">
          <div className="space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Calendar className="h-7 w-7" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-full">
                24/7 Disponible
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-2">
                Reserva Online
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 leading-relaxed">
                Selecciona tu fecha, hora y modalidad (estudio o domicilio) en nuestro sistema interactivo.
              </p>
            </div>

            <div className="pt-2 text-xs font-semibold text-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase">Confirmación</span>
              <span>Inmediata en Agenda</span>
            </div>
          </div>

          <div className="pt-6">
            <Link href="/agendar" className="block w-full">
              <Button size="md" className="w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold gap-2 shadow-sm">
                <Calendar className="h-4 w-4" />
                <span>Agendar Mi Cita</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Información del Estudio y Horarios */}
      <div className="rounded-3xl bg-gradient-to-br from-[#fdf6f7] to-white border border-rose-100 p-8 sm:p-12 max-w-5xl mx-auto shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">
              Ubicación & Modalidades
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              ¿Dónde atiende Shirley Ram?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Brindamos atención en nuestro <strong>estudio privado</strong> con iluminación profesional, y también ofrecemos <strong>servicio VIP a domicilio</strong> en Medellín, Envigado, El Poblado, Rionegro, Llanogrande y todo el Oriente Antioqueño para bodas y grupos.
            </p>

            <div className="space-y-2 pt-2 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-rose-500 shrink-0" />
                <span>{BUSINESS_CONFIG.location} · Estudio Privado</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-rose-500 shrink-0" />
                <span>Servicio VIP a Domicilio para Novias & Eventos</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-rose-100 p-6 shadow-sm space-y-4">
            <h4 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
              <Clock className="h-4 w-4 text-rose-500" />
              <span>Horarios de Citas</span>
            </h4>
            <ul className="text-xs space-y-2.5 text-stone-600">
              <li className="flex justify-between border-b border-rose-50 pb-1.5">
                <span className="font-semibold text-stone-800">Lunes a Viernes:</span>
                <span>{BUSINESS_CONFIG.schedule.weekdays}</span>
              </li>
              <li className="flex justify-between border-b border-rose-50 pb-1.5">
                <span className="font-semibold text-stone-800">Sábados:</span>
                <span>{BUSINESS_CONFIG.schedule.saturdays}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold text-stone-800">Domingos y Festivos:</span>
                <span>Eventos con reserva previa</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

