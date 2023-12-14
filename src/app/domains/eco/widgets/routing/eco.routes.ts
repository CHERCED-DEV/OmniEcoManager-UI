import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from '../../pages/confirmation/confirmation.component';
import { PaymentComponent } from '../../pages/payment/payment.component';
import { ProductComponent } from '../../pages/product/product.component';
import { EcoComponent } from '../../pages/room/eco.component';
import { ServiceComponent } from '../../pages/service/service.component';

const ecoRoutes: Routes = [
    {
        path: '',
        component: EcoComponent,
        children: [
            { path: 'service/:id', component: ServiceComponent },
            { path: 'product/:id', component: ProductComponent },
            { path: 'payment', component: PaymentComponent },
            { path: 'confirmation', component: ConfirmationComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(ecoRoutes)],
    exports: [RouterModule]
})
export class EcoRoutingModule { }
