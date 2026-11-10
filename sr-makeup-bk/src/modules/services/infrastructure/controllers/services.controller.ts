import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { GetServicesUseCase } from '../../application/use-cases/get-services.use-case';
import { CreateServiceUseCase } from '../../application/use-cases/create-service.use-case';
import { CreateServiceDto } from '../../application/dtos/create-service.dto';

@Controller('services')
export class ServicesController {
  constructor(
    private readonly getServicesUseCase: GetServicesUseCase,
    private readonly createServiceUseCase: CreateServiceUseCase,
  ) {}

  @Get()
  async getAll(@Query('category') category?: string) {
    const list = await this.getServicesUseCase.execute(category);
    return list.map((s) => s.toJSON());
  }

  @Post()
  async create(@Body() dto: CreateServiceDto) {
    const service = await this.createServiceUseCase.execute(dto);
    return service.toJSON();
  }
}

