import { Document } from 'mongoose';
export interface Edamam extends Document {
  _id: string;
  userId: string;
  ingredientes: [{ ingredients: string; quantity: string; mesure: string }];
  portions: string;
  time: string;
  calories?: number;
  instructions: string;
  image: string;
  urlReceta: string;
}
