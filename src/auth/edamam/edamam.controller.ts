import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EdamamService } from '../edamam/edamam.service';
import { Edamam } from '../interfaces/edamam.interface';

@Controller('Edammam')
export class EdamamController {
    constructor(private readonly edamamService: EdamamService) { }

    @Post()
    async createRecipe(@Body() recipeData: Edamam): Promise<Edamam> {
        return this.edamamService.create(recipeData);
    }
    @Get()
    async getAllRecipes(): Promise<Edamam[]> {
        return this.edamamService.findAll();
    }

    @Get(':userId')
    async findByUserId(@Param('userId') userId: string): Promise<Edamam[]> {
        return this.edamamService.findByUser(userId);
    }
}