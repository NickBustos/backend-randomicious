import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class IngredienteDto {
  @IsString()
  ingredients: string;

  @IsString()
  quantity: string;

  @IsOptional()
  @IsString()
  mesure?: string;
}

export class CreateEdamamDto {
  // Se ignora: el dueño sale del token.
  // Se acepta solo para no romper versiones viejas de la app.
  @IsOptional()
  @IsString()
  userId?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredienteDto)
  ingredientes: IngredienteDto[];

  @IsString()
  portions: string;

  @IsString()
  time: string;

  @IsOptional()
  @IsNumber()
  calories?: number;

  @IsString()
  instructions: string;

  @IsString()
  image: string;

  @IsString()
  urlReceta: string;
}
