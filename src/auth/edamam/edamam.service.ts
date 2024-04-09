import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Edamam } from '../interfaces/edamam.interface';

@Injectable()
export class EdamamService {
  constructor(@InjectModel('Recipe') private readonly recipeModel: Model<Edamam>) {}

  async create(recipeData: Edamam): Promise<Edamam> {
    const createdRecipe = new this.recipeModel(recipeData);
    return createdRecipe.save();
  }

  async findAll(): Promise<Edamam[]> {
    return this.recipeModel.find().exec();
  }

  async findOneById(id: string): Promise<Edamam> {
    return this.recipeModel.findById(id).exec();
  }
}