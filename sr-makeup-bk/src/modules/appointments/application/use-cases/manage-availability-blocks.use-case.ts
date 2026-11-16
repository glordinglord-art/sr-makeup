import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { APPOINTMENT_REPOSITORY } from '../../domain/ports/appointment-repository.port';
import type {
  AppointmentRepositoryPort,
  AvailabilityBlockRecord,
} from '../../domain/ports/appointment-repository.port';

export interface ToggleAvailabilityBlockDto {
  date: string;
  time?: string | null;
  reason?: string | null;
}

@Injectable()
export class ManageAvailabilityBlocksUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: AppointmentRepositoryPort,
  ) {}

  async getBlocks(params?: {
    date?: string;
    month?: string;
  }): Promise<AvailabilityBlockRecord[]> {
    return this.appointmentRepository.findBlocks(params);
  }

  async toggleBlock(dto: ToggleAvailabilityBlockDto): Promise<{
    blocked: boolean;
    block: AvailabilityBlockRecord | null;
  }> {
    if (!dto.date || !/^\d{4}-\d{2}-\d{2}$/.test(dto.date)) {
      throw new BadRequestException('Formato de fecha inválido (YYYY-MM-DD)');
    }

    const normalizedTime = dto.time ?? null;
    const existing = await this.appointmentRepository.findBlock(
      dto.date,
      normalizedTime,
    );

    if (existing) {
      await this.appointmentRepository.deleteBlock(existing.id);
      return { blocked: false, block: null };
    }

    const created = await this.appointmentRepository.createBlock(
      dto.date,
      normalizedTime,
      dto.reason,
    );
    return { blocked: true, block: created };
  }

  async deleteBlock(id: string): Promise<{ deleted: boolean }> {
    await this.appointmentRepository.deleteBlock(id);
    return { deleted: true };
  }
}
