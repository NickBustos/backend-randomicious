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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateRecipeDto } from '../dto/createRecipe.dto';
import { Recipe } from '../interfaces/recipe.interface';
import { RecipesServces } from './recipes.service';
import { UpdateRecipeDto } from '../dto/updateRecipe.dto';

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
  
    // Verificar si existingRecipe es nulo
    if (existingRecipe) {
      // Si no se proporciona una nueva imagen, mantener la imagen existente
      if (!image && existingRecipe.image) {
        body.image = existingRecipe.image;
      }
  
      // Llamar al servicio para actualizar la receta
      return this.recipes.updateRecipe(recipeId, body as UpdateRecipeDto, image);
    } else {
      // Si no se encontró ninguna receta, lanzar un error o manejar el caso según sea necesario
      // Por ejemplo:
      throw new NotFoundException('Recipe not found');
    }
  }
  
}
