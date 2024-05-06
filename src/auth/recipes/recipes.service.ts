import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from '../interfaces/recipe.interface';
import { Model } from 'mongoose';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { RecipeEnt } from './entities/recipes.entity';
import { UpdateRecipeDto } from './dto/updateRecipe.dto';

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

  async getRecipeById(recipeId: string): Promise<Recipe> {
    return this.recipeModel
      .findById(recipeId)
      .select('userId name ingredients instructions portions time image')
      .exec();
  }

  async updateRecipe(
    recipeId: string,
    updateRecipeDTO: UpdateRecipeDto,
    image?,
  ): Promise<Recipe> {
    const updateFields: any = {
      name: updateRecipeDTO.name,
      ingredients: updateRecipeDTO.ingredients,
      instructions: updateRecipeDTO.instructions,
      portions: updateRecipeDTO.portions,
      time: updateRecipeDTO.time,
      calories: updateRecipeDTO.calories,
    };

    // Si hay una imagen, actualiza los campos de imagen
    if (image) {
      updateFields.image = {
        data: image.buffer,
        contentType: image.mimetype,
      };
    }

    const updatedRecipe = await this.recipeModel.findByIdAndUpdate(
      recipeId,
      updateFields,
      { new: true }, // Esto es para que devuelva el documento actualizado
    );
    return updatedRecipe;
  }

  async deleteRecipe(recipeId: string): Promise<void> {
    await this.recipeModel.findByIdAndDelete(recipeId).exec();
  }
}
