import { Routes } from '@angular/router';
import { AboutComponent } from './domains/pages/about/about.component';
import { ConfirmationComponent } from './domains/pages/eco/confirmation/confirmation.component';
import { EcoComponent } from './domains/pages/eco/eco.component';
import { PaymentComponent } from './domains/pages/eco/payment/payment.component';
import { ProductComponent } from './domains/pages/eco/product/product.component';
import { ServiceComponent } from './domains/pages/eco/service/service.component';
import { HomeComponent } from './domains/pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'eco',
    component: EcoComponent,
    children: [
      { path: 'service/:id', component: ServiceComponent },
      { path: 'product/:id', component: ProductComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'confirmation', component: ConfirmationComponent },
      // Puedes agregar más rutas anidadas según sea necesario
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];