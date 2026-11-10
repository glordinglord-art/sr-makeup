import React from "react";
import Link from "next/link";
import {
  Calendar,
  Image as ImageIcon,
  DollarSign,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { BrandLogo } from "@/shared/components/ui/brand-logo";

export const metadata = {
  title: "Super Admin | Sr.Makeup · Shirley Ram",
  description: "Panel privado de gestión de citas y portafolio para Shirley Ram.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f9f6f7] text-stone-800 flex flex-col">
      {/* Topbar exclusiva de administración */}
      <header className="sticky top-0 z-50 bg-white/95 border-b border-rose-100/80 shadow-xs backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <BrandLogo size="sm" showText={false} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base font-bold text-stone-900 leading-tight">
                  Sr.Makeup · Panel de Control
                </span>
                <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Super Admin
                </span>
              </div>
              <span className="text-xs text-stone-500">
                Bienvenida, Shirley Ram ✨
              </span>
            </div>
          </div>

          {/* Menú de navegación del panel */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-rose-50 hover:text-rose-700 transition-colors"
            >
              <Calendar className="h-4 w-4 text-rose-500" />
              <span>Agenda de Citas</span>
            </Link>

            <Link
              href="/servicios"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-rose-50 hover:text-rose-700 transition-colors"
            >
              <DollarSign className="h-4 w-4 text-rose-500" />
              <span>Ver Precios</span>
            </Link>

            <Link
              href="/portafolio"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-rose-50 hover:text-rose-700 transition-colors"
            >
              <ImageIcon className="h-4 w-4 text-rose-500" />
              <span>Ver Portafolio</span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
            >
              <span>Ver Web Pública</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido principal del dashboard */}
      <main className="flex-1 mx-auto max-w-7xl px-6 py-8 w-full">
        {children}
      </main>

      <footer className="border-t border-rose-100/60 bg-white py-4 text-center text-xs text-stone-400">
        Sr.Makeup Studio · Sistema de Gestión Privado para Shirley Ram
      </footer>
    </div>
  );
}

