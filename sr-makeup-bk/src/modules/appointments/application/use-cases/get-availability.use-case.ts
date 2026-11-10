import { Inject, Injectable } from '@nestjs/common';
import { APPOINTMENT_REPOSITORY } from '../../domain/ports/appointment-repository.port';
import type { AppointmentRepositoryPort } from '../../domain/ports/appointment-repository.port';

const ALL_SLOTS = [
  '08:00 AM',
  '09:30 AM',
  '11:00 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM',
  '05:30 PM',
];

export interface SlotAvailability {
  time: string;
  available: boolean;
}

@Injectable()
export class GetAvailabilityUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: AppointmentRepositoryPort,
  ) {}

  async execute(date: string): Promise<SlotAvailability[]> {
    const bookedAppointments = await this.appointmentRepository.findByDate(date);
    const bookedTimes = new Set(
      bookedAppointments
        .filter((a) => a.status !== 'CANCELLED')
        .map((a) => a.time),
    );

    return ALL_SLOTS.map((slot) => ({
      time: slot,
      available: !bookedTimes.has(slot),
    }));
  }
}
