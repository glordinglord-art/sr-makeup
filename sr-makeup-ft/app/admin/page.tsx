"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageCircle,
  Plus,
  Search,
  Filter,
  MapPin,
  Trash2,
  DollarSign,
  TrendingUp,
  UserCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { formatCurrency } from "@/shared/lib/utils";
import { appointmentsStore, ExtendedAppointment } from "@/shared/lib/appointments-store";

export default function AdminDashboardPage() {
  const [appointments, setAppointments] = useState<ExtendedAppointment[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Formulario manual
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newServiceTitle, setNewServiceTitle] = useState("Maquillaje de Novias (Bridal Glam)");
  const [newPrice, setNewPrice] = useState(320000);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("09:00 AM");
  const [newLocationType, setNewLocationType] = useState<"estudio" | "domicilio">("estudio");
  const [newAddress, setNewAddress] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const refreshData = () => {
    setAppointments(appointmentsStore.getAll());
  };

  useEffect(() => {
    refreshData();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setNewDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  // Cambiar estado de cita
  const handleStatusChange = (id: string, status: ExtendedAppointment["status"]) => {
    appointmentsStore.updateStatus(id, status);
    refreshData();
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás segura de eliminar esta cita de la lista?")) {
      appointmentsStore.delete(id);
      refreshData();
    }
  };

  // Crear cita manual
  const handleCreateManual = (e: React.FormEvent) => {
    e.preventDefault();
    appointmentsStore.add({
      clientName: newClientName,
      clientPhone: newClientPhone,
      clientEmail: "agendada-manual@srmakeup.com",
      serviceId: "manual",
      serviceTitle: newServiceTitle,
      date: newDate,
      time: newTime,
      locationType: newLocationType,
      address: newLocationType === "domicilio" ? newAddress : "Estudio Privado",
      price: Number(newPrice),
      notes: newNotes,
      status: "CONFIRMED",
    });

    setIsModalOpen(false);
    setNewClientName("");
    setNewClientPhone("");
    setNewNotes("");
    refreshData();
  };

  // Estadísticas calculadas en tiempo real
  const totalCount = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === "PENDING").length;
  const confirmedCount = appointments.filter((a) => a.status === "CONFIRMED").length;
  const completedCount = appointments.filter((a) => a.status === "COMPLETED").length;
  const projectedRevenue = appointments
    .filter((a) => a.status !== "CANCELLED")
    .reduce((sum, a) => sum + (a.price || 0), 0);

  // Filtrado de citas
  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = filterStatus === "ALL" || apt.status === filterStatus;
    const matchesSearch =
      apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.clientPhone.includes(searchQuery) ||
      (apt.serviceTitle && apt.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Título de la sección y botón de cita manual */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Agenda & Control de Citas
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Gestiona solicitudes de clientas, confirma reservas y envía mensajes directos por WhatsApp.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-md shadow-rose-200"
        >
          <Plus className="h-4 w-4" />
          <span>Agendar Cita Manual</span>
        </Button>
      </div>

      {/* METRICAS PRINCIPALES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Pendientes */}
        <Card className="p-5 border-amber-200 bg-amber-50/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">Por Confirmar</span>
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-stone-900">{pendingCount}</span>
            <span className="text-xs text-stone-500">citas</span>
          </div>
        </Card>

        {/* Confirmadas */}
        <Card className="p-5 border-emerald-200 bg-emerald-50/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Confirmadas</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-stone-900">{confirmedCount}</span>
            <span className="text-xs text-stone-500">citas activas</span>
          </div>
        </Card>

        {/* Ingresos Proyectados */}
        <Card className="p-5 border-rose-200 bg-rose-50/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-700">Ingresos Proyectados</span>
            <DollarSign className="h-4 w-4 text-rose-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 truncate">
              {formatCurrency(projectedRevenue)}
            </span>
          </div>
        </Card>

        {/* Total Citas */}
        <Card className="p-5 border-stone-200 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">Total Historial</span>
            <TrendingUp className="h-4 w-4 text-stone-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-stone-900">{totalCount}</span>
            <span className="text-xs text-stone-500">en agenda</span>
          </div>
        </Card>
      </div>

      {/* FILTROS Y BUSCADOR */}
      <div className="rounded-3xl bg-white border border-rose-100 p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Pestañas de estado */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "ALL", label: `Todas (${totalCount})` },
              { id: "PENDING", label: `Pendientes (${pendingCount})` },
              { id: "CONFIRMED", label: `Confirmadas (${confirmedCount})` },
              { id: "COMPLETED", label: `Completadas (${completedCount})` },
              { id: "CANCELLED", label: "Canceladas" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterStatus === tab.id
                    ? "bg-stone-900 text-white shadow-sm"
                    : "bg-stone-100 hover:bg-stone-200 text-stone-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Campo de búsqueda */}
          <div className="relative w-full md:w-72">
            <Search className="h-4 w-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por clienta o teléfono..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-stone-200 bg-stone-50/70 pl-10 pr-4 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-rose-400 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* LISTA / TARJETAS DE CITAS */}
        <div className="space-y-4 pt-2">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-stone-200 rounded-2xl">
              <Calendar className="h-8 w-8 text-stone-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-700">No se encontraron citas</p>
              <p className="text-xs text-stone-400 mt-1">Prueba cambiando los filtros o agrega una nueva cita.</p>
            </div>
          ) : (
            filteredAppointments.map((apt) => {
              // Limpiar número para link directo de WhatsApp de la clienta
              const clientPhoneDigits = apt.clientPhone.replace(/\D/g, "");
              const formattedPhone = clientPhoneDigits.startsWith("57")
                ? clientPhoneDigits
                : `57${clientPhoneDigits}`;

              const whatsappConfirmationMsg = encodeURIComponent(
                `¡Hola ${apt.clientName}! Te saluda Shirley Ram de Sr.Makeup 💕\n\n` +
                `Te escribo para confirmar tu cita de *${apt.serviceTitle}* para el día *${apt.date}* a las *${apt.time}* (${apt.locationType === "domicilio" ? `A Domicilio en ${apt.address}` : "En Estudio Privado"}).\n\n` +
                `¿Todo en orden para separar tu horario en la agenda? ✨`
              );

              return (
                <div
                  key={apt.id}
                  className="rounded-2xl border border-rose-100 bg-white p-5 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                >
                  {/* Datos del Cliente y Servicio */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif text-lg font-bold text-stone-900">
                        {apt.clientName}
                      </span>

                      {/* Badge de estado */}
                      {apt.status === "PENDING" && (
                        <Badge variant="warning" className="text-[10px] bg-amber-100 text-amber-800">
                          🟡 Pendiente de Confirmar
                        </Badge>
                      )}
                      {apt.status === "CONFIRMED" && (
                        <Badge variant="success" className="text-[10px] bg-emerald-100 text-emerald-800">
                          🟢 Confirmada
                        </Badge>
                      )}
                      {apt.status === "COMPLETED" && (
                        <Badge className="text-[10px] bg-purple-100 text-purple-800">
                          🟣 Realizada
                        </Badge>
                      )}
                      {apt.status === "CANCELLED" && (
                        <Badge className="text-[10px] bg-rose-100 text-rose-800">
                          🔴 Cancelada
                        </Badge>
                      )}

                      <span className="text-[11px] font-bold text-rose-600 ml-auto lg:ml-2">
                        {formatCurrency(apt.price || 0)}
                      </span>
                    </div>

                    <div className="text-xs text-stone-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="font-semibold text-stone-800">💄 {apt.serviceTitle}</span>
                      <span>📅 {apt.date}</span>
                      <span>⏰ {apt.time}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-rose-500" />
                        <span className="capitalize">{apt.locationType}</span>
                        {apt.address && `(${apt.address})`}
                      </span>
                    </div>

                    <div className="text-xs text-stone-500 flex flex-wrap items-center gap-3">
                      <span>📱 {apt.clientPhone}</span>
                      <span>✉️ {apt.clientEmail}</span>
                    </div>

                    {apt.notes && (
                      <p className="text-xs text-stone-500 bg-stone-50 p-2 rounded-xl italic">
                        "{apt.notes}"
                      </p>
                    )}
                  </div>

                  {/* Acciones para Shirley */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0">
                    {/* Botón WhatsApp directo a la clienta */}
                    <a
                      href={`https://wa.me/${formattedPhone}?text=${whatsappConfirmationMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 text-xs font-semibold"
                        title="Abrir chat de WhatsApp con la clienta"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Escribir a Clienta</span>
                      </Button>
                    </a>

                    {/* Botón Confirmar */}
                    {apt.status !== "CONFIRMED" && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(apt.id, "CONFIRMED")}
                        className="bg-stone-900 hover:bg-stone-800 text-white text-xs gap-1"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Confirmar</span>
                      </Button>
                    )}

                    {/* Botón Completar */}
                    {apt.status === "CONFIRMED" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(apt.id, "COMPLETED")}
                        className="text-xs border-purple-200 text-purple-700 hover:bg-purple-50"
                      >
                        Completada
                      </Button>
                    )}

                    {/* Botón Cancelar */}
                    {apt.status !== "CANCELLED" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStatusChange(apt.id, "CANCELLED")}
                        className="text-xs text-stone-500 hover:text-rose-600"
                      >
                        Cancelar
                      </Button>
                    )}

                    {/* Eliminar */}
                    <button
                      onClick={() => handleDelete(apt.id)}
                      className="p-2 text-stone-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      title="Eliminar cita"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* MODAL PARA CREAR CITA MANUAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-rose-50">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Agendar Cita Manual
                </h3>
                <p className="text-xs text-stone-500">
                  Registra clientas que te escriben directamente por Instagram o WhatsApp.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManual} className="space-y-3.5">
              <Input
                label="Nombre de la Clienta"
                required
                placeholder="Ej: Juliana Restrepo"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
              />

              <Input
                label="WhatsApp / Celular"
                required
                placeholder="Ej: 310 123 4567"
                value={newClientPhone}
                onChange={(e) => setNewClientPhone(e.target.value)}
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Servicio
                </label>
                <select
                  value={newServiceTitle}
                  onChange={(e) => {
                    setNewServiceTitle(e.target.value);
                    if (e.target.value.includes("Novias")) setNewPrice(320000);
                    else if (e.target.value.includes("Social")) setNewPrice(180000);
                    else if (e.target.value.includes("Artístico")) setNewPrice(220000);
                    else if (e.target.value.includes("Quinceañeras")) setNewPrice(240000);
                    else setNewPrice(250000);
                  }}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs text-stone-900"
                >
                  <option value="Maquillaje de Novias (Bridal Glam)">Maquillaje de Novias (Bridal Glam) - $320.000</option>
                  <option value="Maquillaje Social & Fiesta">Maquillaje Social & Fiesta - $180.000</option>
                  <option value="Maquillaje Artístico & Editorial">Maquillaje Artístico & Editorial - $220.000</option>
                  <option value="Quinceañeras Soñadas">Quinceañeras Soñadas - $240.000</option>
                  <option value="Taller de Automaquillaje VIP">Taller de Automaquillaje VIP - $250.000</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Fecha</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Hora</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: 10:00 AM"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Modalidad</label>
                  <select
                    value={newLocationType}
                    onChange={(e) => setNewLocationType(e.target.value as "estudio" | "domicilio")}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs"
                  >
                    <option value="estudio">En Estudio</option>
                    <option value="domicilio">A Domicilio</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Precio Acordado</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs"
                  />
                </div>
              </div>

              {newLocationType === "domicilio" && (
                <Input
                  label="Dirección o Hotel"
                  placeholder="Ej: Poblado / Envigado"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Notas</label>
                <textarea
                  rows={2}
                  placeholder="Detalles del vestido, peinado o anticipo..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-rose-50">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" size="sm" className="bg-rose-600 hover:bg-rose-700 text-white font-semibold">
                  Guardar en Agenda
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

