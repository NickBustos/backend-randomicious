import { Document } from 'mongoose';

export interface Recipe extends Document {
  userId: string;
  ingredients: string[];
  instructions: string;
  image?: {
    data: Buffer;
    contentType: string;
  };
}
