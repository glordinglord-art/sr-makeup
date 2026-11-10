export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceTitle?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentDto {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

