import { Component, Input } from '@angular/core';
import { HeaderConfig } from '../../../core/types/interfaces/common.interface';

@Component({
  selector: 'app-header',
  templateUrl: './templates/header-container.component.html',
  styleUrl: './templates/header-container.component.scss'
})
export class HeaderContainerComponent {
  @Input() static_content!: HeaderConfig;
}
