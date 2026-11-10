export interface PortfolioItemProps {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  beforeImageUrl?: string | null;
  description?: string | null;
  productsUsed: string[];
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class PortfolioItemEntity {
  constructor(private readonly props: PortfolioItemProps) {}

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get category(): string {
    return this.props.category;
  }

  get imageUrl(): string {
    return this.props.imageUrl;
  }

  get beforeImageUrl(): string | null | undefined {
    return this.props.beforeImageUrl;
  }

  get description(): string | null | undefined {
    return this.props.description;
  }

  get productsUsed(): string[] {
    return this.props.productsUsed;
  }

  get isFeatured(): boolean {
    return this.props.isFeatured;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  toggleFeatured(): void {
    this.props.isFeatured = !this.props.isFeatured;
    this.props.updatedAt = new Date();
  }

  toJSON(): PortfolioItemProps {
    return { ...this.props };
  }
}

