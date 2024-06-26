import { Document } from 'mongoose';

export interface Recipe extends Document {
  _id: string;
  userId: string;
  name: string;
  ingredients: [{ ingredients: string; quantity: string }];
  instructions: string;
  portions: string;
  time: string;
  image: {
    data: Buffer;
    contentType: string;
  };
}
