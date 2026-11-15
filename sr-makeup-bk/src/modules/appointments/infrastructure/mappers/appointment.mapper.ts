import { Appointment as PrismaAppointment, Service as PrismaService } from '@prisma/client';
import {
  AppointmentEntity,
  AppointmentStatus,
} from '../../domain/entities/appointment.entity';

type PrismaAppointmentWithService = PrismaAppointment & {
  service?: PrismaService | null;
};

export class AppointmentMapper {
  static toDomain(raw: PrismaAppointmentWithService): AppointmentEntity {
    return new AppointmentEntity({
      id: raw.id,
      clientName: raw.clientName,
      clientEmail: raw.clientEmail,
      clientPhone: raw.clientPhone,
      serviceId: raw.serviceId,
      service: raw.service
        ? {
            title: raw.service.title,
            price: raw.service.price,
            durationMinutes: raw.service.durationMinutes,
            category: raw.service.category,
          }
        : null,
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

