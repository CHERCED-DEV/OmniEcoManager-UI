import { Component, HostListener, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationService } from '../../../core/services/server/navigation/navigation.service';
import { RoutesMenuNavConfig } from '../../../core/types/interfaces/actions.interface';
import { HeaderConfig } from '../../../core/types/interfaces/common.interface';

@Component({
  selector: 'app-header',
  templateUrl: './templates/header-container.component.html',
  styleUrl: './templates/header-container.component.scss'
})
export class HeaderContainerComponent {
  @Input() static_content!: HeaderConfig;
  private toogleMenuSubject = new BehaviorSubject<boolean>(false);
  public toogleMenu$: Observable<boolean> = this.toogleMenuSubject.asObservable();

  navigationRoutes: RoutesMenuNavConfig[] = [];
  isMobile: boolean = false;
  mobileWidth: number = 768;
  isOpenMenu: boolean = false;
  cultures: string[] | null = null;

  constructor(private navigationService: NavigationService, private router: Router) { }

  ngOnInit(): void {
    //  to listen wich routes did you have with out current route
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const currentUrl: string = event.url.split('/')[1];
        this.navigationRoutes = this.navigationService.getRoutesWithoutCurrentRoute(currentUrl);
        console.log(this.navigationRoutes)
      }
    }); 
    
    this.itsMobileScreen();
    // to get the intial value from menu mobile
    this.toogleMenu$.subscribe((isOpen: boolean) => {
      this.isOpenMenu = isOpen;
    });
  }

  public toggleMenu() {
    const newMenuState = !this.isOpenMenu;
    this.setToogleMenuState(newMenuState);
  }

  public setToogleMenuState(isOpen: boolean) {
    this.toogleMenuSubject.next(isOpen);
  }

  public itsMobileScreen() {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth <= this.mobileWidth;
    }
  }

  //to rebuild the mobile var
  @HostListener('window:resize')
  onResize() {
    this.itsMobileScreen();
  }
}
