import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EdamamController } from './edamam.controller';
import { EdamamService } from './edamam.service';
import { EdamamEnt, EdamamSchema } from '../entities/edamam.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: EdamamEnt.name, schema: EdamamSchema }])],
  controllers: [EdamamController],
  providers: [EdamamService],
})
export class EdamamModule {}