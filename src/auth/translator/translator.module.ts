// import { TranslatorService } from './translator.service';
// import { TranslatorController } from './translator.controller';
// import { Module } from '@nestjs/common';

// @Module({
//     controllers: [TranslatorController],
//     providers: [TranslatorService],
// })
// export class AppModule { }

// app.module.ts

import { Module } from '@nestjs/common';
import { TranslateController } from './translator.controller';
import { LocalizationService } from './translator.service'

@Module({
  controllers: [TranslateController],
  providers: [LocalizationService],
})
export class TranslatorModule {}
