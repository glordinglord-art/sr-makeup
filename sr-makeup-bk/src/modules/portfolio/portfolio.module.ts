import { Module } from '@nestjs/common';
import { PORTFOLIO_REPOSITORY } from './domain/ports/portfolio-repository.port';
import { PrismaPortfolioRepository } from './infrastructure/adapters/prisma-portfolio.repository';
import { PortfolioController } from './infrastructure/controllers/portfolio.controller';
import { GetPortfolioUseCase } from './application/use-cases/get-portfolio.use-case';
import { CreatePortfolioItemUseCase } from './application/use-cases/create-portfolio-item.use-case';

@Module({
  controllers: [PortfolioController],
  providers: [
    {
      provide: PORTFOLIO_REPOSITORY,
      useClass: PrismaPortfolioRepository,
    },
    GetPortfolioUseCase,
    CreatePortfolioItemUseCase,
  ],
  exports: [GetPortfolioUseCase],
})
export class PortfolioModule {}

