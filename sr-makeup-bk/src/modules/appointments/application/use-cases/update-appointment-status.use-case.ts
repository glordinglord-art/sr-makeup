import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { APPOINTMENT_REPOSITORY } from '../../domain/ports/appointment-repository.port';
import type { AppointmentRepositoryPort } from '../../domain/ports/appointment-repository.port';
import { AppointmentEntity, AppointmentStatus } from '../../domain/entities/appointment.entity';

@Injectable()
export class UpdateAppointmentStatusUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: AppointmentRepositoryPort,
  ) {}

  async execute(id: string, status: AppointmentStatus): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new NotFoundException(`Cita con id ${id} no encontrada.`);
    }

    if (status === 'CONFIRMED') appointment.confirm();
    else if (status === 'CANCELLED') appointment.cancel();
    else if (status === 'COMPLETED') appointment.complete();

    return this.appointmentRepository.update(appointment);
  }
}
