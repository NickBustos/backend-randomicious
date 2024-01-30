// import { Controller, Post, Body, Get, Param } from '@nestjs/common';
// import { TranslatorService } from './translator.service';

// @Controller('api/translator')
// export class TranslatorController {
//     constructor(private readonly translatorService: TranslatorService) { }

//     @Post('/translate')
//     translateText(@Body() body: { key: string; text: string }) {
//         return this.translatorService.translateText(body.key, body.text);
//     }

//     @Get(':language')
//     getLocalizedData(@Param('language') language: string) {
//         return this.translatorService.getLocalizedData(language);
//     }
// }

// localization.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { LocalizationService } from './translator.service';

@Controller('translate')
export class TranslateController {
    constructor(private readonly localizationService: LocalizationService) { }

    @Post()
    async translate(@Body() body: { text: string[], targetLanguage: string }): Promise<{ translation: string }> {
        const translation = await this.localizationService.translateText(body.text, body.targetLanguage);
        return { translation };
    }
}
