import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../../pages/about/about.component';
import { FaqComponent } from '../../pages/faq/faq.component';
import { HomeComponent } from '../../pages/room/home.component';
import { TermsComponent } from '../../pages/terms/terms.component';

const infoRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'about', component: AboutComponent },
            { path: 'faq', component: FaqComponent },
            { path: 'terms', component: TermsComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(infoRoutes)],
    exports: [RouterModule]
})
export class InfoRoutingModule { }
