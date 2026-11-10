import { apiClient } from "@/shared/lib/api-client";
import { Service, CreateServiceDto } from "../types/service.types";

export const servicesApi = {
  getAll: async (category?: string): Promise<Service[]> => {
    const params = category ? `?category=${category}` : "";
    return apiClient<Service[]>(`/services${params}`);
  },

  getById: async (id: string): Promise<Service> => {
    return apiClient<Service>(`/services/${id}`);
  },

  create: async (dto: CreateServiceDto): Promise<Service> => {
    return apiClient<Service>("/services", {
      method: "POST",
      body: JSON.stringify(dto),
    });
  },

  update: async (id: string, dto: Partial<CreateServiceDto>): Promise<Service> => {
    return apiClient<Service>(`/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(dto),
    });
  },

  delete: async (id: string): Promise<{ success: boolean }> => {
    return apiClient<{ success: boolean }>(`/services/${id}`, {
      method: "DELETE",
    });
  },
};

