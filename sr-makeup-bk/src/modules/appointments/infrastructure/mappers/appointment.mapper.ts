import { Appointment as PrismaAppointment } from '@prisma/client';
import {
  AppointmentEntity,
  AppointmentStatus,
} from '../../domain/entities/appointment.entity';

export class AppointmentMapper {
  static toDomain(raw: PrismaAppointment): AppointmentEntity {
    return new AppointmentEntity({
      id: raw.id,
      clientName: raw.clientName,
      clientEmail: raw.clientEmail,
      clientPhone: raw.clientPhone,
      serviceId: raw.serviceId,
      date: raw.date,
      time: raw.time,
      notes: raw.notes,
      status: raw.status as AppointmentStatus,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(entity: AppointmentEntity) {
    return {
      id: entity.id,
      clientName: entity.clientName,
      clientEmail: entity.clientEmail,
      clientPhone: entity.clientPhone,
      serviceId: entity.serviceId,
      date: entity.date,
      time: entity.time,
      notes: entity.notes ?? null,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

