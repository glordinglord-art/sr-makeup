import { Inject, Injectable } from '@nestjs/common';
import { APPOINTMENT_REPOSITORY } from '../../domain/ports/appointment-repository.port';
import type { AppointmentRepositoryPort } from '../../domain/ports/appointment-repository.port';
import { AppointmentEntity, AppointmentStatus } from '../../domain/entities/appointment.entity';

@Injectable()
export class GetAppointmentsUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: AppointmentRepositoryPort,
  ) {}

  async execute(status?: AppointmentStatus): Promise<AppointmentEntity[]> {
    return this.appointmentRepository.findAll(status);
  }
}
