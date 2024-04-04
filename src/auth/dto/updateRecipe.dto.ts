import {
  IsArray,
  IsMimeType,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  ingredients?: { ingredients: string; quantity: string }[];

  @IsOptional()
  @IsString()
  portions?: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsNumber()
  calories?: number;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsMimeType()
  image?: {
    data: Buffer;
    contentType: string;
  };;
}
