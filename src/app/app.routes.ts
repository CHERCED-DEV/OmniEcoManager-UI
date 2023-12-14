import { Routes } from '@angular/router';
//info
import { AboutComponent } from './domains/info/pages/about/about.component';
import { FaqComponent } from './domains/info/pages/faq/faq.component';
import { HomeComponent } from './domains/info/pages/room/home.component';
import { TermsComponent } from './domains/info/pages/terms/terms.component';
//blog
import { BlogComponent } from './domains/blog/pages/room/blog.component';
import { PostComponent } from './domains/blog/pages/post/post.component';
import { ThreadComponent } from './domains/blog/pages/thread/thread.component';
//eco
import { ConfirmationComponent } from './domains/eco/pages/confirmation/confirmation.component';
import { PaymentComponent } from './domains/eco/pages/payment/payment.component';
import { ProductComponent } from './domains/eco/pages/product/product.component';
import { EcoComponent } from './domains/eco/pages/room/eco.component';
import { ServiceComponent } from './domains/eco/pages/service/service.component';
//members
import { DashBoardComponent } from './domains/members/pages/room/dash-board.component';
import { BenefitsComponent } from './domains/members/pages/benefits/benefits.component';
import { FavoritesComponent } from './domains/members/pages/favorites/favorites.component';
import { InboxComponent } from './domains/members/pages/inbox/inbox.component';
import { MyEventsComponent } from './domains/members/pages/my-events/my-events.component';
import { SubscriptionsComponent } from './domains/members/pages/subscriptions/subscriptions.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./domains/info/widgets/routing/info.routes').then(m => m.InfoRoutingModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./domains/blog/widgets/routing/blog.routes').then(m => m.BlogRoutingModule)
  },
  {
    path: 'eco',
    loadChildren: () => import('./domains/eco/widgets/routing/eco.routes').then(m => m.EcoRoutingModule)
  },
  {
    path: 'members',
    loadChildren: () => import('./domains/members/widgets/routing/members.routes').then(m => m.MembersRoutingModule)
  },
  { path: '**', component: NotFoundComponent }
];
