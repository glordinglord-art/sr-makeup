import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import type { ServiceRepositoryPort } from '../../domain/ports/service-repository.port';
import { ServiceEntity } from '../../domain/entities/service.entity';
import { ServiceMapper } from '../mappers/service.mapper';

@Injectable()
export class PrismaServiceRepository implements ServiceRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(service: ServiceEntity): Promise<ServiceEntity> {
    const data = ServiceMapper.toPersistence(service);
    const created = await this.prisma.service.create({ data });
    return ServiceMapper.toDomain(created);
  }

  async findById(id: string): Promise<ServiceEntity | null> {
    const found = await this.prisma.service.findUnique({ where: { id } });
    return found ? ServiceMapper.toDomain(found) : null;
  }

  async findBySlug(slug: string): Promise<ServiceEntity | null> {
    const found = await this.prisma.service.findUnique({ where: { slug } });
    return found ? ServiceMapper.toDomain(found) : null;
  }

  async findAll(category?: string): Promise<ServiceEntity[]> {
    const list = await this.prisma.service.findMany({
      where: category ? { category } : undefined,
      orderBy: { price: 'asc' },
    });
    return list.map(ServiceMapper.toDomain);
  }

  async update(service: ServiceEntity): Promise<ServiceEntity> {
    const data = ServiceMapper.toPersistence(service);
    const updated = await this.prisma.service.update({
      where: { id: service.id },
      data,
    });
    return ServiceMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.service.delete({ where: { id } });
  }
}
