import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service',
  standalone: true,
  providers: [ActivatedRoute],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {
  serviceId: string = "oe basico";  // Asegúrate de definir la propiedad serviceId

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.serviceId = params['id'];  // Asigna el valor del parámetro id a la propiedad serviceId
    });
    console.log(this.serviceId)
  }
}
