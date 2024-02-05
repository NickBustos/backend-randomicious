import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesServces } from './recipes.service';
import { RecipeEnt, RecipeSchema } from '../entities/recipes.entity';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: RecipeEnt.name, schema: RecipeSchema }]),
  ],
  controllers: [RecipesController],
  providers: [RecipesServces],
})
export class RecipesModule {}
