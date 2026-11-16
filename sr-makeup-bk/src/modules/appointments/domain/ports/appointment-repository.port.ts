import { AppointmentEntity, AppointmentStatus } from '../entities/appointment.entity';

export const APPOINTMENT_REPOSITORY = Symbol('APPOINTMENT_REPOSITORY');

export interface AvailabilityBlockRecord {
  id: string;
  date: string;
  time: string | null;
  reason: string | null;
  createdAt: Date;
}

export interface AppointmentRepositoryPort {
  save(appointment: AppointmentEntity): Promise<AppointmentEntity>;
  findById(id: string): Promise<AppointmentEntity | null>;
  findByDate(date: string): Promise<AppointmentEntity[]>;
  findByDateAndTime(date: string, time: string): Promise<AppointmentEntity | null>;
  findAll(status?: AppointmentStatus): Promise<AppointmentEntity[]>;
  update(appointment: AppointmentEntity): Promise<AppointmentEntity>;
  delete(id: string): Promise<boolean>;
  findBlocks(params?: { date?: string; month?: string }): Promise<AvailabilityBlockRecord[]>;
  findBlock(date: string, time: string | null): Promise<AvailabilityBlockRecord | null>;
  createBlock(date: string, time: string | null, reason?: string | null): Promise<AvailabilityBlockRecord>;
  deleteBlock(id: string): Promise<boolean>;
}

