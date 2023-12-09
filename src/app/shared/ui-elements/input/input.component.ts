import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputConfig } from '../../../main/core/types/interfaces/ui-elements.interface';

@Component({
  selector: 'ui-input',
  templateUrl: './templates/input.component.html',
  styleUrl: './templates/input.component.scss'
})
export class InputComponent {
  @Input() data: InputConfig | undefined = undefined;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() pattern: string = '.*';
  @Input() errorMessage: string = 'Formato inválido';
  @Input() value: string = '';
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  hasError: boolean = false;
  hasValue: boolean = false;
  isFocused: boolean = false;
  readOnly: Boolean = false;

  onBlur() {
    this.validateInput();
    this.isFocused = false;
  }

  onFocus() {
    this.isFocused = true;
  }

  validateInput() {
    const regex = new RegExp(this.pattern);
    this.hasError = !regex.test(this.value);
    this.hasValue = !!this.value;
  }
}
