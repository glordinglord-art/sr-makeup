import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { APPOINTMENT_REPOSITORY } from '../../domain/ports/appointment-repository.port';
import type { AppointmentRepositoryPort } from '../../domain/ports/appointment-repository.port';
import { AppointmentEntity } from '../../domain/entities/appointment.entity';
import { SlotUnavailableException } from '../../domain/exceptions/slot-unavailable.exception';
import { CreateAppointmentDto } from '../dtos/create-appointment.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: AppointmentRepositoryPort,
  ) {}

  async execute(dto: CreateAppointmentDto): Promise<AppointmentEntity> {
    const existing = await this.appointmentRepository.findByDateAndTime(
      dto.date,
      dto.time,
    );

    if (existing && existing.status !== 'CANCELLED') {
      throw new BadRequestException(
        new SlotUnavailableException(dto.date, dto.time).message,
      );
    }

    const appointment = new AppointmentEntity({
      id: randomUUID(),
      clientName: dto.clientName,
      clientEmail: dto.clientEmail,
      clientPhone: dto.clientPhone,
      serviceId: dto.serviceId,
      date: dto.date,
      time: dto.time,
      notes: dto.notes ?? null,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.appointmentRepository.save(appointment);
  }
}
