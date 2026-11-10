import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateAppointmentUseCase } from '../../application/use-cases/create-appointment.use-case';
import { GetAvailabilityUseCase } from '../../application/use-cases/get-availability.use-case';
import { GetAppointmentsUseCase } from '../../application/use-cases/get-appointments.use-case';
import { UpdateAppointmentStatusUseCase } from '../../application/use-cases/update-appointment-status.use-case';
import { DeleteAppointmentUseCase } from '../../application/use-cases/delete-appointment.use-case';
import { CreateAppointmentDto } from '../../application/dtos/create-appointment.dto';
import type { AppointmentStatus } from '../../domain/entities/appointment.entity';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly getAvailabilityUseCase: GetAvailabilityUseCase,
    private readonly getAppointmentsUseCase: GetAppointmentsUseCase,
    private readonly updateAppointmentStatusUseCase: UpdateAppointmentStatusUseCase,
    private readonly deleteAppointmentUseCase: DeleteAppointmentUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateAppointmentDto) {
    const appointment = await this.createAppointmentUseCase.execute(dto);
    return appointment.toJSON();
  }

  @Get('availability')
  async getAvailability(@Query('date') date: string) {
    const targetDate = date || new Date().toISOString().split('T')[0];
    return this.getAvailabilityUseCase.execute(targetDate);
  }

  @Get()
  async getAll(@Query('status') status?: AppointmentStatus) {
    const list = await this.getAppointmentsUseCase.execute(status);
    return list.map((a) => a.toJSON());
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: AppointmentStatus,
  ) {
    const updated = await this.updateAppointmentStatusUseCase.execute(id, status);
    return updated.toJSON();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteAppointmentUseCase.execute(id);
  }
}
