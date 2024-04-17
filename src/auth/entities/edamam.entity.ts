import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EdamamEnt extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  ingredientes: [{ ingredients: string; quantity: string; mesure: string }];

  @Prop({ required: true })
  portions: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: false })
  calories?: number;

  @Prop({ required: true })
  instructions: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  urlReceta: string;
}

export const EdamamSchema = SchemaFactory.createForClass(EdamamEnt);