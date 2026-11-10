export interface PortfolioItem {
  id: string;
  title: string;
  category: "novias" | "social" | "quinceaneras" | "editorial" | "automaquillaje" | "artistico";
  imageUrl: string;
  beforeImageUrl?: string; // Para comparativa Antes y Después
  description?: string;
  productsUsed?: string[];
  isFeatured: boolean;
  createdAt: string;
}

export interface CreatePortfolioItemDto {
  title: string;
  category: string;
  imageUrl: string;
  beforeImageUrl?: string;
  description?: string;
  productsUsed?: string[];
  isFeatured?: boolean;
}

