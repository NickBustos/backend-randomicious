import { Module } from '@nestjs/common';
import { TranslateController } from './translator.controller';
import { TranslatorServices } from './translator.service'

@Module({
  controllers: [TranslateController],
  providers: [TranslatorServices],
})
export class TranslatorModule {}
