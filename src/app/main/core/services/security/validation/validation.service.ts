import { Injectable } from '@angular/core';
import { InputRegexType } from '../../../types/enums/validationTypes.enum';
import { ApiHelperService } from '../../helpers/api-helper/api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public translations: string;

  constructor(private apiHelper: ApiHelperService) {

  }
  private regexPatterns: { [key in InputRegexType]: RegExp } = {
    [InputRegexType.EMAIL]: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    [InputRegexType.PASSWORD]: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    [InputRegexType.PHONE]: /^(\+\d{1,2}\s?)?(\d{3}[-.\s]?){2}\d{4}$/,
    [InputRegexType.FULLNAME]: /^[a-zA-Z\s]+ [a-zA-Z\s]+$/,
    [InputRegexType.POSTCODE]: /^[a-zA-Z0-9\s-]+$/,
    [InputRegexType.URL]: /^(http|https):\/\/[^ "]+$/
  };

  private errorMessages: { [key in InputRegexType]: string } = {
    [InputRegexType.EMAIL]: 'Formato de correo electrónico inválido',
    [InputRegexType.PASSWORD]: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número',
    [InputRegexType.PHONE]: 'Formato de número de teléfono inválido',
    [InputRegexType.FULLNAME]: 'Formato de nombre completo inválido',
    [InputRegexType.POSTCODE]: 'Formato de código postal inválido',
    [InputRegexType.URL]: "Formato de URL(HTTP/HTTPS) inválido"
  };

  private lengthLimits: { [key in InputRegexType]: { min: number; max: number } } = {
    [InputRegexType.EMAIL]: { min: 5, max: 50 },
    [InputRegexType.PASSWORD]: { min: 5, max: 50 },
    [InputRegexType.PHONE]: { min: 5, max: 50 },
    [InputRegexType.FULLNAME]: { min: 5, max: 50 },
    [InputRegexType.POSTCODE]: { min: 5, max: 50 },
    [InputRegexType.URL]: { min: 5, max: 50 },
  };

  constructor() { }

  getRegex(type: InputRegexType): RegExp | undefined {
    return this.regexPatterns[type];
  }

  validate(type: InputRegexType, value: string): { isValid: boolean; errorMessage?: string } {
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
  }
}
