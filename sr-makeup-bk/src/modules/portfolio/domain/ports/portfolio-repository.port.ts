import { PortfolioItemEntity } from '../entities/portfolio-item.entity';

export const PORTFOLIO_REPOSITORY = Symbol('PORTFOLIO_REPOSITORY');

export interface PortfolioRepositoryPort {
  save(item: PortfolioItemEntity): Promise<PortfolioItemEntity>;
  findById(id: string): Promise<PortfolioItemEntity | null>;
  findAll(category?: string): Promise<PortfolioItemEntity[]>;
  findFeatured(): Promise<PortfolioItemEntity[]>;
  delete(id: string): Promise<void>;
}

