import { Module } from '@nestjs/common';
import { SERVICE_REPOSITORY } from './domain/ports/service-repository.port';
import { PrismaServiceRepository } from './infrastructure/adapters/prisma-service.repository';
import { ServicesController } from './infrastructure/controllers/services.controller';
import { GetServicesUseCase } from './application/use-cases/get-services.use-case';
import { CreateServiceUseCase } from './application/use-cases/create-service.use-case';

@Module({
  controllers: [ServicesController],
  providers: [
    {
      provide: SERVICE_REPOSITORY,
      useClass: PrismaServiceRepository,
    },
    GetServicesUseCase,
    CreateServiceUseCase,
  ],
  exports: [GetServicesUseCase],
})
export class ServicesModule {}

