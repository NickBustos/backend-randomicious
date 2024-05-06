import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Get,
  Param,
  Patch,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { Recipe } from '../interfaces/recipe.interface';
import { RecipesServces } from './recipes.service';
import { UpdateRecipeDto } from './dto/updateRecipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipes: RecipesServces) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createRecipe(
    @Body() body: CreateRecipeDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    image,
  ): Promise<Recipe> {
    return this.recipes.createRecipe(body, image);
  }

  @Get(':userId')
  async findByUserId(@Param('userId') userId: string): Promise<Recipe[]> {
    return this.recipes.getRecipe(userId);
  }

  @Patch(':recipeId')
  @UseInterceptors(FileInterceptor('image'))
  async updateRecipePartially(
    @Param('recipeId') recipeId: string,
    @Body() body: Partial<UpdateRecipeDto>, // El uso de Partial<> es para permitir campos opcionales
    @UploadedFile() image?, // Elimina la configuración de ParseFilePipe aquí
  ): Promise<Recipe> {
    const existingRecipe = await this.recipes.getRecipeById(recipeId);
    if (existingRecipe) {
      if (!image && existingRecipe.image) {
        body.image = existingRecipe.image;
      }
      return this.recipes.updateRecipe(
        recipeId,
        body as UpdateRecipeDto,
        image,
      );
    } else {
      throw new NotFoundException('Recipe not found');
    }
  }

  @Delete('delete/:recipeId')
  async deleteRecipe(@Param('recipeId') recipeId: string): Promise<void> {
    await this.recipes.deleteRecipe(recipeId);
  }
}
