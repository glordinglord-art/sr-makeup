export interface ServiceProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: string;
  imageUrl?: string | null;
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ServiceEntity {
  constructor(private readonly props: ServiceProps) {}

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get slug(): string {
    return this.props.slug;
  }

  get description(): string {
    return this.props.description;
  }

  get price(): number {
    return this.props.price;
  }

  get durationMinutes(): number {
    return this.props.durationMinutes;
  }

  get category(): string {
    return this.props.category;
  }

  get imageUrl(): string | null | undefined {
    return this.props.imageUrl;
  }

  get features(): string[] {
    return this.props.features;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updatePrice(newPrice: number): void {
    if (newPrice < 0) {
      throw new Error('El precio no puede ser negativo.');
    }
    this.props.price = newPrice;
    this.props.updatedAt = new Date();
  }

  toggleActive(): void {
    this.props.isActive = !this.props.isActive;
    this.props.updatedAt = new Date();
  }

  toJSON(): ServiceProps {
    return { ...this.props };
  }
}

