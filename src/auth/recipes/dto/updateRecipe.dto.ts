import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { toStringValue } from './createRecipe.dto';

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  ingredients?: { ingredients: string; quantity: string }[];

  @IsOptional()
  @Transform(toStringValue)
  @IsString()
  portions?: string;

  @IsOptional()
  @Transform(toStringValue)
  @IsString()
  time?: string;

  @IsOptional()
  @IsNumber()
  calories?: number;

  @IsOptional()
  @IsString()
  instructions?: string;
}
