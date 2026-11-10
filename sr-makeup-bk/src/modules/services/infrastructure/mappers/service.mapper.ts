import { Service as PrismaServiceType } from '@prisma/client';
import { ServiceEntity } from '../../domain/entities/service.entity';

export class ServiceMapper {
  static toDomain(raw: PrismaServiceType): ServiceEntity {
    return new ServiceEntity({
      id: raw.id,
      title: raw.title,
      slug: raw.slug,
      description: raw.description,
      price: raw.price,
      durationMinutes: raw.durationMinutes,
      category: raw.category,
      imageUrl: raw.imageUrl,
      features: raw.features,
      isActive: raw.isActive,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(entity: ServiceEntity) {
    return {
      id: entity.id,
      title: entity.title,
      slug: entity.slug,
      description: entity.description,
      price: entity.price,
      durationMinutes: entity.durationMinutes,
      category: entity.category,
      imageUrl: entity.imageUrl ?? null,
      features: entity.features,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

