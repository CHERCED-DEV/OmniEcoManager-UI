import { Routes } from '@angular/router';
import { HomeComponent } from './domains/info/pages/home/home.component';
import { AboutComponent } from './domains/info/pages/about/about.component';
import { FaqComponent } from './domains/info/pages/faq/faq.component';
import { TermsComponent } from './domains/info/pages/terms/terms.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { EcoComponent } from './domains/eco/eco.component';
import { ServiceComponent } from './domains/eco/service/service.component';
import { ProductComponent } from './domains/eco/product/product.component';
import { PaymentComponent } from './domains/eco/payment/payment.component';
import { ConfirmationComponent } from './domains/eco/confirmation/confirmation.component';


export const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'terms', component: TermsComponent },
    ]
  },
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
  { path: '**', component: NotFoundComponent}
];