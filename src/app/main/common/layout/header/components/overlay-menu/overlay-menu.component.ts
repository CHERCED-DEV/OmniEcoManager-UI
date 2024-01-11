import { Component, Input } from '@angular/core';
import { RoutesMenuNavConfig } from '../../../../../core/types/interfaces/shared/navigation.interface';
import { Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationService } from '../../../../../core/helpers/navigation/navigation.service';
import { CultureService } from '../../../../../core/services/culture/culture.service';

@Component({
  selector: 'app-overlay-menu',
  templateUrl: './templates/overlay-menu.component.html',
  styleUrl: './templates/overlay-menu.component.scss'
})
export class OverlayMenuComponent {
  @Input() navigationRoutes: RoutesMenuNavConfig[] = [];
  @Input() isOpenMenu!: Observable<boolean>;

  constructor(private router: Router,
    private navigationService: NavigationService,
    private cultureService: CultureService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const currentUrl: string = event.url.split('/')[1];
        this.navigationRoutes = this.navigationService.getRoutesWithoutCurrentRoute(currentUrl, this.cultureService.getLang());
      }
    });
  }

  ngOnInit(): void {
    //  to listen wich routes did you have with out current route

  }
  // to change the state on menu
  toggleMenu() {

  }
}
