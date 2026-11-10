"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface LuxuryDatePickerProps {
  selectedDate: string; // YYYY-MM-DD
  onDateChange: (date: string) => void;
  minDate?: string;
}

const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const WEEKDAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export function LuxuryDatePicker({
  selectedDate,
  onDateChange,
  minDate,
}: LuxuryDatePickerProps) {
  // Modalidad de vista: "strip" (días rápidos deslizables) o "calendar" (mes completo)
  const [viewMode, setViewMode] = useState<"strip" | "calendar">("strip");

  // Fecha base para el calendario mensual
  const [currentYear, setCurrentYear] = useState(() => {
    if (selectedDate) return parseInt(selectedDate.split("-")[0], 10);
    return new Date().getFullYear();
  });
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate) return parseInt(selectedDate.split("-")[1], 10) - 1;
    return new Date().getMonth();
  });

  // Generar lista de próximos 14 días para la tira rápida
  const quickDays = useMemo(() => {
    const list = [];
    const base = new Date();
    // Empezamos desde mañana o la fecha mínima
    base.setDate(base.getDate() + 1);

    for (let i = 0; i < 14; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);

      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const dayNum = String(d.getDate()).padStart(2, "0");
      const iso = `${y}-${m}-${dayNum}`;

      const weekday = WEEKDAY_NAMES[d.getDay()];
      const monthShort = MONTH_NAMES[d.getMonth()].slice(0, 3);

      list.push({
        iso,
        dayNum,
        weekday,
        monthShort,
        isWeekend: d.getDay() === 0 || d.getDay() === 6,
      });
    }
    return list;
  }, []);

  // Generar cuadrícula de días para el calendario mensual
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Días vacíos previos para alinear el primer día de la semana
    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }

    const todayIso = new Date().toISOString().split("T")[0];
    const effectiveMinDate = minDate || todayIso;

    for (let d = 1; d <= daysInMonth; d++) {
      const dayStr = String(d).padStart(2, "0");
      const monthStr = String(currentMonth + 1).padStart(2, "0");
      const iso = `${currentYear}-${monthStr}-${dayStr}`;

      const isPast = iso < effectiveMinDate;

      days.push({
        dayNumber: d,
        iso,
        isPast,
      });
    }

    return days;
  }, [currentYear, currentMonth, minDate]);

  // Navegación de mes
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Formato legible para la fecha seleccionada
  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return "";
    const parts = selectedDate.split("-");
    if (parts.length !== 3) return selectedDate;
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    const dateObj = new Date(y, m, d);
    const weekday = WEEKDAY_NAMES[dateObj.getDay()];
    const month = MONTH_NAMES[m];
    return `${weekday}, ${d} de ${month} de ${y}`;
  }, [selectedDate]);

  return (
    <div className="space-y-3.5">
      {/* Encabezado con Switch de Modo */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
          <CalendarIcon className="h-4 w-4 text-rose-500" />
          <span>Fecha de tu Cita</span>
        </label>

        <button
          type="button"
          onClick={() => setViewMode((m) => (m === "strip" ? "calendar" : "strip"))}
          className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 underline underline-offset-2 transition-colors cursor-pointer"
        >
          {viewMode === "strip" ? "Ver calendario del mes" : "Ver días próximos"}
        </button>
      </div>

      {/* VISTA 1: TIRA RÁPIDA DE DÍAS (Súper cómoda en móviles) */}
      {viewMode === "strip" && (
        <div className="space-y-2">
          {/* Contenedor desplazable horizontalmente */}
          <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none px-0.5 -mx-1 sm:mx-0">
            {quickDays.map((item) => {
              const isSelected = selectedDate === item.iso;
              return (
                <button
                  key={item.iso}
                  type="button"
                  onClick={() => onDateChange(item.iso)}
                  className={`flex flex-col items-center justify-between min-w-[70px] sm:min-w-[76px] py-3 px-2 rounded-2xl border-2 transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? "border-rose-500 bg-gradient-to-b from-rose-500 to-rose-600 text-white shadow-md shadow-rose-200 -translate-y-0.5 scale-105"
                      : "border-rose-100/80 bg-white hover:border-rose-300 text-stone-700 shadow-xs"
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      isSelected ? "text-rose-100" : "text-stone-400"
                    }`}
                  >
                    {item.weekday}
                  </span>

                  <span className="font-serif text-xl sm:text-2xl font-bold my-0.5">
                    {item.dayNum}
                  </span>

                  <span
                    className={`text-[10px] font-medium capitalize ${
                      isSelected ? "text-rose-100" : "text-stone-500"
                    }`}
                  >
                    {item.monthShort}
                  </span>

                  {/* Indicador de fin de semana o disponible */}
                  <span
                    className={`h-1.5 w-1.5 rounded-full mt-1.5 ${
                      isSelected
                        ? "bg-white"
                        : item.isWeekend
                        ? "bg-rose-400"
                        : "bg-emerald-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-stone-400 text-right">
            ← Desliza para ver más días →
          </p>
        </div>
      )}

      {/* VISTA 2: CALENDARIO MENSUAL COMPLETO */}
      {viewMode === "calendar" && (
        <div className="rounded-2xl border border-rose-100 bg-white p-4 shadow-xs space-y-3 animate-in fade-in zoom-in-95 duration-200">
          {/* Navegación del mes */}
          <div className="flex items-center justify-between pb-2 border-b border-rose-50">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600 cursor-pointer"
              title="Mes anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="font-serif text-sm font-bold text-stone-900">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600 cursor-pointer"
              title="Mes siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAY_NAMES.map((w, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold uppercase tracking-wider text-stone-400 py-1"
              >
                {w}
              </span>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarDays.map((day, idx) => {
              if (!day) {
                return <div key={`empty-${idx}`} className="h-8 w-8" />;
              }

              const isSelected = selectedDate === day.iso;
              const isDisabled = day.isPast;

              return (
                <button
                  key={day.iso}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => !isDisabled && onDateChange(day.iso)}
                  className={`h-8 w-8 mx-auto rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-rose-500 text-white shadow-sm shadow-rose-200 font-bold scale-110"
                      : isDisabled
                      ? "text-stone-300 cursor-not-allowed line-through"
                      : "text-stone-700 hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
                  }`}
                >
                  {day.dayNumber}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Banner de Confirmación Visual de la Fecha Seleccionada */}
      {selectedDate && (
        <div className="rounded-xl bg-rose-50/80 border border-rose-100/90 p-2.5 px-3 flex items-center justify-between text-xs text-rose-900 shadow-2xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <div>
              <span className="font-semibold block capitalize">
                {formattedSelectedDate}
              </span>
              <span className="text-[10px] text-stone-500">
                Fecha confirmada para tu reserva
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/80 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full">
            Seleccionada
          </span>
        </div>
      )}
    </div>
  );
}
