export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: "novias" | "social" | "quinceaneras" | "editorial" | "automaquillaje" | "artistico";
  imageUrl?: string;
  features: string[]; // Por ejemplo: ["Pestañas postizas incluidas", "Prueba de maquillaje previa"]
  isActive: boolean;
}

export interface CreateServiceDto {
  title: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: string;
  imageUrl?: string;
  features: string[];
}

