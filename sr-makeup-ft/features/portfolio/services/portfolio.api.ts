import { apiClient } from "@/shared/lib/api-client";
import { PortfolioItem, CreatePortfolioItemDto } from "../types/portfolio.types";

export const portfolioApi = {
  getAll: async (category?: string): Promise<PortfolioItem[]> => {
    const params = category ? `?category=${category}` : "";
    return apiClient<PortfolioItem[]>(`/portfolio${params}`);
  },

  getFeatured: async (): Promise<PortfolioItem[]> => {
    return apiClient<PortfolioItem[]>("/portfolio/featured");
  },

  create: async (dto: CreatePortfolioItemDto): Promise<PortfolioItem> => {
    return apiClient<PortfolioItem>("/portfolio", {
      method: "POST",
      body: JSON.stringify(dto),
    });
  },

  delete: async (id: string): Promise<{ success: boolean }> => {
    return apiClient<{ success: boolean }>(`/portfolio/${id}`, {
      method: "DELETE",
    });
  },
};

