"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Menu,
  X,
  Sparkles,
  MessageCircle,
  Camera,
  ChevronRight,
  Shield,
  Palette,
  MapPin,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { BrandLogo } from "@/shared/components/ui/brand-logo";
import { BUSINESS_CONFIG } from "@/shared/constants/business";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rose-100/70 bg-[#fffdfd]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo de la marca de Shirley Ram */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group transition-transform hover:scale-[1.01]"
        >
          <BrandLogo size="sm" showText={true} />
        </Link>

        {/* Enlaces de navegación en Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <Link href="/servicios" className="hover:text-rose-600 transition-colors">
            Servicios & Tarifas
          </Link>
          <Link href="/portafolio" className="hover:text-rose-600 transition-colors">
            Portafolio
          </Link>
          <Link href="/#sobre-mi" className="hover:text-rose-600 transition-colors">
            Sobre Shirley
          </Link>
          <Link href="/contacto" className="hover:text-rose-600 transition-colors">
            Contacto
          </Link>
        </nav>

        {/* Acciones en Desktop & Botón Móvil */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Botón Instagram en desktop */}
          <a
            href={BUSINESS_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
            title="Instagram @sr.makeup_"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* Botón Agendar (compacto en móvil) */}
          <Link href="/agendar" onClick={closeMenu}>
            <Button
              size="sm"
              className="gap-1.5 shadow-sm bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-xs px-3 sm:px-4 py-2"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span className="hidden xs:inline sm:inline">Agendar Cita</span>
              <span className="xs:hidden sm:hidden">Agendar</span>
            </Button>
          </Link>

          {/* Botón Hamburguesa en Móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-xl border border-rose-200/80 bg-rose-50/50 text-stone-800 hover:bg-rose-100 transition-colors focus:outline-none"
            aria-label="Abrir menú de navegación"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-rose-600" />
            ) : (
              <Menu className="h-5 w-5 text-stone-800" />
            )}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE (DRAWER / OVERLAY) */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-rose-100 bg-white/98 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="px-6 py-6 space-y-5">
            {/* Cabecera del menú */}
            <div className="flex items-center justify-between pb-3 border-b border-rose-50">
              <div className="space-y-0.5">
                <span className="font-serif text-sm font-bold text-stone-900 block">
                  Shirley Ram
                </span>
                <span className="text-[10px] text-rose-500 uppercase tracking-widest font-semibold">
                  Técnica Profesional en Maquillaje
                </span>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
            </div>

            {/* Lista de enlaces principales */}
            <nav className="flex flex-col space-y-1">
              <Link
                href="/servicios"
                onClick={closeMenu}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-rose-50 text-stone-800 font-semibold text-sm transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Palette className="h-4 w-4" />
                  </div>
                  <span>Servicios & Tarifas</span>
                </div>
                <ChevronRight className="h-4 w-4 text-stone-400" />
              </Link>

              <Link
                href="/portafolio"
                onClick={closeMenu}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-rose-50 text-stone-800 font-semibold text-sm transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span>Portafolio de Trabajos</span>
                </div>
                <ChevronRight className="h-4 w-4 text-stone-400" />
              </Link>

              <Link
                href="/#sobre-mi"
                onClick={closeMenu}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-rose-50 text-stone-800 font-semibold text-sm transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span>Sobre Shirley (+5 Años Exp.)</span>
                </div>
                <ChevronRight className="h-4 w-4 text-stone-400" />
              </Link>

              <Link
                href="/contacto"
                onClick={closeMenu}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-rose-50 text-stone-800 font-semibold text-sm transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>Contacto & Canales Oficiales</span>
                </div>
                <ChevronRight className="h-4 w-4 text-stone-400" />
              </Link>
            </nav>

            {/* Accesos rápidos de contacto y redes */}
            <div className="pt-2 space-y-2.5 border-t border-rose-50">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=Hola%20Shirley!%20Vengo%20de%20tu%20web%20y%20me%20gustar%C3%ADa%20agendar%20una%20cita%20de%20maquillaje`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 text-xs font-bold shadow-md shadow-emerald-200 transition-all"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                <span>Escribir al WhatsApp (+57 317 611 2095)</span>
              </a>

              <a
                href={BUSINESS_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full rounded-2xl bg-stone-900 hover:bg-stone-800 text-white py-3 px-4 text-xs font-semibold shadow-sm transition-all"
              >
                <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram @{BUSINESS_CONFIG.instagram}</span>
              </a>
            </div>

            {/* Acceso directo al Panel de Shirley */}
            <div className="pt-2 border-t border-rose-50 flex items-center justify-between text-xs text-stone-500">
              <span>¿Eres Shirley?</span>
              <Link
                href="/admin"
                onClick={closeMenu}
                className="font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Panel Super Admin</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
