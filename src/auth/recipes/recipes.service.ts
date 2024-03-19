import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from '../interfaces/recipe.interface';
import { Model } from 'mongoose';
import { CreateRecipeDto } from '../dto/createRecipe.dto';
import { RecipeEnt } from '../entities/recipes.entity';

Injectable();

export class RecipesServces {
  constructor(
    @InjectModel(RecipeEnt.name) private recipeModel: Model<Recipe>,
  ) {}

  async createRecipe(createRecipeDTO: CreateRecipeDto, image): Promise<Recipe> {
    const newRecipe = new this.recipeModel({
      userId: createRecipeDTO.userId,
      name: createRecipeDTO.name,
      ingredients: createRecipeDTO.ingredients,
      instructions: createRecipeDTO.instructions,
      portions: createRecipeDTO.portions,
      time: createRecipeDTO.time,
      calories: createRecipeDTO.calories,
      image: {
        data: image ? image.buffer : undefined,
        contentType: image ? image.mimetype : undefined,
      },
    });

    await newRecipe.save();
    return newRecipe;
  }

  async getRecipe(userId: string): Promise<Recipe[]> {
    return this.recipeModel.find({ userId }).exec();
  }
}
