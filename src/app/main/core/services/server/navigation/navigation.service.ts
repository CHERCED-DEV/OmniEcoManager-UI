import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NodeMenuNavConfig, RoutesMenuNavConfig } from '../../../types/interfaces/actions.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {
    console.log(router)
  }

  getAllRoutes(): RoutesMenuNavConfig[] {
    const nodesConfig: NodeMenuNavConfig[] = this.router.config.filter((nodes) => !nodes?.path?.includes('**')) as NodeMenuNavConfig[];
    return nodesConfig.flatMap((node) => node.children || []);
  }

  getRoutesWithoutCurrentRoute(currentRoute: string): RoutesMenuNavConfig[] {
    return this.getAllRoutes().filter((route) => route.path !== currentRoute) as RoutesMenuNavConfig[];
  }
}
