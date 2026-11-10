import { Appointment, CreateAppointmentDto } from "@/features/appointments/types/appointment.types";

const STORAGE_KEY = "sr_makeup_appointments_store";

export interface ExtendedAppointment extends Appointment {
  locationType?: "estudio" | "domicilio";
  address?: string;
  price?: number;
}

const INITIAL_APPOINTMENTS: ExtendedAppointment[] = [
  {
    id: "apt-1",
    clientName: "Valentina Montoya",
    clientEmail: "valentina@gmail.com",
    clientPhone: "+57 312 456 7890",
    serviceId: "novias",
    serviceTitle: "Maquillaje de Novias (Bridal Glam)",
    date: "2026-11-14",
    time: "09:00 AM",
    notes: "Boda en Llanogrande. Deseo piel blindada y pestañas naturales.",
    locationType: "domicilio",
    address: "Llanogrande, Rionegro",
    price: 320000,
    status: "CONFIRMED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "apt-2",
    clientName: "Camila Echeverri",
    clientEmail: "camila.ech@hotmail.com",
    clientPhone: "+57 301 234 5678",
    serviceId: "social",
    serviceTitle: "Maquillaje Social & Fiesta",
    date: "2026-11-15",
    time: "02:30 PM",
    notes: "Grado de universidad. Vestido color verde esmeralda.",
    locationType: "estudio",
    price: 180000,
    status: "PENDING",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "apt-3",
    clientName: "Mariana Restrepo",
    clientEmail: "mrestrepo@gmail.com",
    clientPhone: "+57 320 987 6543",
    serviceId: "quinceaneras",
    serviceTitle: "Quinceañeras Soñadas",
    date: "2026-11-21",
    time: "01:00 PM",
    notes: "Sesión de fotos y fiesta de 15 años.",
    locationType: "domicilio",
    address: "El Poblado, Medellín",
    price: 240000,
    status: "PENDING",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "apt-4",
    clientName: "Dra. Sofía Henao",
    clientEmail: "sofia.henao@clinica.com",
    clientPhone: "+57 315 876 5432",
    serviceId: "automaquillaje",
    serviceTitle: "Taller Personalizado de Automaquillaje",
    date: "2026-11-22",
    time: "10:00 AM",
    notes: "Clase individual para aprender a delinear y preparar piel.",
    locationType: "estudio",
    price: 250000,
    status: "CONFIRMED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const appointmentsStore = {
  getAll: (): ExtendedAppointment[] => {
    if (typeof window === "undefined") return INITIAL_APPOINTMENTS;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  },

  add: (appointment: Omit<ExtendedAppointment, "id" | "createdAt" | "updatedAt">): ExtendedAppointment => {
    const list = appointmentsStore.getAll();
    const newAppointment: ExtendedAppointment = {
      ...appointment,
      id: "apt-" + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newAppointment, ...list];
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    return newAppointment;
  },

  updateStatus: (id: string, status: Appointment["status"]): ExtendedAppointment | null => {
    const list = appointmentsStore.getAll();
    const index = list.findIndex((a) => a.id === id);
    if (index === -1) return null;

    list[index].status = status;
    list[index].updatedAt = new Date().toISOString();
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    return list[index];
  },

  delete: (id: string): boolean => {
    const list = appointmentsStore.getAll();
    const filtered = list.filter((a) => a.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
    return true;
  },
};

