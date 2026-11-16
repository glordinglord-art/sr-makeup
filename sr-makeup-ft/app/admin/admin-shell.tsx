"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  CalendarDays,
  Image as ImageIcon,
  DollarSign,
  ExternalLink,
  Lock,
  LogOut,
  Sparkles,
  Delete,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { BrandLogo } from "@/shared/components/ui/brand-logo";
import { Button } from "@/shared/components/ui/button";
import { apiClient } from "@/shared/lib/api-client";

const SESSION_KEY = "sr_makeup_admin_session";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [checkingSession, setCheckingSession] = useState<boolean>(true);
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [verifying, setVerifying] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      setAuthorized(true);
    }
    setCheckingSession(false);
  }, []);

  const submitPin = useCallback(async (code: string) => {
    if (code.length < 4) return;
    setVerifying(true);
    setError("");

    try {
      const res = await apiClient<{ ok: boolean; token: string }>("/auth/verify-pin", {
        method: "POST",
        body: JSON.stringify({ pin: code }),
      });
      if (res?.ok) {
        sessionStorage.setItem(SESSION_KEY, res.token || "verified");
        setAuthorized(true);
      }
    } catch (err: any) {
      setError(err?.message || "Código incorrecto");
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setPin("");
      }, 450);
    } finally {
      setVerifying(false);
    }
  }, []);

  const handleDigit = useCallback(
    (digit: string) => {
      if (verifying || pin.length >= 4) return;
      const next = pin + digit;
      setPin(next);
      setError("");
      if (next.length === 4) {
        submitPin(next);
      }
    },
    [pin, verifying, submitPin]
  );

  const handleBackspace = useCallback(() => {
    if (verifying) return;
    setPin((prev) => prev.slice(0, -1));
    setError("");
  }, [verifying]);

  useEffect(() => {
    if (authorized || checkingSession) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleDigit(e.key);
      } else if (e.key === "Backspace") {
        handleBackspace();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [authorized, checkingSession, handleDigit, handleBackspace]);

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthorized(false);
    setPin("");
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#fdfafb] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fff5f7] via-[#fdfafb] to-[#fbecef] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Resplandores decorativos */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div
          className={`w-full max-w-sm rounded-3xl bg-white/95 backdrop-blur-md border border-rose-100 shadow-2xl shadow-rose-900/10 p-7 sm:p-8 space-y-6 transition-transform ${
            shake ? "animate-bounce" : ""
          }`}
        >
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <BrandLogo size="md" showText={false} />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-[11px] font-semibold text-rose-700">
              <Lock className="h-3 w-3" />
              <span>Acceso Privado · Super Admin</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-stone-900">
              Portal de Shirley Ram
            </h1>
            <p className="text-xs text-stone-500 leading-relaxed">
              Ingresa tu código PIN de 4 dígitos para gestionar tu agenda en tiempo real.
            </p>
          </div>

          {/* 4 Indicadores de PIN */}
          <div className="flex justify-center gap-3.5 py-2">
            {[0, 1, 2, 3].map((idx) => {
              const filled = idx < pin.length;
              return (
                <div
                  key={idx}
                  className={`h-12 w-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-200 ${
                    error
                      ? "border-rose-500 bg-rose-50"
                      : filled
                      ? "border-rose-500 bg-rose-500/10 shadow-sm shadow-rose-200 scale-105"
                      : "border-stone-200 bg-stone-50/70"
                  }`}
                >
                  <span
                    className={`h-3 w-3 rounded-full transition-all duration-150 ${
                      filled
                        ? "bg-rose-600 scale-100"
                        : "bg-stone-300/60 scale-75"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {error && (
            <p className="text-center text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl py-2 px-3">
              {error}
            </p>
          )}

          {verifying && (
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-rose-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Verificando acceso...</span>
            </div>
          )}

          {/* Teclado Numérico Táctil */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
              <button
                key={num}
                type="button"
                disabled={verifying}
                onClick={() => handleDigit(num)}
                className="h-13 rounded-2xl bg-stone-50 hover:bg-rose-50 border border-stone-200/70 hover:border-rose-200 font-serif text-xl font-bold text-stone-800 hover:text-rose-700 active:scale-95 transition-all cursor-pointer shadow-2xs"
              >
                {num}
              </button>
            ))}

            <Link
              href="/"
              className="h-13 rounded-2xl flex items-center justify-center text-[11px] font-semibold text-stone-500 hover:text-rose-600 hover:bg-rose-50/60 transition-colors"
            >
              Volver
            </Link>

            <button
              type="button"
              disabled={verifying}
              onClick={() => handleDigit("0")}
              className="h-13 rounded-2xl bg-stone-50 hover:bg-rose-50 border border-stone-200/70 hover:border-rose-200 font-serif text-xl font-bold text-stone-800 hover:text-rose-700 active:scale-95 transition-all cursor-pointer shadow-2xs"
            >
              0
            </button>

            <button
              type="button"
              disabled={verifying || pin.length === 0}
              onClick={handleBackspace}
              className="h-13 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200/70 flex items-center justify-center text-stone-600 active:scale-95 transition-all cursor-pointer disabled:opacity-40"
              title="Borrar dígito"
            >
              <Delete className="h-5 w-5" />
            </button>
          </div>

          <div className="pt-2 border-t border-rose-50 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Conexión protegida con Supabase</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f6f7] text-stone-800 flex flex-col">
      {/* Topbar exclusiva de administración */}
      <header className="sticky top-0 z-50 bg-white/95 border-b border-rose-100/80 shadow-xs backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-18 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/admin">
              <BrandLogo size="sm" showText={false} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm sm:text-base font-bold text-stone-900 leading-tight">
                  Sr.Makeup · Studio
                </span>
                <span className="bg-gradient-to-r from-rose-500 to-rose-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                  Super Admin
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-stone-500 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-rose-400" />
                Bienvenida, Shirley Ram
              </span>
            </div>
          </div>

          {/* Menú de navegación del panel */}
          <nav className="hidden md:flex items-center gap-1.5">
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                pathname === "/admin" || pathname === "/admin/citas"
                  ? "bg-rose-50 text-rose-700"
                  : "text-stone-700 hover:bg-rose-50 hover:text-rose-700"
              }`}
            >
              <Calendar className="h-4 w-4 text-rose-500" />
              <span>Agenda de Citas</span>
            </Link>

            <Link
              href="/admin/calendario"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                pathname === "/admin/calendario"
                  ? "bg-rose-50 text-rose-700"
                  : "text-stone-700 hover:bg-rose-50 hover:text-rose-700"
              }`}
            >
              <CalendarDays className="h-4 w-4 text-rose-500" />
              <span>Calendario y Disponibilidad</span>
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

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
            >
              <span className="hidden sm:inline">Ver Web Pública</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-1.5 text-xs text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-full px-3"
              title="Bloquear panel"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Bloquear</span>
            </Button>
          </div>
        </div>

        {/* Submenú móvil para alternar entre Agenda y Calendario */}
        <div className="md:hidden border-t border-rose-50 px-4 py-2 flex items-center gap-2 bg-white/90">
          <Link
            href="/admin"
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
              pathname === "/admin" || pathname === "/admin/citas"
                ? "bg-rose-50 text-rose-700"
                : "text-stone-600 hover:bg-stone-50"
            }`}
          >
            <Calendar className="h-3.5 w-3.5 text-rose-500" />
            <span>Agenda</span>
          </Link>
          <Link
            href="/admin/calendario"
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
              pathname === "/admin/calendario"
                ? "bg-rose-50 text-rose-700"
                : "text-stone-600 hover:bg-stone-50"
            }`}
          >
            <CalendarDays className="h-3.5 w-3.5 text-rose-500" />
            <span>Calendario</span>
          </Link>
        </div>
      </header>

      {/* Contenido principal del dashboard */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 w-full">
        {children}
      </main>

      <footer className="border-t border-rose-100/60 bg-white py-4 text-center text-xs text-stone-400">
        Sr.Makeup Studio · Sistema de Gestión Privado para Shirley Ram
      </footer>
    </div>
  );
}
