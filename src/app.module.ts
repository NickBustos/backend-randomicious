import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { TranslatorModule } from './auth/translator/translator.module';
import { RecipesModule } from './auth/recipes/recipes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRoot(process.env.MONGO_URI),

    AuthModule,

    TranslatorModule,
    
    RecipesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
