import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { EdamamService } from '../edamam/edamam.service';
import { Edamam } from '../interfaces/edamam.interface';
import { AuthGuard } from '../guards/auth.guards';
import { CurrentUserId } from '../decorators/current-user-id.decorator';
import { CreateEdamamDto } from './dto/edamam.dto';

/** Recetas de Edamam que cada usuario guardó. */
@Controller('Edammam')
@UseGuards(AuthGuard)
export class EdamamController {
  constructor(private readonly edamamService: EdamamService) {}

  @Post()
  async createRecipe(
    @Body() recipeData: CreateEdamamDto,
    @CurrentUserId() userId: string,
  ): Promise<Edamam> {
    return this.edamamService.create(userId, recipeData);
  }

  @Get(':userId')
  async findByUserId(
    @Param('userId') userId: string,
    @CurrentUserId() currentUserId: string,
  ): Promise<Edamam[]> {
    if (userId !== currentUserId) {
      throw new ForbiddenException();
    }
    return this.edamamService.findByUser(userId);
  }

  @Delete('delete/:recipeId')
  async deleteEdammamRecipe(
    @Param('recipeId') recipeId: string,
    @CurrentUserId() userId: string,
  ) {
    const recipe = await this.edamamService.findById(recipeId);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    if (recipe.userId !== userId) {
      throw new ForbiddenException();
    }
    return this.edamamService.deleteRecipe(recipeId);
  }
}

/** Búsqueda de recetas en Edamam (las keys quedan en el servidor). */
@Controller('recipe-search')
@UseGuards(AuthGuard)
export class RecipeSearchController {
  constructor(private readonly edamamService: EdamamService) {}

  @Get()
  search(@Query() query: Record<string, unknown>) {
    return this.edamamService.searchRecipes(query);
  }
}
