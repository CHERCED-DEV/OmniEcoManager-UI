import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone: true,
  providers: [ActivatedRoute],
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  productId: string = "oe basico";  // Asegúrate de definir la propiedad productId

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'];  // Asigna el valor del parámetro id a la propiedad productId
    });
  }
}
