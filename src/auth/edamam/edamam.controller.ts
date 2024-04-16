import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Edamam } from '../interfaces/edamam.interface';
import { EdamamService } from './edamam.service';
import { EdamamSchema } from '../entities/edamam.entity';


@Controller('edamam')
export class EdamamController {
  constructor(private readonly edammamService: EdamamService) {}

  @Post()
  async create(@Body() recipeData: Edamam): Promise<Edamam> {
    return this.edammamService.create(EdamamSchema);
  }

  @Get()
  async findAll(): Promise<Edamam[]> {
    return this.edammamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Edamam> {
    return this.edammamService.findOneById(id);
  }
}
