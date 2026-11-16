"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Plus,
  Search,
  MapPin,
  Trash2,
  DollarSign,
  TrendingUp,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Clock,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { formatCurrency } from "@/shared/lib/utils";
import { appointmentsStore, ExtendedAppointment } from "@/shared/lib/appointments-store";
import { AdminAppointmentCardSkeleton } from "@/shared/components/ui/skeleton";
import { apiClient } from "@/shared/lib/api-client";
import { parseLookFromNotes } from "@/shared/lib/look-reference";

const SERVICE_CATALOG_MAP: Record<string, { title: string; price: number }> = {
  novias: { title: "Maquillaje de Novias (Bridal Glam)", price: 320000 },
  social: { title: "Maquillaje Social & Fiesta", price: 180000 },
  artistico: { title: "Maquillaje Artístico & Editorial", price: 220000 },
  quinceaneras: { title: "Quinceañeras Soñadas", price: 240000 },
  automaquillaje: { title: "Taller Personalizado de Automaquillaje", price: 200000 },
  "cepillado-secado": { title: "Cepillado, Secado & Planchado", price: 70000 },
  "ondas-peinados": { title: "Ondas Glam & Peinados Sociales", price: 110000 },
  "combo-glam-cabello": { title: "Combo Total: Maquillaje + Cabello", price: 260000 },
  "tratamiento-capilar": { title: "Ritual de Hidratación & Brillo Capilar", price: 130000 },
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export default function AdminDashboardPage() {
  const [appointments, setAppointments] = useState<ExtendedAppointment[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [todayIso, setTodayIso] = useState<string>("");

  // Formulario manual
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newServiceTitle, setNewServiceTitle] = useState("Maquillaje de Novias (Bridal Glam)");
  const [newServiceId, setNewServiceId] = useState("novias");
  const [newPrice, setNewPrice] = useState(320000);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("09:00 AM");
  const [newLocationType, setNewLocationType] = useState<"estudio" | "domicilio">("estudio");
  const [newAddress, setNewAddress] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const refreshData = async () => {
    setIsSyncing(true);
    try {
      const serverAppointments = await apiClient<any[]>("/appointments");
      if (Array.isArray(serverAppointments)) {
        setDbConnected(true);
        const mappedServer: ExtendedAppointment[] = serverAppointments.map((item) => {
          const fallbackService = SERVICE_CATALOG_MAP[item.serviceId];
          const hasDomicilio = item.notes?.toLowerCase().includes("domicilio");
          const dirMatch = item.notes?.match(/Dirección:\s*([^\n]+)/i);
          const extractedAddress = dirMatch?.[1]?.trim();
          return {
            id: item.id,
            clientName: item.clientName,
            clientEmail: item.clientEmail,
            clientPhone: item.clientPhone,
            serviceId: item.serviceId,
            serviceTitle: item.service?.title || fallbackService?.title || "Servicio Sr.Makeup",
            date: item.date,
            time: item.time,
            notes: item.notes,
            locationType: hasDomicilio ? "domicilio" : "estudio",
            address: hasDomicilio ? (extractedAddress || "A domicilio") : "Estudio Privado",
            price: item.service?.price ?? fallbackService?.price ?? 0,
            status: item.status,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
        });
        setAppointments(mappedServer);
      }
    } catch (err) {
      console.warn("No se pudo conectar con Supabase backend, usando caché local:", err);
      setDbConnected(false);
      setAppointments(appointmentsStore.getAll());
    } finally {
      setIsSyncing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const now = new Date();
    setTodayIso(now.toISOString().split("T")[0]);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setNewDate(tomorrow.toISOString().split("T")[0]);
    refreshData();
  }, []);

  const handleStatusChange = async (id: string, status: ExtendedAppointment["status"]) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a))
    );
    appointmentsStore.updateStatus(id, status);

    try {
      await apiClient(`/appointments/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      console.warn("Error actualizando estado en Supabase:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás segura de eliminar esta cita de la agenda?")) return;
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    appointmentsStore.delete(id);

    try {
      await apiClient(`/appointments/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.warn("Error eliminando cita en Supabase:", err);
    }
  };

  const handleCreateManual = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedNotes = `${
      newLocationType === "domicilio" ? `[Domicilio: ${newAddress || "Por confirmar"}] ` : ""
    }${newNotes}`.trim();

    try {
      await apiClient("/appointments", {
        method: "POST",
        body: JSON.stringify({
          clientName: newClientName,
          clientPhone: newClientPhone,
          clientEmail: "manual@srmakeup.com",
          serviceId: newServiceId,
          date: newDate,
          time: newTime,
          notes: formattedNotes || undefined,
        }),
      });
    } catch (err: any) {
      alert(err?.message || "No se pudo guardar en Supabase. Verifica que el horario esté libre.");
      return;
    }

    setIsModalOpen(false);
    setNewClientName("");
    setNewClientPhone("");
    setNewAddress("");
    setNewNotes("");
    refreshData();
  };

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard?.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Estadísticas reales desde Supabase
  const totalCount = appointments.length;
  const todayCount = appointments.filter((a) => a.date === todayIso && a.status !== "CANCELLED").length;
  const pendingCount = appointments.filter((a) => a.status === "PENDING").length;
  const confirmedCount = appointments.filter((a) => a.status === "CONFIRMED").length;
  const completedCount = appointments.filter((a) => a.status === "COMPLETED").length;
  const projectedRevenue = appointments
    .filter((a) => a.status !== "CANCELLED")
    .reduce((sum, a) => sum + (a.price || 0), 0);

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = filterStatus === "ALL" || apt.status === filterStatus;
    const matchesSearch =
      apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.clientPhone.includes(searchQuery) ||
      (apt.serviceTitle && apt.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner VIP de Bienvenida y Acciones */}
      <div className="rounded-3xl bg-gradient-to-br from-white via-[#fff7f9] to-[#fdf0f3] border border-rose-100 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${
                dbConnected
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  dbConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              <span>{dbConnected ? "Supabase en Vivo" : "Modo Sin Conexión"}</span>
            </span>

            {todayCount > 0 && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-rose-100/80 text-rose-800">
                <Sparkles className="h-3 w-3" />
                <span>{todayCount} cita{todayCount > 1 ? "s" : ""} hoy</span>
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Agenda & Control de Citas
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
            Visualiza en tiempo real cada reserva de maquillaje y cabello, confirma horarios y escribe directo por WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={isSyncing}
            className="gap-2 border-rose-200 bg-white text-stone-700 hover:bg-rose-50 rounded-full px-4"
            title="Sincronizar con Supabase"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin text-rose-600" : ""}`} />
            <span>{isSyncing ? "Sincronizando..." : "Actualizar"}</span>
          </Button>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold shadow-md shadow-rose-200 rounded-full px-5"
          >
            <Plus className="h-4 w-4" />
            <span>Nueva Cita Manual</span>
          </Button>
        </div>
      </div>

      {/* MÉTRICAS PRINCIPALES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <Card className="p-5 border-amber-200/80 bg-gradient-to-br from-amber-50/70 to-white hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
              Por Confirmar
            </span>
            <div className="h-8 w-8 rounded-full bg-amber-100/80 flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-amber-600" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-stone-900">{pendingCount}</span>
            <span className="text-xs text-stone-500">pendientes</span>
          </div>
        </Card>

        <Card className="p-5 border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 to-white hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Confirmadas
            </span>
            <div className="h-8 w-8 rounded-full bg-emerald-100/80 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-stone-900">{confirmedCount}</span>
            <span className="text-xs text-stone-500">activas</span>
          </div>
        </Card>

        <Card className="p-5 border-rose-200/80 bg-gradient-to-br from-rose-50/70 to-white hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
              Proyectado
            </span>
            <div className="h-8 w-8 rounded-full bg-rose-100/80 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-rose-600" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 truncate">
              {formatCurrency(projectedRevenue)}
            </span>
          </div>
        </Card>

        <Card className="p-5 border-stone-200/80 bg-white hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
              Total Agenda
            </span>
            <div className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-stone-600" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-stone-900">{totalCount}</span>
            <span className="text-xs text-stone-500">registros reales</span>
          </div>
        </Card>
      </div>

      {/* FILTROS Y BUSCADOR */}
      <div className="rounded-3xl bg-white border border-rose-100 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "ALL", label: `Todas (${totalCount})` },
              { id: "PENDING", label: `Pendientes (${pendingCount})` },
              { id: "CONFIRMED", label: `Confirmadas (${confirmedCount})` },
              { id: "COMPLETED", label: `Realizadas (${completedCount})` },
              { id: "CANCELLED", label: "Canceladas" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filterStatus === tab.id
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="h-4 w-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar clienta, servicio o celular..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-stone-200 bg-stone-50/70 pl-10 pr-4 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-rose-400 focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* LISTA DE CITAS REALES */}
        <div className="space-y-4 pt-1">
          {isLoading ? (
            <div className="space-y-3">
              <AdminAppointmentCardSkeleton />
              <AdminAppointmentCardSkeleton />
              <AdminAppointmentCardSkeleton />
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-14 border-2 border-dashed border-rose-100 rounded-3xl bg-rose-50/20 space-y-3">
              <div className="h-12 w-12 rounded-full bg-rose-50 flex items-center justify-center mx-auto">
                <Calendar className="h-6 w-6 text-rose-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-800">
                  {totalCount === 0
                    ? "Tu agenda en Supabase está lista y limpia"
                    : "No hay citas con este filtro"}
                </p>
                <p className="text-xs text-stone-400 mt-1 max-w-md mx-auto">
                  {totalCount === 0
                    ? "Cuando una clienta reserve desde la web o registres una cita manual, aparecerá aquí al instante."
                    : "Prueba cambiando el filtro o limpiando tu búsqueda."}
                </p>
              </div>
              {totalCount === 0 && (
                <Button
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                  className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-5 gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Agendar Primera Cita</span>
                </Button>
              )}
            </div>
          ) : (
            filteredAppointments.map((apt) => {
              const clientPhoneDigits = apt.clientPhone.replace(/\D/g, "");
              const formattedPhone = clientPhoneDigits.startsWith("57")
                ? clientPhoneDigits
                : `57${clientPhoneDigits}`;

              const whatsappConfirmationMsg = encodeURIComponent(
                `¡Hola ${apt.clientName}! Te saluda Shirley Ram de Sr.Makeup 💕\n\n` +
                  `Te escribo para confirmar tu cita de *${apt.serviceTitle}* para el día *${apt.date}* a las *${apt.time}* (${
                    apt.locationType === "domicilio"
                      ? `A Domicilio`
                      : "En Estudio Privado"
                  }).\n\n` +
                  `¿Todo en orden para asegurar tu espacio en la agenda? ✨`
              );

              return (
                <div
                  key={apt.id}
                  className="rounded-2xl border border-rose-100/90 bg-white p-5 shadow-xs hover:shadow-md hover:border-rose-200 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                >
                  <div className="flex items-start gap-4 flex-1">
                    {/* Avatar Iniciales */}
                    <div className="hidden sm:flex h-12 w-12 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-200/70 text-rose-800 font-serif font-bold text-base items-center justify-center shrink-0 border border-rose-200/60">
                      {getInitials(apt.clientName)}
                    </div>

                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-serif text-lg font-bold text-stone-900">
                          {apt.clientName}
                        </span>

                        {apt.status === "PENDING" && (
                          <Badge variant="warning" className="text-[10px] bg-amber-100 text-amber-800">
                            🟡 Pendiente
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

                        <span className="text-xs font-bold text-rose-600 ml-auto lg:ml-2">
                          {formatCurrency(apt.price || 0)}
                        </span>
                      </div>

                      <div className="text-xs text-stone-600 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                        <span className="font-semibold text-stone-800 bg-rose-50/70 px-2.5 py-0.5 rounded-lg border border-rose-100">
                          ✨ {apt.serviceTitle}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-rose-400" />
                          {apt.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-rose-400" />
                          {apt.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-rose-400" />
                          <span className="capitalize">{apt.locationType}</span>
                        </span>
                      </div>

                      <div className="text-xs text-stone-500 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleCopyPhone(apt.id, apt.clientPhone)}
                          className="inline-flex items-center gap-1.5 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Copiar teléfono"
                        >
                          <span>📱 {apt.clientPhone}</span>
                          {copiedId === apt.id ? (
                            <Check className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <Copy className="h-3 w-3 text-stone-300" />
                          )}
                        </button>
                        {apt.clientEmail && apt.clientEmail !== "manual@srmakeup.com" && (
                          <span>✉️ {apt.clientEmail}</span>
                        )}
                      </div>

                      {(() => {
                        const { look, cleanNotes } = parseLookFromNotes(apt.notes);
                        return (
                          <>
                            {look && (
                              <div className="flex items-center gap-3 bg-rose-50/70 border border-rose-200/80 rounded-2xl p-2.5">
                                {look.imageUrl && (
                                  <img
                                    src={look.imageUrl}
                                    alt={look.title}
                                    className="h-12 w-12 rounded-xl object-cover border border-rose-200 bg-white shrink-0"
                                  />
                                )}
                                <div className="min-w-0">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                                    Look Elegido por la Clienta
                                  </span>
                                  <span className="text-xs font-bold text-stone-900 truncate block">
                                    {look.title}
                                  </span>
                                </div>
                              </div>
                            )}
                            {cleanNotes && (
                              <p className="text-xs text-stone-600 bg-stone-50/80 p-2.5 rounded-xl italic border border-stone-100">
                                "{cleanNotes}"
                              </p>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Acciones para Shirley */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0">
                    <a
                      href={`https://wa.me/${formattedPhone}?text=${whatsappConfirmationMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 text-xs font-semibold shadow-xs rounded-full"
                        title="Abrir chat de WhatsApp con la clienta"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>WhatsApp</span>
                      </Button>
                    </a>

                    {apt.status !== "CONFIRMED" && apt.status !== "COMPLETED" && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(apt.id, "CONFIRMED")}
                        className="bg-stone-900 hover:bg-stone-800 text-white text-xs gap-1 rounded-full"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Confirmar</span>
                      </Button>
                    )}

                    {apt.status === "CONFIRMED" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(apt.id, "COMPLETED")}
                        className="text-xs border-purple-200 text-purple-700 hover:bg-purple-50 rounded-full"
                      >
                        Realizada
                      </Button>
                    )}

                    {apt.status !== "CANCELLED" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStatusChange(apt.id, "CANCELLED")}
                        className="text-xs text-stone-500 hover:text-rose-600 rounded-full"
                      >
                        Cancelar
                      </Button>
                    )}

                    <button
                      onClick={() => handleDelete(apt.id)}
                      className="p-2 text-stone-300 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                      title="Eliminar cita permanentemente"
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
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-rose-50">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Agendar Cita Manual
                </h3>
                <p className="text-xs text-stone-500">
                  Guarda directamente en Supabase citas tomadas por Instagram o WhatsApp.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
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
                  value={newServiceId}
                  onChange={(e) => {
                    const sid = e.target.value;
                    setNewServiceId(sid);
                    const picked = SERVICE_CATALOG_MAP[sid];
                    if (picked) {
                      setNewServiceTitle(picked.title);
                      setNewPrice(picked.price);
                    }
                  }}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-rose-400"
                >
                  <option value="novias">Maquillaje de Novias (Bridal Glam) - $320.000</option>
                  <option value="social">Maquillaje Social & Fiesta - $180.000</option>
                  <option value="artistico">Maquillaje Artístico & Editorial - $220.000</option>
                  <option value="quinceaneras">Quinceañeras Soñadas - $240.000</option>
                  <option value="automaquillaje">Taller de Automaquillaje - $200.000</option>
                  <option value="cepillado-secado">Cabello: Cepillado, Secado & Planchado - $70.000</option>
                  <option value="ondas-peinados">Cabello: Ondas Glam & Peinados Sociales - $110.000</option>
                  <option value="combo-glam-cabello">Combo Total: Maquillaje + Cabello - $260.000</option>
                  <option value="tratamiento-capilar">Cabello: Ritual de Hidratación & Brillo - $130.000</option>
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
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Hora</label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs focus:outline-none focus:border-rose-400"
                  >
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Modalidad</label>
                  <select
                    value={newLocationType}
                    onChange={(e) => setNewLocationType(e.target.value as "estudio" | "domicilio")}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs focus:outline-none focus:border-rose-400"
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
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs focus:outline-none focus:border-rose-400"
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
                  placeholder="Detalles del vestido, cabello o anticipo..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-rose-50">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" size="sm" className="bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full px-5">
                  Guardar en Supabase
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
