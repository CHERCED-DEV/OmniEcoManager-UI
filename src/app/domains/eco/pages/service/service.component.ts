import { Component } from '@angular/core';

@Component({
  selector: 'service-page',
  standalone: true,
  providers: [],
  templateUrl: './templates/service.component.html',
  styleUrl: './templates/service.component.scss'
})
export class ServiceComponent {
  serviceId: string = "oe basico";
}
