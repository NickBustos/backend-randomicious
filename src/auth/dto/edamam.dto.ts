// import {
//   IsArray,
//   IsMimeType,
//   IsNotEmpty,
//   IsNumber,
//   IsOptional,
//   IsString,
// } from 'class-validator';

// export class CreateRecipeDto {
//   @IsNotEmpty()
//   @IsString()
//   userId: string;

//   @IsNotEmpty()
//   @IsString()
//   name: string;

//   @IsNotEmpty()
//   @IsArray()
//   ingredients: [{ ingredients: string; quantity: string; mesure: string }];

//   @IsNotEmpty()
//   @IsString()
//   portions: number;

//   @IsNotEmpty()
//   @IsString()
//   time: number;

//   @IsOptional()
//   @IsNumber()
//   calories?: number;

//   @IsOptional()
//   @IsString()
//   instructions: string;

//   @IsOptional()
//   @IsMimeType()
//   image?: string;

//   @IsNotEmpty()
//   @IsString()
//   urlReceta: string;
// }
