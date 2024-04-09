import * as mongoose from 'mongoose';

export const EdamamSchema = new mongoose.Schema({
  text: { type: String, required: true },
  quantity: { type: Number, required: true },
  measure: { type: String, required: true },
  food: { type: String, required: true },
  weight: { type: Number, required: true },
  foodCategory: { type: String, required: true },
  image: { type: String, required: true },
});

const TotalNutrientSchema = new mongoose.Schema({
  ENERC_KCAL: { type: { label: String, quantity: Number, unit: String }, required: true },
});

export const RecipeSchema = new mongoose.Schema({
  uri: { type: String, required: true },
  label: { type: String, required: true },
  image: { type: String, required: true },
  source: { type: String, required: true },
  url: { type: String, required: true },
  shareAs: { type: String, required: true },
  yield: { type: Number, required: true },
  dietLabels: { type: [String], required: true },
  healthLabels: { type: [String], required: true },
  cautions: { type: [String], required: true },
  ingredientLines: { type: [String], required: true },
  ingredients: { type: [EdamamSchema], required: true },
  calories: { type: Number, required: true },
  totalWeight: { type: Number, required: true },
  totalTime: { type: Number, required: true },
  cuisineType: { type: [String], required: true },
  mealType: { type: [String], required: true },
  dishType: { type: [String], required: true },
  totalNutrients: { type: TotalNutrientSchema, required: true },
});

export const RecipeModel = mongoose.model('Recipe', RecipeSchema);
