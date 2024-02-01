import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TranslatorServices {
  private readonly deepLApiKey = '6fa82a94-4264-a156-b86e-63014bc0f946:fx';

  async translateText(text: string[], targetLanguage: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://api-free.deepl.com/v2/translate',
        { text: text, target_lang: targetLanguage },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `DeepL-Auth-Key ${this.deepLApiKey}`,
          },
        },
      );

      return response.data.translations[0].text;
    } catch (error) {
      console.error('Error al traducir:', error);
      console.error(text);
      return 'Error al traducir el texto';
    }
  }
}
