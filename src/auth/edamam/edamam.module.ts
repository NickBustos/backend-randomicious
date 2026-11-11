import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EdamamController, RecipeSearchController } from './edamam.controller';
import { EdamamService } from './edamam.service';
import { EdamamEnt, EdamamSchema } from './entities/edamam.entity';
import { AuthModule } from '../users/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: EdamamEnt.name, schema: EdamamSchema }]),
  ],
  controllers: [EdamamController, RecipeSearchController],
  providers: [EdamamService],
})
export class EdamamModule {}
