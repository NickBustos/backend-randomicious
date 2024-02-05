import {
  IsArray,
  IsMimeType,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  ingredients: [{ ingredients: string; quantity: string }];

  @IsNotEmpty()
  @IsNumber()
  portions: number;

  @IsNotEmpty()
  @IsNumber()
  time: number;

  @IsOptional()
  @IsNumber()
  calories: number;

  @IsOptional()
  @IsString()
  instructions: string;

  @IsOptional()
  @IsMimeType()
  image?: Buffer; // La imagen será manejada como un buffer
}
