import { AppointmentEntity, AppointmentStatus } from '../entities/appointment.entity';

export const APPOINTMENT_REPOSITORY = Symbol('APPOINTMENT_REPOSITORY');

export interface AppointmentRepositoryPort {
  save(appointment: AppointmentEntity): Promise<AppointmentEntity>;
  findById(id: string): Promise<AppointmentEntity | null>;
  findByDate(date: string): Promise<AppointmentEntity[]>;
  findByDateAndTime(date: string, time: string): Promise<AppointmentEntity | null>;
  findAll(status?: AppointmentStatus): Promise<AppointmentEntity[]>;
  update(appointment: AppointmentEntity): Promise<AppointmentEntity>;
  delete(id: string): Promise<boolean>;
}

