import { Component, Input, EventEmitter } from '@angular/core';
import { ButtonConfig } from '../../../core/types/interfaces/shared/ui-elements.interface';

@Component({
  selector: 'ui-button',
  templateUrl: './templates/button.component.html',
  styleUrl: './templates/button.component.scss'
})
export class ButtonComponent {
  @Input() data: ButtonConfig | undefined = undefined;
  @Input() onClick: EventEmitter<any> = new EventEmitter();

  handleClick(): void {
    if (this.onClick instanceof EventEmitter &&
      typeof this.onClick?.emit === 'function') {
      () => { this.onClick.emit() }
    } else {
      console.error('onClick its not a event or function, check what are you sending');
    }
  }
}
