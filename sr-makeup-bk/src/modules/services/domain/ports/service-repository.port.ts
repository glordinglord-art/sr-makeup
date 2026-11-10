import { ServiceEntity } from '../entities/service.entity';

export const SERVICE_REPOSITORY = Symbol('SERVICE_REPOSITORY');

export interface ServiceRepositoryPort {
  save(service: ServiceEntity): Promise<ServiceEntity>;
  findById(id: string): Promise<ServiceEntity | null>;
  findBySlug(slug: string): Promise<ServiceEntity | null>;
  findAll(category?: string): Promise<ServiceEntity[]>;
  update(service: ServiceEntity): Promise<ServiceEntity>;
  delete(id: string): Promise<void>;
}

