import { Inject, Injectable } from '@nestjs/common';
import { SERVICE_REPOSITORY } from '../../domain/ports/service-repository.port';
import type { ServiceRepositoryPort } from '../../domain/ports/service-repository.port';
import { ServiceEntity } from '../../domain/entities/service.entity';

@Injectable()
export class GetServicesUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private readonly serviceRepository: ServiceRepositoryPort,
  ) {}

  async execute(category?: string): Promise<ServiceEntity[]> {
    return this.serviceRepository.findAll(category);
  }
}
