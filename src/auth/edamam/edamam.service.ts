import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Edamam } from '../interfaces/edamam.interface';
import { EdammaModel } from '../entities/edamam.entity';

@Injectable()
export class EdamamService {
  constructor(@InjectModel(EdammaModel.name) private readonly edammaModel: Model<Edamam>) {}

  // async create(recipeData: Edamam): Promise<Edamam> {
  //   const createdRecipe = new this.recipeModel(recipeData);
  //   return createdRecipe.save();
  // }
  async create(edamamData: Edamam): Promise<Edamam> {
    const createdEdamam = new this.edammaModel(edamamData);
    return createdEdamam.save();
  }

  async findAll(): Promise<Edamam[]> {
    return this.edammaModel.find().exec();
  }

  async findOneById(id: string): Promise<Edamam> {
    return this.edammaModel.findById(id).exec();
  }
}