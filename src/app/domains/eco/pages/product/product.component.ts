import { Component } from '@angular/core';

@Component({
  selector: 'page-product',
  templateUrl: './product.component.html',
  standalone: true,
  providers: [],
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  productId: string = "oe basico";
}
