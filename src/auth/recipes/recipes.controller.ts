import { Controller, Post, Body } from '@nestjs/common';

@Controller('translate')
export class RecipesController {
  constructor() {}

  @Post()
  async translate(@Body() body: { text: string[]; targetLanguage: string }) {
    return {};
  }
}
