import { apiClient } from "@/shared/lib/api-client";
import { Appointment, CreateAppointmentDto, TimeSlot } from "../types/appointment.types";

export interface AvailabilityBlock {
  id: string;
  date: string;
  time: string | null;
  reason: string | null;
  createdAt: string;
}

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

  getBlocks: async (params?: { date?: string; month?: string }): Promise<AvailabilityBlock[]> => {
    const query = new URLSearchParams();
    if (params?.date) query.set("date", params.date);
    if (params?.month) query.set("month", params.month);
    const qs = query.toString();
    return apiClient<AvailabilityBlock[]>(`/appointments/blocks${qs ? `?${qs}` : ""}`);
  },

  toggleBlock: async (dto: {
    date: string;
    time?: string | null;
    reason?: string | null;
  }): Promise<{ blocked: boolean; block: AvailabilityBlock | null }> => {
    return apiClient<{ blocked: boolean; block: AvailabilityBlock | null }>(
      "/appointments/blocks/toggle",
      {
        method: "POST",
        body: JSON.stringify(dto),
      }
    );
  },

  deleteBlock: async (id: string): Promise<{ deleted: boolean }> => {
    return apiClient<{ deleted: boolean }>(`/appointments/blocks/${id}`, {
      method: "DELETE",
    });
  },
};

