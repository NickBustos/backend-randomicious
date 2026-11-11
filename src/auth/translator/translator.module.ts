import { Module } from '@nestjs/common';
import { TranslateController } from './translator.controller';
import { TranslatorServices } from './translator.service';
import { AuthModule } from '../users/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TranslateController],
  providers: [TranslatorServices],
})
export class TranslatorModule {}
