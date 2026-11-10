import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { GetPortfolioUseCase } from '../../application/use-cases/get-portfolio.use-case';
import { CreatePortfolioItemUseCase } from '../../application/use-cases/create-portfolio-item.use-case';
import { CreatePortfolioItemDto } from '../../application/dtos/create-portfolio-item.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(
    private readonly getPortfolioUseCase: GetPortfolioUseCase,
    private readonly createPortfolioItemUseCase: CreatePortfolioItemUseCase,
  ) {}

  @Get()
  async getAll(@Query('category') category?: string) {
    const list = await this.getPortfolioUseCase.execute(category);
    return list.map((item) => item.toJSON());
  }

  @Get('featured')
  async getFeatured() {
    const list = await this.getPortfolioUseCase.getFeatured();
    return list.map((item) => item.toJSON());
  }

  @Post()
  async create(@Body() dto: CreatePortfolioItemDto) {
    const item = await this.createPortfolioItemUseCase.execute(dto);
    return item.toJSON();
  }
}

