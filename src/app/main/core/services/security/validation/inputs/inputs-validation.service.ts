import { Injectable } from '@angular/core';
import { CommonApiConfig, ErrorMessagesInputConfig, RegexInputConfigs } from '../../../../types/interfaces/common.interface';
import { StorageHelperService } from '../../../helpers/storage-helper/storage-helper.service';
import { StorageApiKeys } from '../../../../types/enums/storage.keys';
import { CommonInputType, KeyInputConfig } from '../../../../types/enums/validation_types.enum';

@Injectable({
  providedIn: 'root'
})
export class InputsValidationService {
  private error_messages!: ErrorMessagesInputConfig;
  private regex!: RegexInputConfigs;
  private lengthLimits: { [key in CommonInputType]: { min: number; max: number } } = {
    [CommonInputType.EMAIL]: { min: 5, max: 50 },
    [CommonInputType.PASSWORD]: { min: 5, max: 50 },
    [CommonInputType.PHONE]: { min: 5, max: 50 },
    [CommonInputType.FULLNAME]: { min: 5, max: 50 },
    [CommonInputType.POSTCODE]: { min: 5, max: 50 },
    [CommonInputType.URL]: { min: 5, max: 50 },
  };

  constructor(private storageHelperService: StorageHelperService) {
    this.onInitilization()
  }

  private onInitilization() {
    const commonData = this.storageHelperService.getSessionStorage(StorageApiKeys.COMMON)
    if (commonData) {
      const { error_messages, regex }: CommonApiConfig = commonData;
      this.error_messages = error_messages;
      //this.regex = this.convertStringRegexToObject(regex);
    }
  }

  /* private convertStringRegexToObject(regexConfig: RegexInputConfigs): RegexInputConfigs {
    const convertedRegex: RegexInputConfigs = {} as RegexInputConfigs;
    Object.keys(regexConfig).forEach((key: any) => {
      if (KeyInputConfig[key as keyof typeof KeyInputConfig]) {
        const keyMatched: KeyInputConfig = key
        const regexString: string = regexConfig[keyMatched];
        try {
          const regexObject: RegExp = new RegExp(regexString);
          convertedRegex[key] = regexObject;
        } catch (error) {
          console.error(`Error al convertir la expresión regular para ${key}: ${error.message}`);
        }
      }
    })
    return convertedRegex;
  } */

  getRegex(): RegexInputConfigs {
    return this.regex;
  }
  getInputHelperTexts(): ErrorMessagesInputConfig {
    return this.error_messages;
  }

  /* validate(type: CommonInputType, value: string): { isValid: boolean; errorMessage?: string } {
    const regex = this.getRegex(type);
    const minLength = this.lengthLimits[type]?.min || 0;
    const maxLength = this.lengthLimits[type]?.max || Infinity;

    if (value.length < minLength || value.length > maxLength) {
      return { isValid: false, errorMessage: `La longitud debe estar entre ${minLength} y ${maxLength} caracteres` };
    }

    if (regex && !regex.test(value)) {
      return { isValid: false, errorMessage: this.errorMessages[type] || 'Formato inválido' };
    }

    return { isValid: true };
  } */
}
