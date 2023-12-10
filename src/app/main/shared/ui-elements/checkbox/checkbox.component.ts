import { Component, Input } from '@angular/core';
import { CheckboxConfig } from '../../../../main/core/types/interfaces/ui-elements.interface';

@Component({
  selector: 'ui-checkbox',
  templateUrl: './templates/checkbox.component.html',
  styleUrl: './templates/checkbox.component.scss'
})
export class CheckboxComponent {
  @Input() data: CheckboxConfig | undefined = undefined;
  
}
