import { Module } from '@nestjs/common';
import { APPOINTMENT_REPOSITORY } from './domain/ports/appointment-repository.port';
import { PrismaAppointmentRepository } from './infrastructure/adapters/prisma-appointment.repository';
import { AppointmentController } from './infrastructure/controllers/appointment.controller';
import { CreateAppointmentUseCase } from './application/use-cases/create-appointment.use-case';
import { GetAvailabilityUseCase } from './application/use-cases/get-availability.use-case';
import { GetAppointmentsUseCase } from './application/use-cases/get-appointments.use-case';
import { UpdateAppointmentStatusUseCase } from './application/use-cases/update-appointment-status.use-case';
import { DeleteAppointmentUseCase } from './application/use-cases/delete-appointment.use-case';

@Module({
  controllers: [AppointmentController],
  providers: [
    // Inyección de Dependencias del Puerto Outbound al Adaptador Concreto
    {
      provide: APPOINTMENT_REPOSITORY,
      useClass: PrismaAppointmentRepository,
    },
    // Casos de Uso (Capa de Aplicación)
    CreateAppointmentUseCase,
    GetAvailabilityUseCase,
    GetAppointmentsUseCase,
    UpdateAppointmentStatusUseCase,
    DeleteAppointmentUseCase,
  ],
  exports: [CreateAppointmentUseCase, GetAppointmentsUseCase],
})
export class AppointmentsModule {}

