import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesMenuNavConfig } from '../../../types/interfaces/actions.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  getRoutesWithoutCurrentRoute(currentRoute: string): RoutesMenuNavConfig[] {
    return this.router.config
      .filter((route) => route.path !== currentRoute)
      .map((route) => ({
        path: route.path,
        label: route.path === '' ? 'home' : route.path,
      })) as RoutesMenuNavConfig[];
  }
}
