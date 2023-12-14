import { Injectable } from '@angular/core';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RoutesMenuNavConfig } from '../../../types/interfaces/actions.interface';

interface ExtendedRoute extends Route {
  _loadedRoutes?: [{ children: any }];
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.log(this.getAllRoutes(this.router.config));
    });
  }

  getRoutesWithoutCurrentRoute(currentRoute: string): any[] {
    const allRoutes: ExtendedRoute[] = this.getAllRoutes(this.router.config);
    return allRoutes
      .filter((route) => route.path !== currentRoute)
      .map((route) => ({
        path: route.path,
        label: route.path === '' ? 'home' : route.path,
        childs: route._loadedRoutes ? route._loadedRoutes[0].children : []
      }));
  }

  private getAllRoutes(routes: ExtendedRoute[]): ExtendedRoute[] {
    return routes.reduce((all, route) => {
      if (route._loadedRoutes) {
        // If the route has lazy-loaded children, recursively fetch their routes
        return [...all, route, ...this.getAllRoutes(route._loadedRoutes[0].children)];
      } else {
        return [...all, route];
      }
    }, [] as ExtendedRoute[]);
  }
}
