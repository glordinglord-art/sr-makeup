import { Inject, Injectable } from '@nestjs/common';
import { PORTFOLIO_REPOSITORY } from '../../domain/ports/portfolio-repository.port';
import type { PortfolioRepositoryPort } from '../../domain/ports/portfolio-repository.port';
import { PortfolioItemEntity } from '../../domain/entities/portfolio-item.entity';
import { CreatePortfolioItemDto } from '../dtos/create-portfolio-item.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreatePortfolioItemUseCase {
  constructor(
    @Inject(PORTFOLIO_REPOSITORY)
    private readonly portfolioRepository: PortfolioRepositoryPort,
  ) { }

  async execute(dto: CreatePortfolioItemDto): Promise<PortfolioItemEntity> {
    const item = new PortfolioItemEntity({
      id: randomUUID(),
      title: dto.title,
      category: dto.category,
      imageUrl: dto.imageUrl,
      beforeImageUrl: dto.beforeImageUrl ?? null,
      description: dto.description ?? null,
      productsUsed: dto.productsUsed ?? [],
      isFeatured: dto.isFeatured ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.portfolioRepository.save(item);
  }
}
