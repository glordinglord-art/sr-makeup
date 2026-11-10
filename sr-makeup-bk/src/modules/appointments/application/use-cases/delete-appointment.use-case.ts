import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { APPOINTMENT_REPOSITORY } from '../../domain/ports/appointment-repository.port';
import type { AppointmentRepositoryPort } from '../../domain/ports/appointment-repository.port';

@Injectable()
export class DeleteAppointmentUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: AppointmentRepositoryPort,
  ) {}

  async execute(id: string): Promise<{ success: boolean }> {
    const existing = await this.appointmentRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }
    await this.appointmentRepository.delete(id);
    return { success: true };
  }
}
