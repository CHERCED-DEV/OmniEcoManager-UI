import { Component, Input } from '@angular/core';
import { FooterConfig } from '../../../core/types/interfaces/domains/common.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './templates/footer-container.component.html',
  styleUrl: './/templates/footer-container.component.scss'
})
export class FooterContainerComponent {
  @Input() static_content!: FooterConfig;
}
