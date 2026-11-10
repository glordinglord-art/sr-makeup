import { apiClient } from "@/shared/lib/api-client";
import { Appointment, CreateAppointmentDto, TimeSlot } from "../types/appointment.types";

export const appointmentsApi = {
  create: async (dto: CreateAppointmentDto): Promise<Appointment> => {
    return apiClient<Appointment>("/appointments", {
      method: "POST",
      body: JSON.stringify(dto),
    });
  },

  getAvailableSlots: async (date: string, serviceId?: string): Promise<TimeSlot[]> => {
    const params = new URLSearchParams({ date, ...(serviceId ? { serviceId } : {}) });
    return apiClient<TimeSlot[]>(`/appointments/availability?${params.toString()}`);
  },

  getAll: async (status?: string): Promise<Appointment[]> => {
    const params = status ? `?status=${status}` : "";
    return apiClient<Appointment[]>(`/appointments${params}`);
  },

  updateStatus: async (id: string, status: Appointment["status"]): Promise<Appointment> => {
    return apiClient<Appointment>(`/appointments/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};

