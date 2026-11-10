import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import type { AppointmentRepositoryPort } from '../../domain/ports/appointment-repository.port';
import {
  AppointmentEntity,
  AppointmentStatus,
} from '../../domain/entities/appointment.entity';
import { AppointmentMapper } from '../mappers/appointment.mapper';

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(appointment: AppointmentEntity): Promise<AppointmentEntity> {
    const data = AppointmentMapper.toPersistence(appointment);
    const created = await this.prisma.appointment.create({
      data,
    });
    return AppointmentMapper.toDomain(created);
  }

  async findById(id: string): Promise<AppointmentEntity | null> {
    const found = await this.prisma.appointment.findUnique({
      where: { id },
    });
    return found ? AppointmentMapper.toDomain(found) : null;
  }

  async findByDate(date: string): Promise<AppointmentEntity[]> {
    const list = await this.prisma.appointment.findMany({
      where: { date },
      orderBy: { time: 'asc' },
    });
    return list.map(AppointmentMapper.toDomain);
  }

  async findByDateAndTime(
    date: string,
    time: string,
  ): Promise<AppointmentEntity | null> {
    const found = await this.prisma.appointment.findFirst({
      where: { date, time, status: { not: 'CANCELLED' } },
    });
    return found ? AppointmentMapper.toDomain(found) : null;
  }

  async findAll(status?: AppointmentStatus): Promise<AppointmentEntity[]> {
    const list = await this.prisma.appointment.findMany({
      where: status ? { status } : undefined,
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
    });
    return list.map(AppointmentMapper.toDomain);
  }

  async update(appointment: AppointmentEntity): Promise<AppointmentEntity> {
    const data = AppointmentMapper.toPersistence(appointment);
    const updated = await this.prisma.appointment.update({
      where: { id: appointment.id },
      data,
    });
    return AppointmentMapper.toDomain(updated);
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.appointment.delete({
      where: { id },
    });
    return true;
  }
}
