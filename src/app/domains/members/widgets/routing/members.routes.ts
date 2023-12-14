import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenefitsComponent } from '../../pages/benefits/benefits.component';
import { FavoritesComponent } from '../../pages/favorites/favorites.component';
import { InboxComponent } from '../../pages/inbox/inbox.component';
import { MyEventsComponent } from '../../pages/my-events/my-events.component';
import { DashBoardComponent } from '../../pages/room/dash-board.component';
import { SubscriptionsComponent } from '../../pages/subscriptions/subscriptions.component';

const membersRoutes: Routes = [
    {
        path: '',
        component: DashBoardComponent,
        children: [
            { path: 'benefits', component: BenefitsComponent },
            { path: 'favorites', component: FavoritesComponent },
            { path: 'inbox', component: InboxComponent },
            { path: 'my-events', component: MyEventsComponent },
            { path: 'subscriptions', component: SubscriptionsComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(membersRoutes)],
    exports: [RouterModule]
})
export class MembersRoutingModule { }
