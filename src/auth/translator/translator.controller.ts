import { Controller, Post, Body } from '@nestjs/common';
import { TranslatorServices } from './translator.service';

@Controller('translate')
export class TranslateController {
  constructor(private readonly localizationService: TranslatorServices) {}

  @Post()
  async translate(
    @Body() body: { text: string[]; targetLanguage: string },
  ): Promise<{ translation: string }> {
    const translation = await this.localizationService.translateText(
      body.text,
      body.targetLanguage,
    );
    return { translation };
  }
}
