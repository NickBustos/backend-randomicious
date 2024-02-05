import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateRecipeDto } from '../dto/createRecipe.dto';
import { Recipe } from '../interfaces/recipe.interface';
import { RecipesServces } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipes: RecipesServces) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createRecipe(
    @Body() body: CreateRecipeDto,
    @UploadedFile() image,
  ): Promise<Recipe> {
    return this.recipes.createRecipe(body, image);
  }
}
