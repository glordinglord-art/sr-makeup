"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Ban,
  Sparkles,
  RefreshCw,
  ArrowLeft,
  User,
  Phone,
  XCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { apiClient } from "@/shared/lib/api-client";
import {
  appointmentsApi,
  AvailabilityBlock,
} from "@/features/appointments/services/appointments.api";

const ALL_SLOTS = [
  "08:00 AM",
  "09:30 AM",
  "11:00 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
];

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

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

interface AdminAppointmentItem {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceId: string;
  service?: { title?: string; price?: number };
  date: string;
  time: string;
  notes?: string | null;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}

function toIsoDate(year: number, monthIndex: number, day: number): string {
  const m = String(monthIndex + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function formatReadableDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AdminCalendarPage() {
  const today = useMemo(() => new Date(), []);
  const todayIso = useMemo(
    () => toIsoDate(today.getFullYear(), today.getMonth(), today.getDate()),
    [today]
  );

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(todayIso);

  const [appointments, setAppointments] = useState<AdminAppointmentItem[]>([]);
  const [blocks, setBlocks] = useState<AvailabilityBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingKey, setTogglingKey] = useState<string | null>(null);
  const [updatingApptId, setUpdatingApptId] = useState<string | null>(null);
  const [blockReason, setBlockReason] = useState("");

  const monthPrefix = useMemo(() => {
    const m = String(currentMonth + 1).padStart(2, "0");
    return `${currentYear}-${m}`;
  }, [currentYear, currentMonth]);

  const loadCalendarData = useCallback(async () => {
    setLoading(true);
    try {
      const [apptsData, blocksData] = await Promise.all([
        apiClient<AdminAppointmentItem[]>("/appointments"),
        appointmentsApi.getBlocks({ month: monthPrefix }),
      ]);
      setAppointments(Array.isArray(apptsData) ? apptsData : []);
      setBlocks(Array.isArray(blocksData) ? blocksData : []);
    } catch (err) {
      console.error("Error cargando calendario:", err);
    } finally {
      setLoading(false);
    }
  }, [monthPrefix]);

  useEffect(() => {
    loadCalendarData();
  }, [loadCalendarData]);

  const appointmentsByDate = useMemo(() => {
    const map = new Map<string, AdminAppointmentItem[]>();
    for (const appt of appointments) {
      if (appt.status === "CANCELLED") continue;
      const list = map.get(appt.date) || [];
      list.push(appt);
      map.set(appt.date, list);
    }
    return map;
  }, [appointments]);

  const blocksByDate = useMemo(() => {
    const map = new Map<string, AvailabilityBlock[]>();
    for (const blk of blocks) {
      const list = map.get(blk.date) || [];
      list.push(blk);
      map.set(blk.date, list);
    }
    return map;
  }, [blocks]);

  const calendarCells = useMemo(() => {
    const firstDayIdx = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const cells: Array<{ day: number; iso: string } | null> = [];

    for (let i = 0; i < firstDayIdx; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) {
      cells.push({
        day: d,
        iso: toIsoDate(currentYear, currentMonth, d),
      });
    }
    return cells;
  }, [currentYear, currentMonth]);

  const selectedDayAppointments = useMemo(
    () => appointmentsByDate.get(selectedDate) || [],
    [appointmentsByDate, selectedDate]
  );

  const selectedDayBlocks = useMemo(
    () => blocksByDate.get(selectedDate) || [],
    [blocksByDate, selectedDate]
  );

  const fullDayBlock = useMemo(
    () => selectedDayBlocks.find((b) => b.time === null) || null,
    [selectedDayBlocks]
  );

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

  const handleToggleDay = async () => {
    const key = `${selectedDate}-FULL`;
    setTogglingKey(key);
    try {
      const res = await appointmentsApi.toggleBlock({
        date: selectedDate,
        time: null,
        reason: blockReason.trim() || "Día no disponible",
      });
      if (res.blocked && res.block) {
        setBlocks((prev) => [...prev, res.block!]);
        setBlockReason("");
      } else {
        setBlocks((prev) =>
          prev.filter((b) => !(b.date === selectedDate && b.time === null))
        );
      }
    } catch (err) {
      console.error("Error actualizando día:", err);
    } finally {
      setTogglingKey(null);
    }
  };

  const handleToggleSlot = async (time: string) => {
    const key = `${selectedDate}-${time}`;
    setTogglingKey(key);
    try {
      const res = await appointmentsApi.toggleBlock({
        date: selectedDate,
        time,
        reason: blockReason.trim() || "Horario bloqueado por Shirley",
      });
      if (res.blocked && res.block) {
        setBlocks((prev) => [...prev, res.block!]);
      } else {
        setBlocks((prev) =>
          prev.filter((b) => !(b.date === selectedDate && b.time === time))
        );
      }
    } catch (err) {
      console.error("Error actualizando franja horaria:", err);
    } finally {
      setTogglingKey(null);
    }
  };

  const handleQuickStatus = async (
    id: string,
    status: AdminAppointmentItem["status"]
  ) => {
    setUpdatingApptId(id);
    try {
      await appointmentsApi.updateStatus(id, status);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch (err) {
      console.error("Error actualizando estado:", err);
    } finally {
      setUpdatingApptId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 hover:text-rose-600 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Volver a Agenda</span>
            </Link>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 flex items-center gap-2.5">
            <CalendarDays className="h-7 w-7 text-rose-500" />
            <span>Calendario y Disponibilidad</span>
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Revisa en qué fechas tienes citas y marca qué días u horas sí vas a
            atender y cuáles no.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={loadCalendarData}
          disabled={loading}
          className="gap-2 rounded-full border-rose-200 text-stone-700 hover:bg-rose-50 self-start sm:self-auto"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          <span>Actualizar</span>
        </Button>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap items-center gap-4 text-xs bg-white border border-rose-100 rounded-2xl px-4 py-3 shadow-2xs">
        <div className="flex items-center gap-1.5 text-stone-700">
          <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
          <span>Disponible (Atiende)</span>
        </div>
        <div className="flex items-center gap-1.5 text-stone-700">
          <span className="h-3 w-3 rounded-full bg-amber-400 inline-block" />
          <span>Horas bloqueadas</span>
        </div>
        <div className="flex items-center gap-1.5 text-stone-700">
          <span className="h-3 w-3 rounded-full bg-red-500 inline-block" />
          <span>No atiende (Día cerrado)</span>
        </div>
        <div className="flex items-center gap-1.5 text-stone-700">
          <span className="px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-[10px]">
            2 citas
          </span>
          <span>Citas agendadas ese día</span>
        </div>
      </div>

      {/* Contenido principal: Calendario + Panel de detalle */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Calendario mensual */}
        <Card className="lg:col-span-7 p-4 sm:p-6 rounded-3xl border-rose-100 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-bold text-stone-900">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </h2>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentYear(today.getFullYear());
                  setCurrentMonth(today.getMonth());
                  setSelectedDate(todayIso);
                }}
                className="rounded-full text-xs border-rose-100 hover:bg-rose-50"
              >
                Hoy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevMonth}
                className="h-9 w-9 p-0 rounded-full border-rose-100 hover:bg-rose-50"
                title="Mes anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextMonth}
                className="h-9 w-9 p-0 rounded-full border-rose-100 hover:bg-rose-50"
                title="Mes siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {WEEKDAYS.map((wd) => (
              <div
                key={wd}
                className="text-center text-[11px] font-bold uppercase tracking-wider text-stone-400 py-1"
              >
                {wd}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {calendarCells.map((cell, idx) => {
              if (!cell) {
                return <div key={`empty-${idx}`} className="h-16 sm:h-20" />;
              }

              const dayAppts = appointmentsByDate.get(cell.iso) || [];
              const dayBlocks = blocksByDate.get(cell.iso) || [];
              const isFullBlocked = dayBlocks.some((b) => b.time === null);
              const hasPartialBlocks = !isFullBlocked && dayBlocks.length > 0;
              const isSelected = selectedDate === cell.iso;
              const isToday = cell.iso === todayIso;

              return (
                <button
                  key={cell.iso}
                  type="button"
                  onClick={() => setSelectedDate(cell.iso)}
                  className={`h-16 sm:h-20 rounded-2xl p-1.5 sm:p-2 flex flex-col justify-between items-start text-left border transition-all cursor-pointer relative ${
                    isSelected
                      ? "border-rose-500 ring-2 ring-rose-200 bg-rose-50/60"
                      : isFullBlocked
                        ? "border-red-200 bg-red-50/70 hover:bg-red-50"
                        : hasPartialBlocks
                          ? "border-amber-200 bg-amber-50/50 hover:bg-amber-50"
                          : "border-stone-100 bg-stone-50/40 hover:bg-rose-50/30 hover:border-rose-200"
                  }`}
                >
                  <div className="w-full flex items-center justify-between">
                    <span
                      className={`text-xs sm:text-sm font-bold ${
                        isToday
                          ? "bg-rose-600 text-white h-6 w-6 rounded-full flex items-center justify-center"
                          : isFullBlocked
                            ? "text-red-700"
                            : "text-stone-800"
                      }`}
                    >
                      {cell.day}
                    </span>

                    <span
                      className={`h-2 w-2 rounded-full ${
                        isFullBlocked
                          ? "bg-red-500"
                          : hasPartialBlocks
                            ? "bg-amber-400"
                            : "bg-emerald-500"
                      }`}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-0.5">
                    {isFullBlocked && (
                      <span className="text-[9px] sm:text-[10px] font-bold text-red-600 truncate w-full">
                        No atiende
                      </span>
                    )}
                    {dayAppts.length > 0 && (
                      <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-[9px] sm:text-[10px] w-fit">
                        {dayAppts.length}{" "}
                        {dayAppts.length === 1 ? "cita" : "citas"}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Panel derecho: gestión del día seleccionado */}
        <Card className="lg:col-span-5 p-5 sm:p-6 rounded-3xl border-rose-100 bg-white shadow-sm space-y-5">
          <div className="border-b border-rose-100 pb-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">
                Día Seleccionado
              </span>
              {fullDayBlock ? (
                <Badge className="bg-red-100 text-red-700 border-red-200">
                  No atiende este día
                </Badge>
              ) : (
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  Atiende ({selectedDayAppointments.length} citas)
                </Badge>
              )}
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 capitalize mt-1">
              {formatReadableDate(selectedDate)}
            </h3>
          </div>

          {/* Control de día completo */}
          <div
            className={`p-4 rounded-2xl border space-y-3 ${
              fullDayBlock
                ? "bg-red-50/70 border-red-200"
                : "bg-stone-50 border-stone-200/80"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-stone-900">
                  {fullDayBlock
                    ? "Día cerrado para reservas"
                    : "Disponibilidad del día completo"}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  {fullDayBlock
                    ? fullDayBlock.reason ||
                      "Las clientas no pueden agendar citas este día."
                    : "Si no vas a trabajar esta fecha, bloquéala con un clic."}
                </p>
              </div>
            </div>

            {!fullDayBlock && (
              <Input
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Motivo opcional (ej. Viaje, Evento privado, Descanso)"
                className="bg-white text-xs h-9 rounded-xl border-stone-200"
              />
            )}

            <Button
              type="button"
              onClick={handleToggleDay}
              disabled={togglingKey === `${selectedDate}-FULL`}
              variant={fullDayBlock ? "primary" : "outline"}
              className={`w-full rounded-xl gap-2 text-xs font-bold ${
                fullDayBlock
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "border-red-200 text-red-600 hover:bg-red-50"
              }`}
            >
              {togglingKey === `${selectedDate}-FULL` ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : fullDayBlock ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Ban className="h-4 w-4" />
              )}
              <span>
                {fullDayBlock
                  ? "Habilitar este día para atender"
                  : "Marcar que NO atiende este día"}
              </span>
            </Button>
          </div>

          {/* Lista de franjas horarias y citas del día */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-rose-500" />
                <span>Horarios y citas del día</span>
              </h4>
              <span className="text-[11px] text-stone-400">
                Clic para bloquear / habilitar hora
              </span>
            </div>

            <div className="space-y-2">
              {ALL_SLOTS.map((slot) => {
                const appt = selectedDayAppointments.find((a) => a.time === slot);
                const slotBlock = selectedDayBlocks.find((b) => b.time === slot);
                const isToggling = togglingKey === `${selectedDate}-${slot}`;

                if (appt) {
                  return (
                    <div
                      key={slot}
                      className="p-3 rounded-2xl border border-rose-200 bg-rose-50/50 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-rose-700 bg-white px-2.5 py-1 rounded-lg border border-rose-100">
                            {slot}
                          </span>
                          <span className="text-xs font-bold text-stone-900 flex items-center gap-1">
                            <User className="h-3 w-3 text-rose-400" />
                            {appt.clientName}
                          </span>
                        </div>
                        <Badge
                          className={`text-[10px] ${
                            appt.status === "CONFIRMED"
                              ? "bg-emerald-100 text-emerald-700"
                              : appt.status === "COMPLETED"
                                ? "bg-stone-100 text-stone-700"
                                : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {appt.status === "CONFIRMED"
                            ? "Confirmada"
                            : appt.status === "COMPLETED"
                              ? "Completada"
                              : "Pendiente"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-xs text-stone-600">
                        <span className="truncate">
                          {appt.service?.title || appt.serviceId}
                        </span>
                        <span className="text-[11px] text-stone-500 flex items-center gap-1 shrink-0">
                          <Phone className="h-3 w-3" />
                          {appt.clientPhone}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        {appt.status === "PENDING" && (
                          <Button
                            size="sm"
                            disabled={updatingApptId === appt.id}
                            onClick={() =>
                              handleQuickStatus(appt.id, "CONFIRMED")
                            }
                            className="h-7 px-3 text-[11px] rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            Atender / Confirmar
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={updatingApptId === appt.id}
                          onClick={() =>
                            handleQuickStatus(appt.id, "CANCELLED")
                          }
                          className="h-7 px-3 text-[11px] rounded-lg border-red-200 text-red-600 hover:bg-red-50 gap-1"
                        >
                          <XCircle className="h-3 w-3" />
                          Cancelar cita
                        </Button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={slot}
                    className={`flex items-center justify-between p-2.5 rounded-2xl border transition-colors ${
                      fullDayBlock || slotBlock
                        ? "bg-stone-100/80 border-stone-200 text-stone-500"
                        : "bg-white border-stone-100 hover:border-rose-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-stone-800 w-18">
                        {slot}
                      </span>
                      {fullDayBlock ? (
                        <span className="text-[11px] text-red-600 font-medium">
                          Día cerrado
                        </span>
                      ) : slotBlock ? (
                        <span className="text-[11px] text-amber-700 font-medium">
                          No atiende esta hora
                        </span>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          Disponible
                        </span>
                      )}
                    </div>

                    {!fullDayBlock && (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={isToggling}
                        onClick={() => handleToggleSlot(slot)}
                        className={`h-7 px-3 text-[11px] rounded-xl ${
                          slotBlock
                            ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                            : "border-amber-200 text-amber-700 hover:bg-amber-50"
                        }`}
                      >
                        {isToggling ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : slotBlock ? (
                          "Habilitar"
                        ) : (
                          "No atiendo"
                        )}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
