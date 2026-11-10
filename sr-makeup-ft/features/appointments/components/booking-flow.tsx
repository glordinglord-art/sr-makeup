"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  MapPin,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Star,
  Check,
  Edit3,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { BrandLogo } from "@/shared/components/ui/brand-logo";
import { BUSINESS_CONFIG } from "@/shared/constants/business";
import { formatCurrency } from "@/shared/lib/utils";
import { apiClient } from "@/shared/lib/api-client";
import { appointmentsStore, ExtendedAppointment } from "@/shared/lib/appointments-store";
import { LuxuryDatePicker } from "./luxury-date-picker";

interface BookingFlowProps {
  initialServiceId?: string;
}

interface ServiceOption {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  durationMinutes: number;
  category: string;
  badge: string;
  features: string[];
}

const SERVICES_CATALOG: ServiceOption[] = [
  {
    id: "novias",
    title: "Maquillaje de Novias (Bridal Glam)",
    subtitle: "Piel blindada 100% resistente a lágrimas, hidratación de lujo y kit de retoque.",
    price: 320000,
    durationMinutes: 90,
    category: "novias",
    badge: "Más Solicitado",
    features: [
      "Piel blindada a prueba de agua y lágrimas",
      "Pestañas de efecto visón personalizadas",
      "Mini kit de retoque para el día de la boda",
      "Asesoría previa de look y vestido",
    ],
  },
  {
    id: "social",
    title: "Maquillaje Social & Fiesta",
    subtitle: "Ideal para eventos, grados, invitadas a bodas y cenas de gala.",
    price: 180000,
    durationMinutes: 60,
    category: "social",
    badge: "Popular",
    features: [
      "Piel luminosa o mate con fijación 16h+",
      "Pestañas postizas incluidas",
      "Diseño de ojos ahumados o corte glam",
    ],
  },
  {
    id: "artistico",
    title: "Maquillaje Artístico & Editorial",
    subtitle: "Creaciones de fantasía, pasarela, sesiones fotográficas y alta costura.",
    price: 220000,
    durationMinutes: 90,
    category: "artistico",
    badge: "Creativo",
    features: [
      "Técnicas avanzadas de color y grafismo",
      "Pedrería, glitter o texturas especiales",
      "Resistente a luces de estudio y cámara 4K",
    ],
  },
  {
    id: "quinceaneras",
    title: "Quinceañeras Soñadas",
    subtitle: "Estilo princesa, fresco, luminoso y dulce para su noche mágica.",
    price: 240000,
    durationMinutes: 75,
    category: "quinceaneras",
    badge: "Especial",
    features: [
      "Piel de porcelana con destellos de luz",
      "Pestañas de apertura natural",
      "Fijación ultra duradera para bailar toda la noche",
    ],
  },
  {
    id: "automaquillaje",
    title: "Taller Individual de Automaquillaje",
    subtitle: "Clase personalizada de 3 horas para aprender a resaltar tus facciones.",
    price: 250000,
    durationMinutes: 180,
    category: "automaquillaje",
    badge: "VIP 1 a 1",
    features: [
      "Diagnóstico de tu rostro y tono de piel",
      "Revisión de tu cosmetiquera personal",
      "Guía digital en PDF de productos recomendados",
    ],
  },
];

const AVAILABLE_TIMES = [
  "08:00 AM",
  "09:30 AM",
  "11:00 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
];

export function BookingFlow({ initialServiceId }: BookingFlowProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Estado del formulario
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || "novias"
  );
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("09:30 AM");
  const [locationType, setLocationType] = useState<"estudio" | "domicilio">("estudio");
  const [address, setAddress] = useState<string>("");

  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<ExtendedAppointment | null>(null);

  useEffect(() => {
    // Inicializar fecha para el día siguiente como mínimo
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  const selectedService =
    SERVICES_CATALOG.find((s) => s.id === selectedServiceId) || SERVICES_CATALOG[0];

  const occupiedTimes = appointmentsStore
    .getAll()
    .filter((a) => a.date === selectedDate && a.status !== "CANCELLED")
    .map((a) => a.time);

  const handleNextStep = () => {
    if (step === 1) setStep(2);
    else if (step === 2) {
      if (!selectedDate || !selectedTime) {
        alert("Por favor selecciona una fecha y horario para continuar.");
        return;
      }
      if (occupiedTimes.includes(selectedTime)) {
        alert("Ese horario ya se encuentra ocupado. Por favor selecciona otro.");
        return;
      }
      setStep(3);
    }
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Verificación de colisión de horarios
      if (occupiedTimes.includes(selectedTime)) {
        alert(`El horario de las ${selectedTime} ya no está disponible. Por favor selecciona otro.`);
        setStep(2);
        setLoading(false);
        return;
      }

      // 2. Registro en base de datos Supabase a través del backend
      try {
        await apiClient("/appointments", {
          method: "POST",
          body: JSON.stringify({
            clientName,
            clientPhone,
            clientEmail: clientEmail || "cliente@srmakeup.com",
            serviceId: selectedService.id,
            date: selectedDate,
            time: selectedTime,
            notes,
          }),
        });
      } catch (err: any) {
        if (
          err?.message?.includes("disponible") ||
          err?.message?.includes("ocupado") ||
          err?.message?.includes("Slot") ||
          err?.message?.includes("Conflict")
        ) {
          alert(`¡Ups! El horario de las ${selectedTime} acaba de ser reservado por otra persona en la base de datos. Por favor selecciona otro horario.`);
          setStep(2);
          setLoading(false);
          return;
        }
        console.warn("Sincronización fallback:", err);
      }

      // 3. Guardar en memoria local
      const newApt = appointmentsStore.add({
        clientName,
        clientPhone,
        clientEmail: clientEmail || "cliente@srmakeup.com",
        serviceId: selectedService.id,
        serviceTitle: selectedService.title,
        date: selectedDate,
        time: selectedTime,
        locationType,
        address: locationType === "domicilio" ? address : "Estudio Privado (Medellín)",
        price: selectedService.price,
        notes,
        status: "PENDING",
      });

      setConfirmedAppointment(newApt);
      setStep(4);
    } finally {
      setLoading(false);
    }
  };

  const handleEditAppointment = () => {
    if (confirmedAppointment) {
      // Eliminar la temporal para no duplicar en el panel de Shirley al reenviar
      appointmentsStore.delete(confirmedAppointment.id);
    }
    setConfirmedAppointment(null);
    setStep(2); // Vuelve al selector de fecha/hora manteniendo todos los datos intactos
  };

  const handleCancelAppointment = () => {
    if (confirm("¿Estás segura de que deseas cancelar esta solicitud de cita?")) {
      if (confirmedAppointment) {
        appointmentsStore.updateStatus(confirmedAppointment.id, "CANCELLED");
      }
      setConfirmedAppointment(null);
      setStep(1);
      alert("Tu solicitud de cita ha sido cancelada.");
    }
  };

  const handleNewBooking = () => {
    setConfirmedAppointment(null);
    setClientName("");
    setClientPhone("");
    setClientEmail("");
    setNotes("");
    setStep(1);
  };

  // PANTALLA 4: CONFIRMACIÓN EXITOSA
  if (step === 4 && confirmedAppointment) {
    const whatsappMsg = encodeURIComponent(
      `¡Hola Shirley! Acabo de registrar mi cita en tu web oficial Sr.Makeup 💕\n\n` +
      `*Cliente:* ${confirmedAppointment.clientName}\n` +
      `*Servicio:* ${confirmedAppointment.serviceTitle}\n` +
      `*Fecha:* ${confirmedAppointment.date}\n` +
      `*Hora:* ${confirmedAppointment.time}\n` +
      `*Modalidad:* ${confirmedAppointment.locationType === "domicilio" ? `A Domicilio (${confirmedAppointment.address})` : "En Estudio Privado"}\n` +
      `*Valor estimado:* ${formatCurrency(confirmedAppointment.price || 0)}\n\n` +
      `¿Me confirmas si tienes el espacio disponible para asegurar mi fecha?`
    );

    return (
      <div className="max-w-2xl mx-auto rounded-3xl bg-white border border-rose-100 p-8 sm:p-12 shadow-2xl text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-2 border-emerald-200 shadow-lg">
            <CheckCircle2 className="h-10 w-10" />
          </div>
        </div>

        <div className="space-y-2">
          <Badge variant="success" className="text-xs px-3.5 py-1">
            Reserva Registrada en el Sistema
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            ¡Tu Cita está Agendada!
          </h2>
          <p className="text-stone-600 text-sm max-w-md mx-auto">
            Hemos recibido tu solicitud para <strong>{confirmedAppointment.clientName}</strong>.
            A continuación tienes el resumen de tu sesión:
          </p>
        </div>

        {/* Tarjeta de resumen VIP */}
        <div className="rounded-2xl bg-gradient-to-br from-rose-50/80 to-[#fdfafb] border border-rose-100 p-6 text-left space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-rose-100">
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">Servicio</span>
              <h4 className="font-serif text-lg font-bold text-stone-900">{confirmedAppointment.serviceTitle}</h4>
            </div>
            <span className="font-serif text-xl font-bold text-rose-600">
              {formatCurrency(confirmedAppointment.price || 0)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-stone-700 pt-1">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-medium">Fecha</span>
              <span className="font-semibold">{confirmedAppointment.date}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-medium">Hora</span>
              <span className="font-semibold">{confirmedAppointment.time}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-medium">Modalidad</span>
              <span className="font-semibold capitalize">{confirmedAppointment.locationType}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-medium">Lugar</span>
              <span className="font-semibold truncate">{confirmedAppointment.address}</span>
            </div>
          </div>
        </div>

        {/* Botón directo a WhatsApp de Shirley */}
        <div className="space-y-4 pt-2">
          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2.5 font-bold shadow-lg shadow-emerald-200 py-3.5">
              <MessageCircle className="h-5 w-5" />
              <span>Confirmar de Inmediato por WhatsApp</span>
            </Button>
          </a>

          <p className="text-xs text-stone-400">
            Shirley Ram revisará tu solicitud y te contactará para ultimar los detalles.
          </p>

          {/* Opciones de Corrección o Cancelación */}
          <div className="pt-3 border-t border-rose-100/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleEditAppointment}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-rose-50 hover:border-rose-300 text-stone-700 font-semibold text-xs transition-colors shadow-2xs"
            >
              <Edit3 className="h-4 w-4 text-rose-500" />
              <span>Modificar o Corregir Datos</span>
            </button>

            <button
              type="button"
              onClick={handleCancelAppointment}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-red-50 hover:border-red-200 text-stone-600 hover:text-red-600 font-semibold text-xs transition-colors shadow-2xs"
            >
              <XCircle className="h-4 w-4 text-stone-400 hover:text-red-500" />
              <span>Cancelar esta Solicitud</span>
            </button>
          </div>

          {/* Enlaces de pie */}
          <div className="pt-2 flex items-center justify-center gap-3 text-xs text-stone-500">
            <button
              onClick={handleNewBooking}
              className="text-rose-600 hover:text-rose-700 font-semibold underline underline-offset-4"
            >
              Agendar otra cita nueva
            </button>
            <span className="text-stone-300">·</span>
            <Link href="/" className="hover:text-stone-800">
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Barra de progreso de pasos */}
      <div className="rounded-3xl bg-white border border-rose-100 p-6 shadow-sm">
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
          <div
            className={`flex items-center justify-center gap-2 pb-2 border-b-2 transition-all ${step >= 1 ? "border-rose-500 text-rose-600" : "border-stone-200 text-stone-400"
              }`}
          >
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? "bg-rose-500 text-white" : "bg-stone-100 text-stone-500"
              }`}>1</span>
            <span className="hidden sm:inline">1. Servicio</span>
          </div>

          <div
            className={`flex items-center justify-center gap-2 pb-2 border-b-2 transition-all ${step >= 2 ? "border-rose-500 text-rose-600" : "border-stone-200 text-stone-400"
              }`}
          >
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? "bg-rose-500 text-white" : "bg-stone-100 text-stone-500"
              }`}>2</span>
            <span className="hidden sm:inline">2. Fecha y Horario</span>
          </div>

          <div
            className={`flex items-center justify-center gap-2 pb-2 border-b-2 transition-all ${step >= 3 ? "border-rose-500 text-rose-600" : "border-stone-200 text-stone-400"
              }`}
          >
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? "bg-rose-500 text-white" : "bg-stone-100 text-stone-500"
              }`}>3</span>
            <span className="hidden sm:inline">3. Tus Datos</span>
          </div>
        </div>
      </div>

      {/* PASO 1: SELECCIONAR SERVICIO */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">Paso 1 de 3</span>
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              ¿Qué tipo de maquillaje deseas?
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm">
              Selecciona el servicio que mejor se adapte a tu evento especial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES_CATALOG.map((service) => {
              const isSelected = selectedServiceId === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer relative bg-white flex flex-col justify-between ${isSelected
                    ? "border-rose-500 shadow-xl shadow-rose-200/50 -translate-y-1"
                    : "border-rose-100 hover:border-rose-300 hover:shadow-md"
                    }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                        {service.badge}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-stone-500">
                        <Clock className="h-3.5 w-3.5 text-rose-400" />
                        <span>{service.durationMinutes} min</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl font-bold text-stone-900">{service.title}</h3>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">{service.subtitle}</p>
                    </div>

                    <ul className="space-y-1.5 pt-2">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-stone-600">
                          <Check className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-rose-50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase font-medium">Inversión</span>
                      <span className="font-serif text-2xl font-bold text-stone-900">
                        {formatCurrency(service.price)}
                      </span>
                    </div>

                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "border-rose-500 bg-rose-500 text-white" : "border-stone-300"
                      }`}>
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <Button size="lg" onClick={handleNextStep} className="gap-2 px-8 font-semibold">
              <span>Continuar a Fecha y Hora</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* PASO 2: SELECCIONAR FECHA, HORA Y LUGAR */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">Paso 2 de 3</span>
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              ¿Cuándo y dónde será tu cita?
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm">
              Servicio seleccionado: <strong>{selectedService.title}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Modalidad: Estudio o Domicilio */}
            <div className="rounded-3xl bg-white border border-rose-100 p-7 shadow-sm space-y-6">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-rose-500" />
                <span>¿Dónde prefieres tu atención?</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLocationType("estudio")}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${locationType === "estudio"
                    ? "border-rose-500 bg-rose-50/50 shadow-sm"
                    : "border-stone-200 hover:border-rose-200"
                    }`}
                >
                  <span className="font-serif font-bold text-sm text-stone-900 block">En Estudio</span>
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Espacio privado con iluminación profesional en Medellín.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setLocationType("domicilio")}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${locationType === "domicilio"
                    ? "border-rose-500 bg-rose-50/50 shadow-sm"
                    : "border-stone-200 hover:border-rose-200"
                    }`}
                >
                  <span className="font-serif font-bold text-sm text-stone-900 block">A Domicilio VIP</span>
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Shirley se traslada a tu hotel, casa o lugar del evento.
                  </span>
                </button>
              </div>

              {locationType === "domicilio" && (
                <div className="space-y-1.5 pt-2 animate-in fade-in duration-200">
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                    Dirección o Sector del Evento
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Hotel Dann Carlton / Llanogrande / Poblado"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 p-3 text-sm focus:border-rose-400 focus:bg-white focus:outline-none"
                  />
                  <span className="text-[10px] text-stone-400">
                    *El costo de transporte puede variar según la distancia.
                  </span>
                </div>
              )}

              {/* Selector de Fecha de Lujo */}
              <div className="pt-2 border-t border-rose-50">
                <LuxuryDatePicker
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                />
              </div>
            </div>

            {/* Selector de Horario */}
            <div className="rounded-3xl bg-white border border-rose-100 p-7 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <Clock className="h-4 w-4 text-rose-500" />
                <span>Horarios Disponibles</span>
              </h3>
              <p className="text-xs text-stone-500">
                Elige la hora que mejor se ajuste a la hora de salida de tu evento.
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {AVAILABLE_TIMES.map((time) => {
                  const isSelected = selectedTime === time;
                  const isOccupied = occupiedTimes.includes(time);

                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={isOccupied}
                      onClick={() => !isOccupied && setSelectedTime(time)}
                      className={`p-3 rounded-xl border-2 text-xs font-semibold transition-all flex items-center justify-between ${
                        isOccupied
                          ? "border-stone-200 bg-stone-100/80 text-stone-400 cursor-not-allowed line-through opacity-70"
                          : isSelected
                          ? "border-rose-500 bg-rose-500 text-white shadow-md shadow-rose-200"
                          : "border-stone-200 hover:border-rose-300 text-stone-700 bg-white"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{time}</span>
                        {isOccupied && <span className="text-[9px] not-italic text-stone-400 font-normal no-underline">(Ocupado)</span>}
                      </span>
                      {isSelected && !isOccupied && <Check className="h-3.5 w-3.5" />}
                    </button>
                  );
                })}
              </div>

              <div className="rounded-2xl bg-rose-50/50 p-4 border border-rose-100/60 text-xs text-stone-600 mt-4 space-y-1">
                <p className="font-semibold text-stone-800 flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-rose-500" />
                  <span>Duración estimada: {selectedService.durationMinutes} minutos</span>
                </p>
                <p className="text-[11px] text-stone-500">
                  Shirley dedica tiempo exclusivo y sin prisas a cada clienta para un acabado perfecto.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span>Atrás</span>
            </Button>

            <Button size="lg" onClick={handleNextStep} className="gap-2 px-8 font-semibold">
              <span>Continuar a Tus Datos</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* PASO 3: DATOS DE CONTACTO */}
      {step === 3 && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">Paso 3 de 3</span>
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Datos para Confirmar tu Reserva
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm">
              Necesitamos tus datos para que Shirley Ram prepare tu espacio y te contacte.
            </p>
          </div>

          <form onSubmit={handleConfirmBooking} className="rounded-3xl bg-white border border-rose-100 p-8 shadow-xl space-y-5">
            {/* Resumen flotante superior */}
            <div className="rounded-2xl bg-rose-50/70 p-4 border border-rose-100/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-rose-600 font-bold uppercase tracking-wider block">Resumen</span>
                <span className="font-serif font-bold text-sm text-stone-900">{selectedService.title}</span>
                <span className="text-xs text-stone-500 block">
                  📅 {selectedDate} a las ⏰ {selectedTime} ({locationType === "domicilio" ? "A Domicilio" : "En Estudio"})
                </span>
              </div>
              <span className="font-serif text-xl font-bold text-rose-600">
                {formatCurrency(selectedService.price)}
              </span>
            </div>

            <Input
              label="Nombre Completo"
              placeholder="Ej: Laura Gómez"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="WhatsApp / Celular"
                type="tel"
                placeholder="Ej: 300 123 4567"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
              />
              <Input
                label="Correo Electrónico"
                type="email"
                placeholder="laura@ejemplo.com"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Detalles del evento o vestido (Opcional)
              </label>
              <textarea
                rows={3}
                placeholder="Cuéntanos si tienes alguna referencia de peinado, color de vestido o solicitud especial..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 p-3 text-sm text-stone-900 focus:border-rose-400 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-rose-50">
              <Button type="button" variant="outline" onClick={() => setStep(2)} className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                <span>Atrás</span>
              </Button>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="gap-2 px-8 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 font-bold shadow-md shadow-rose-200"
              >
                {loading ? "Registrando Cita..." : "Confirmar y Solicitar Cita"}
                <CheckCircle2 className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

