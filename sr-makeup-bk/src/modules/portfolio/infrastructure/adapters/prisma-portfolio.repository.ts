import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import type { PortfolioRepositoryPort } from '../../domain/ports/portfolio-repository.port';
import { PortfolioItemEntity } from '../../domain/entities/portfolio-item.entity';
import { PortfolioMapper } from '../mappers/portfolio.mapper';

@Injectable()
export class PrismaPortfolioRepository implements PortfolioRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(item: PortfolioItemEntity): Promise<PortfolioItemEntity> {
    const data = PortfolioMapper.toPersistence(item);
    const created = await this.prisma.portfolioItem.create({ data });
    return PortfolioMapper.toDomain(created);
  }

  async findById(id: string): Promise<PortfolioItemEntity | null> {
    const found = await this.prisma.portfolioItem.findUnique({ where: { id } });
    return found ? PortfolioMapper.toDomain(found) : null;
  }

  async findAll(category?: string): Promise<PortfolioItemEntity[]> {
    const list = await this.prisma.portfolioItem.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return list.map(PortfolioMapper.toDomain);
  }

  async findFeatured(): Promise<PortfolioItemEntity[]> {
    const list = await this.prisma.portfolioItem.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
    });
    return list.map(PortfolioMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.portfolioItem.delete({ where: { id } });
  }
}
