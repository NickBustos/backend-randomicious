import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TranslatorServices {
  async translateText(text: string[], targetLanguage: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://api-free.deepl.com/v2/translate',
        { text: text, target_lang: targetLanguage },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
          },
        },
      );

      return response.data.translations[0].text;
    } catch (error) {
      console.error('Error al traducir:', error.message);
      return 'Error al traducir el texto';
    }
  }
}
