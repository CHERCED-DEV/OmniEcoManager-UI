import { Component, Input } from '@angular/core';
import { DataPickerConfig } from '../../../main/core/types/interfaces/ui-elements.interface';

@Component({
  selector: 'app-datapicker',
  templateUrl: './templates/datepicker.component.html',
  styleUrl: './templates/datepicker.component.scss'
})
export class DatepickerComponent {
  @Input() data: DataPickerConfig | undefined = undefined;
}
