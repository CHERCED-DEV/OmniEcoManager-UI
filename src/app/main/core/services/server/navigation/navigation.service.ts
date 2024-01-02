import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NodeMenuNavConfig, RoutesMenuNavConfig } from '../../../types/interfaces/actions.interface';
import { CultureService } from '../../helpers/culture/culture.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private culture: string = '';
  constructor(private router: Router, private cultureService: CultureService) {
    this.cultureService.currentLang$.subscribe((lang) => {
      this.culture = lang
    });
  }

  getAllRoutes(): RoutesMenuNavConfig[] {
    const nodesConfig: NodeMenuNavConfig[] = this.router.config.filter((nodes) => !nodes?.path?.includes('**')) as NodeMenuNavConfig[];
    console.log(this.culture)
    const {children} = nodesConfig[0]
    return children.map((route) => ({
      path: `${this.culture}/${route.path}`,
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
