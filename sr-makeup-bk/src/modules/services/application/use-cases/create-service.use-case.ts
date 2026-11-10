import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { SERVICE_REPOSITORY } from '../../domain/ports/service-repository.port';
import type { ServiceRepositoryPort } from '../../domain/ports/service-repository.port';
import { ServiceEntity } from '../../domain/entities/service.entity';
import { CreateServiceDto } from '../dtos/create-service.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private readonly serviceRepository: ServiceRepositoryPort,
  ) {}

  async execute(dto: CreateServiceDto): Promise<ServiceEntity> {
    const existing = await this.serviceRepository.findBySlug(dto.slug);
    if (existing) {
      throw new ConflictException(`El servicio con slug '${dto.slug}' ya existe.`);
    }

    const service = new ServiceEntity({
      id: randomUUID(),
      title: dto.title,
      slug: dto.slug,
      description: dto.description,
      price: dto.price,
      durationMinutes: dto.durationMinutes ?? 60,
      category: dto.category,
      imageUrl: dto.imageUrl ?? null,
      features: dto.features ?? [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.serviceRepository.save(service);
  }
}
