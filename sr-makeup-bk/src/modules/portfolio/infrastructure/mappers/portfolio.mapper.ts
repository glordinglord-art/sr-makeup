import { PortfolioItem as PrismaPortfolioType } from '@prisma/client';
import { PortfolioItemEntity } from '../../domain/entities/portfolio-item.entity';

export class PortfolioMapper {
  static toDomain(raw: PrismaPortfolioType): PortfolioItemEntity {
    return new PortfolioItemEntity({
      id: raw.id,
      title: raw.title,
      category: raw.category,
      imageUrl: raw.imageUrl,
      beforeImageUrl: raw.beforeImageUrl,
      description: raw.description,
      productsUsed: raw.productsUsed,
      isFeatured: raw.isFeatured,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(entity: PortfolioItemEntity) {
    return {
      id: entity.id,
      title: entity.title,
      category: entity.category,
      imageUrl: entity.imageUrl,
      beforeImageUrl: entity.beforeImageUrl ?? null,
      description: entity.description ?? null,
      productsUsed: entity.productsUsed,
      isFeatured: entity.isFeatured,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

