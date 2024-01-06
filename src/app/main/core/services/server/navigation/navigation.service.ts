import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NodeMenuNavConfig, RoutesMenuNavConfig } from '../../../types/interfaces/actions.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private routerTree!: RoutesMenuNavConfig[];
  constructor(private router: Router) {
    this.routerTree = this.routeGetter();
  }

  private routeGetter(): RoutesMenuNavConfig[] {
    const nodesConfig: NodeMenuNavConfig[] =
          this.router.config.filter((nodes) =>
          !nodes?.path?.includes('**')) as NodeMenuNavConfig[];
    return nodesConfig[1].children as RoutesMenuNavConfig[];
  }

  getAllRoutes(lang: string): RoutesMenuNavConfig[] {
    return this.routerTree.map((route) => ({
      path: `${lang}/${route.path}`,
      label: route.path,
      children: route.children ? route.children.map(((child) => ({
        path: child.path,
        label: child.path
      }))) : undefined
    })) as RoutesMenuNavConfig[];
  }

  getRoutesWithoutCurrentRoute(currentRoute: string, lang: string): RoutesMenuNavConfig[] {
    return this.getAllRoutes(lang).filter((route) => route.path !== currentRoute);
  }
}
