export interface Edamam {
    uri: string;
    label: string;
    image: string;
    source: string;
    url: string;
    shareAs: string;
    yield: number;
    dietLabels: string[];
    healthLabels: string[];
    cautions: string[];
    ingredientLines: string[];
    ingredients: {
      text: string;
      quantity: number;
      measure: string;
      food: string;
      weight: number;
      foodCategory: string;
      image: string;
    }[];
    calories: number;
    totalWeight: number;
    totalTime: number;
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
    totalNutrients: any; // Puedes definir un tipo más específico si lo deseas
    totalDaily: any; // Puedes definir un tipo más específico si lo deseas
    digest: any[]; // Puedes definir un tipo más específico si lo deseas
  }