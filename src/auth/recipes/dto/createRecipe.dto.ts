import { Transform } from 'class-transformer';
import {
  IsArray,
  IsMimeType,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export const toStringValue = ({ value }) =>
  value === undefined || value === null ? value : String(value);

export class CreateRecipeDto {
  // Se ignora: el dueño de la receta sale del token.
  // Se acepta solo para no romper versiones viejas de la app.
  @IsOptional()
  @IsString()
  userId?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  ingredients: [{ ingredients: string; quantity: string }];

  @IsNotEmpty()
  @Transform(toStringValue)
  @IsString()
  portions: string;

  @IsNotEmpty()
  @Transform(toStringValue)
  @IsString()
  time: string;

  @IsOptional()
  @IsNumber()
  calories?: number;

  @IsOptional()
  @IsString()
  instructions: string;

  @IsOptional()
  @IsMimeType()
  image?: Buffer;
}
