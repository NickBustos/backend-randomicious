import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Edamam } from '../interfaces/edamam.interface';
import { EdamamEnt } from '../entities/edamam.entity';

@Injectable()
export class EdamamService {
    constructor(
        @InjectModel(EdamamEnt.name) private readonly edamamModel: Model<Edamam>,
    ) { }

    async create(recipeData: Edamam): Promise<Edamam> {
        const createdRecipe = new this.edamamModel(recipeData);
        return createdRecipe.save();
    }

    async findAll(): Promise<Edamam[]> {
        return this.edamamModel.find().exec();
    }

    async findByUser(userId: string): Promise<Edamam[]> {
        return this.edamamModel.find({ userId }).exec();
    }

    async deleteRecipe(recipeId: string): Promise<void> {
        console.log(recipeId)
        await this.edamamModel.findByIdAndDelete(recipeId).exec();
      }
}