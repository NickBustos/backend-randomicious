// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class TranslatorService {
//   private localizationData: { [key: string]: string } = {};

//   translateText(key: string, text: string): { message: string } {
//     this.localizationData[key] = text;
//     return { message: 'Datos de localización guardados exitosamente.' };
//   }

//   getLocalizedData(language: string): { [key: string]: string } {
//     const localizedData: { [key: string]: string } = {};

//     // Suponiendo que tienes una función de servicio de traducción
//     // Implementa esta función o utiliza una biblioteca de traducción
//     function traducirTexto(texto: string, idiomaDestino: string): string {
//       // Implementa los detalles de la traducción con la API de DeepL
//       // Para simplicidad, asumiremos que la traducción es sincrónica
//       return texto + ' [traducido a ' + idiomaDestino + ']';
//     }

//     for (const key in this.localizationData) {
//       const textoOriginal = this.localizationData[key];
//       const textoTraducido = traducirTexto(textoOriginal, language);
//       localizedData[key] = textoTraducido;
//     }

//     return localizedData;
//   }
// }

// localization.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LocalizationService {
    //private readonly localizationData: { [key: string]: string } = {};
    private readonly deepLApiKey = '6fa82a94-4264-a156-b86e-63014bc0f946:fx';

    //   async saveLocalizationData(key: string, text: string): Promise<{ message: string }> {
    //     this.localizationData[key] = text;
    //     return { message: 'Datos de localización guardados exitosamente.' };
    //   }

    //   async getLocalizedData(language: string): Promise<{ [key: string]: string }> {
    //     const localizedData: { [key: string]: string } = {};

    //     for (const key in this.localizationData) {
    //       const originalText = this.localizationData[key];
    //       const translatedText = await this.translateText(originalText, language);
    //       localizedData[key] = translatedText;
    //     }

    //     return localizedData;
    //   }

    async translateText(text: string[], targetLanguage: string): Promise<string> {
        try {
            const response = await axios.post(
                'https://api-free.deepl.com/v2/translate',
                { text: text, target_lang: targetLanguage },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `DeepL-Auth-Key ${this.deepLApiKey}`,
                    },
                },
            );

            return response.data.translations[0].text;
        } catch (error) {
            console.error('Error al traducir:', error);
            console.error(text)
            return 'Error al traducir el texto';
        }
    }
}
