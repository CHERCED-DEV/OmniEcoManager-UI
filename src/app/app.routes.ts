import { Routes } from '@angular/router';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./domains/info/pages/room/home.component')
      .then(m => m.HomeComponent),
    data: {
      title: 'Home',
      description: 'Welcome to the Home page!',
      children: {
        about: {
          title: 'About',
          description: 'Learn more about us.'
        },
        faq: {
          title: 'FAQ',
          description: 'Frequently Asked Questions.'
        },
        terms: {
          title: 'Terms',
          description: 'Read our terms and conditions.'
        }
      }
    },
    children: [
      {
        path: 'about',
        loadComponent: () => import('./domains/info/pages/about/about.component').then(m => m.AboutComponent),
      },
      {
        path: 'faq',
        loadComponent: () => import('./domains/info/pages/faq/faq.component').then(m => m.FaqComponent),
      },
      {
        path: 'terms',
        loadComponent: () => import('./domains/info/pages/terms/terms.component').then(m => m.TermsComponent),
      },
    ]
  },
  {
    path: 'blog',
    loadComponent: () => import('./domains/blog/pages/room/blog.component')
      .then(m => m.BlogComponent),
    data: {
      title: 'Blog',
      description: 'Explore our blog content.',
      children: {
        thread: {
          title: 'Thread',
          description: 'Explore blog threads.'
        },
        post: {
          title: 'Post',
          description: 'Read individual blog posts.'
        }
      }
    },
    children: [
      {
        path: 'thread',
        loadComponent: () => import('./domains/blog/pages/thread/thread.component')
          .then(m => m.ThreadComponent),
      },
      {
        path: 'post/:id',
        loadComponent: () => import('./domains/blog/pages/post/post.component')
          .then(m => m.PostComponent),
      },
    ]
  },
  {
    path: 'eco',
    loadComponent: () => import('./domains/eco/pages/room/eco.component')
      .then(m => m.EcoComponent),
    data: {
      title: 'Eco',
      description: 'Explore our eco-friendly offerings.',
      children: {
        service: {
          title: 'Service',
          description: 'Explore our eco services.'
        },
        product: {
          title: 'Product',
          description: 'View our eco-friendly products.'
        },
        payment: {
          title: 'Payment',
          description: 'Make a payment for our eco services or products.'
        },
        confirmation: {
          title: 'Confirmation',
          description: 'Confirmation page for eco transactions.'
        }
      }
    },
    children: [
      {
        path: 'service/:id',
        loadComponent: () => import('./domains/eco/pages/service/service.component')
          .then(m => m.ServiceComponent),
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./domains/eco/pages/product/product.component')
          .then(m => m.ProductComponent),
      },
      {
        path: 'payment',
        loadComponent: () => import('./domains/eco/pages/payment/payment.component')
          .then(m => m.PaymentComponent),
      },
      {
        path: 'confirmation',
        loadComponent: () => import('./domains/eco/pages/confirmation/confirmation.component')
          .then(m => m.ConfirmationComponent),
      },
    ]
  },
  {
    path: 'members',
    loadComponent: () => import('./domains/members/pages/room/dash-board.component')
      .then(m => m.DashBoardComponent),
    data: {
      title: 'Members',
      description: 'Welcome to the Members area!',
      children: {
        benefits: {
          title: 'Benefits',
          description: 'Explore the benefits available to members.'
        },
        favorites: {
          title: 'Favorites',
          description: 'View your favorite content.'
        },
        inbox: {
          title: 'Inbox',
          description: 'View your messages and notifications.'
        },
        'my-events': {
          title: 'My Events',
          description: 'View and manage your events.'
        },
        subscriptions: {
          title: 'Subscriptions',
          description: 'Manage your subscriptions.'
        }
      }
    },
    children: [
      {
        path: 'benefits',
        loadChildren: () => import('./domains/members/pages/benefits/benefits.component')
          .then(m => m.BenefitsComponent)
      },
      {
        path: 'favorites',
        loadChildren: () => import('./domains/members/pages/favorites/favorites.component')
          .then(m => m.FavoritesComponent)
      },
      {
        path: 'inbox',
        loadChildren: () => import('./domains/members/pages/inbox/inbox.component')
          .then(m => m.InboxComponent)
      },
      {
        path: 'my-events',
        loadChildren: () => import('./domains/members/pages/my-events/my-events.component')
          .then(m => m.MyEventsComponent)
      },
      {
        path: 'subscriptions',
        loadChildren: () => import('./domains/members/pages/subscriptions/subscriptions.component')
          .then(m => m.SubscriptionsComponent)
      },
    ]
  },
  { path: '**', component: NotFoundComponent }
];
