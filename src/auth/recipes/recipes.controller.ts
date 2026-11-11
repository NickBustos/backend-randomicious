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
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { Recipe } from '../interfaces/recipe.interface';
import { RecipesServces } from './recipes.service';
import { UpdateRecipeDto } from './dto/updateRecipe.dto';
import { AuthGuard } from '../guards/auth.guards';
import { CurrentUserId } from '../decorators/current-user-id.decorator';

@Controller('recipes')
@UseGuards(AuthGuard)
export class RecipesController {
  constructor(private readonly recipes: RecipesServces) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createRecipe(
    @Body() body: CreateRecipeDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(png|jpeg|jpg)$/ }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    image: Express.Multer.File,
    @CurrentUserId() userId: string,
  ): Promise<Recipe> {
    return this.recipes.createRecipe(userId, body, image);
  }

  @Get(':userId')
  async findByUserId(
    @Param('userId') userId: string,
    @CurrentUserId() currentUserId: string,
  ): Promise<Recipe[]> {
    if (userId !== currentUserId) {
      throw new ForbiddenException();
    }
    return this.recipes.getRecipe(userId);
  }

  @Patch(':recipeId')
  @UseInterceptors(FileInterceptor('image'))
  async updateRecipePartially(
    @Param('recipeId') recipeId: string,
    @Body() body: UpdateRecipeDto,
    @CurrentUserId() userId: string,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<Recipe> {
    await this.findOwnRecipe(recipeId, userId);
    return this.recipes.updateRecipe(recipeId, body, image);
  }

  @Delete('delete/:recipeId')
  async deleteRecipe(
    @Param('recipeId') recipeId: string,
    @CurrentUserId() userId: string,
  ): Promise<void> {
    await this.findOwnRecipe(recipeId, userId);
    await this.recipes.deleteRecipe(recipeId);
  }

  /** Busca la receta y verifica que sea del usuario que hace el pedido. */
  private async findOwnRecipe(recipeId: string, userId: string) {
    const recipe = await this.recipes.getRecipeById(recipeId);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    if (recipe.userId !== userId) {
      throw new ForbiddenException();
    }
    return recipe;
  }
}
