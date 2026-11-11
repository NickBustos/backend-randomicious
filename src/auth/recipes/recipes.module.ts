import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesServces } from './recipes.service';
import { RecipeEnt, RecipeSchema } from './entities/recipes.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../users/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: RecipeEnt.name, schema: RecipeSchema }]),
  ],
  controllers: [RecipesController],
  providers: [RecipesServces],
})
export class RecipesModule {}
