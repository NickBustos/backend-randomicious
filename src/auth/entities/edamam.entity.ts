import * as mongoose from 'mongoose';

export const EdamamSchema = new mongoose.Schema({
  _id: { type: String, required: false },
  userId: { type: String, required: true },
  ingredientes: [
    {
      type: { ingredients: String, quantity: String, mesure: String },
      required: true,
    },
  ],
  portions: { type: String, required: true },
  time: { type: String, required: true },
  calories: { type: String, required: true },
  instructions: { type: String, required: true },
  image: { type: String, required: true },
  urlReceta: { type: String, required: true },
});

export const EdammaModel = mongoose.model('Edammam', EdamamSchema);
