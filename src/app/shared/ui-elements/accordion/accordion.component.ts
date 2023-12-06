import { Component, Input } from '@angular/core';
import { AccordionConfig } from '../../../main/core/types/interfaces/ui-elements.interface';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [],
  templateUrl: './templates/accordion.component.html',
  styleUrl: './templates/accordion.component.scss'
})
export class AccordionComponent {
  @Input() data: AccordionConfig | undefined = undefined;
  constructor() {

  }

}
