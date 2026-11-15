import { Appointment, CreateAppointmentDto } from "@/features/appointments/types/appointment.types";

const STORAGE_KEY = "sr_makeup_appointments_store";

export interface ExtendedAppointment extends Appointment {
  locationType?: "estudio" | "domicilio";
  address?: string;
  price?: number;
}

const INITIAL_APPOINTMENTS: ExtendedAppointment[] = [];

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

