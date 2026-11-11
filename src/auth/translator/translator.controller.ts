import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import {
  ArrayMaxSize,
  IsArray,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { TranslatorServices } from './translator.service';
import { AuthGuard } from '../guards/auth.guards';

class TranslateDto {
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(1000, { each: true })
  text: string[];

  @IsString()
  @Length(2, 5)
  targetLanguage: string;
}

@Controller('translate')
@UseGuards(AuthGuard)
export class TranslateController {
  constructor(private readonly localizationService: TranslatorServices) {}

  @Post()
  async translate(
    @Body() body: TranslateDto,
  ): Promise<{ translation: string }> {
    const translation = await this.localizationService.translateText(
      body.text,
      body.targetLanguage,
    );
    return { translation };
  }
}
