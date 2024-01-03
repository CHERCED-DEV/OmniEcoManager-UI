import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NodeMenuNavConfig, RoutesMenuNavConfig } from '../../../types/interfaces/actions.interface';
import { CultureService } from '../../helpers/culture/culture.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentLang!: string;
  constructor(private router: Router, private cultureService: CultureService) {
    this.cultureService.getLang().subscribe((value) => {
      this.currentLang = value;
    })
  }

  getAllRoutes(): RoutesMenuNavConfig[] {
    const nodesConfig: NodeMenuNavConfig[] = this.router.config.filter((nodes) => !nodes?.path?.includes('**')) as NodeMenuNavConfig[];
    const { children } = nodesConfig[0]
    return children.map((route) => ({
      path: `${this.currentLang}/${route.path}`,
      label: route.path,
      children: route.children ? route.children.map(((child) => ({
        path: child.path,
        label: child.path
      }))) : undefined
    })) as RoutesMenuNavConfig[];
  }

  getRoutesWithoutCurrentRoute(currentRoute: string): RoutesMenuNavConfig[] {
    return this.getAllRoutes().filter((route) => route.path !== currentRoute);
  }
}
