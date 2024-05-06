// src/auth/recipes/entities/recipe.entity.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RecipeEnt extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ingredients: [{ ingredients: string; quantity: string }];

  @Prop({ required: true })
  instructions: string;

  @Prop({ required: true })
  portions: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: false })
  calories: number;

  @Prop({ type: { data: Buffer, contentType: String } }) image: {
    data: Buffer;
    contentType: string;
  };
}

export const RecipeSchema = SchemaFactory.createForClass(RecipeEnt);
