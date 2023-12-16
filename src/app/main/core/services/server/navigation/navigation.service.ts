import { Injectable } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { RoutesMenuNavConfig } from '../../../types/interfaces/actions.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {
    console.log(this.getAllRoutes())
  }

  getAllRoutes(): Route[] {
    return this.router.config
      .filter((route) => !route?.path?.includes('**'))
      .map((route) => ({
        path: route.path,
        label: route.path === '' ? 'home' : route.path,
        children: route.children ? route.children.map(((child)=> ({
          path: child.path,
          label: child.path
        }))) : undefined
      })) as RoutesMenuNavConfig[];
  }

  getRoutesWithoutCurrentRoute(currentRoute: string): RoutesMenuNavConfig[] {
    return this.getAllRoutes().filter((route) => route.path !== currentRoute) as RoutesMenuNavConfig[];
  }
}
