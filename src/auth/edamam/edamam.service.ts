import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import axios from 'axios';
import { Edamam } from '../interfaces/edamam.interface';
import { EdamamEnt } from './entities/edamam.entity';
import { CreateEdamamDto } from './dto/edamam.dto';

// Únicos parámetros que se reenvían a la API de Edamam
const SEARCH_PARAMS = [
  'q',
  'calories',
  'mealType',
  'ingr',
  'cuisineType',
  'diet',
  'health',
];

@Injectable()
export class EdamamService {
  constructor(
    @InjectModel(EdamamEnt.name) private readonly edamamModel: Model<Edamam>,
  ) {}

  async create(userId: string, recipeData: CreateEdamamDto): Promise<Edamam> {
    const createdRecipe = new this.edamamModel({ ...recipeData, userId });
    return createdRecipe.save();
  }

  async findByUser(userId: string): Promise<Edamam[]> {
    return this.edamamModel.find({ userId }).exec();
  }

  async findById(recipeId: string): Promise<Edamam | null> {
    if (!isValidObjectId(recipeId)) return null;
    return this.edamamModel.findById(recipeId).exec();
  }

  async deleteRecipe(recipeId: string): Promise<void> {
    await this.edamamModel.findByIdAndDelete(recipeId).exec();
  }

  /**
   * Busca recetas en Edamam desde el servidor, para que las keys
   * no tengan que estar en la app.
   */
  async searchRecipes(query: Record<string, unknown>) {
    const params: Record<string, string> = {
      type: 'public',
      app_id: process.env.EDAMAM_APP_ID,
      app_key: process.env.EDAMAM_APP_KEY,
    };
    for (const key of SEARCH_PARAMS) {
      const value = query[key];
      if (typeof value === 'string' && value) {
        params[key] = value;
      }
    }

    try {
      // La API v1 (/search) fue dada de baja; v2 responde con el mismo formato (hits[].recipe)
      const { data } = await axios.get(
        'https://api.edamam.com/api/recipes/v2',
        { params },
      );
      // Los "_links" de Edamam incluyen la app_key: no se reenvían a la app
      return {
        from: data.from,
        to: data.to,
        count: data.count,
        hits: (data.hits ?? []).map((hit) => ({ recipe: hit.recipe })),
      };
    } catch {
      throw new BadGatewayException('No se pudieron obtener recetas');
    }
  }
}
