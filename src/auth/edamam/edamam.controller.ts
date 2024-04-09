import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Edamam } from '../interfaces/edamam.interface';
import { EdamamService } from './edamam.service';

@Controller('edamam')
export class EdamamController {
  constructor(private readonly recipeService: EdamamService) {}

  @Post()
  async create(@Body() recipeData: Edamam): Promise<Edamam> {
    return this.recipeService.create(recipeData);
  }

  @Get()
  async findAll(): Promise<Edamam[]> {
    return this.recipeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Edamam> {
    return this.recipeService.findOneById(id);
  }
}
