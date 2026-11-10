import { Inject, Injectable } from '@nestjs/common';
import { PORTFOLIO_REPOSITORY } from '../../domain/ports/portfolio-repository.port';
import type { PortfolioRepositoryPort } from '../../domain/ports/portfolio-repository.port';
import { PortfolioItemEntity } from '../../domain/entities/portfolio-item.entity';

@Injectable()
export class GetPortfolioUseCase {
  constructor(
    @Inject(PORTFOLIO_REPOSITORY)
    private readonly portfolioRepository: PortfolioRepositoryPort,
  ) {}

  async execute(category?: string): Promise<PortfolioItemEntity[]> {
    return this.portfolioRepository.findAll(category);
  }

  async getFeatured(): Promise<PortfolioItemEntity[]> {
    return this.portfolioRepository.findFeatured();
  }
}
