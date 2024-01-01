import { Component } from '@angular/core';

@Component({
  selector: 'product-page',
  standalone: true,
  providers: [],
  templateUrl: './templates/product.component.html',
  styleUrl: './templates/product.component.scss'
})
export class ProductComponent {
  productId: string = "oe basico";
}
