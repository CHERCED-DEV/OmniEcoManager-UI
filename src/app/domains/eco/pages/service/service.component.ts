import { Component } from '@angular/core';

@Component({
  selector: 'app-service',
  standalone: true,
  providers: [],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {
  serviceId: string = "oe basico";
}
