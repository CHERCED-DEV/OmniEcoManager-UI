import { Component, HostListener, Input, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationService } from '../../../core/helpers/navigation/navigation.service';
import { RoutesMenuNavConfig } from '../../../core/types/interfaces/shared/navigation.interface';
import { HeaderConfig } from '../../../core/types/interfaces/domains/common.interface';
import { environment } from '../../../../../environments/environment';
import { CultureService } from '../../../core/services/culture/culture.service';
import { AviableCulturesConfig } from '../../../core/types/enums/cultures.enum';

@Component({
  selector: 'app-header',
  templateUrl: './templates/header-container.component.html',
  styleUrl: './templates/header-container.component.scss'
})
export class HeaderContainerComponent {
  @Input() static_content!: HeaderConfig;
  private toogleMenuSubject = new BehaviorSubject<boolean>(false);
  public toogleMenu$: Observable<boolean> = this.toogleMenuSubject.asObservable();

  CDN: string;
  navigationRoutes: RoutesMenuNavConfig[] = [];
  isMobile: boolean = false;
  mobileWidth: number = 768;
  isOpenMenu: boolean = false;
  availableCultures: AviableCulturesConfig[] = Object.values(AviableCulturesConfig);

  constructor(
    private navigationService: NavigationService,
    private cultureService: CultureService) {
    this.CDN = environment.strapiCDN;
    this.navigationRoutes = this.navigationService.getAllRoutes(this.cultureService.getLang());
    
  }

  ngOnInit(): void {
    this.internalInit();
    // to get the intial value from menu mobile
    this.toogleMenu$.subscribe((isOpen: boolean) => {
      this.isOpenMenu = isOpen;
    });
  }

  private internalInit() {
    this.itsMobileScreen();
    this.cultureOnChanges();
  }

  private cultureOnChanges(){
    this.cultureService.cultureListener()
      .subscribe((newCulture: string) => {
      this.navigationRoutes = this.navigationService.getAllRoutes(newCulture);
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

  public changeCulture(culture: string) {
    const cultureEnumValue: AviableCulturesConfig = culture as AviableCulturesConfig;
    this.cultureService.updateLang(cultureEnumValue);
  }

  //to rebuild the mobile var
  @HostListener('window:resize')
  onResize() {
    this.itsMobileScreen();
  }
}
