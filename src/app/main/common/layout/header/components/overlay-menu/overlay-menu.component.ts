import { Component, Input } from '@angular/core';
import { RoutesMenuNavConfig } from '../../../../../core/types/interfaces/actions.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overlay-menu',
  templateUrl: './templates/overlay-menu.component.html',
  styleUrl: './templates/overlay-menu.component.scss'
})
export class OverlayMenuComponent {
  @Input() navigationRoutes: RoutesMenuNavConfig[] = [];
  @Input() isOpenMenu!: Observable<boolean>;

  ngOnInit(): void {
    
  }
  // to change the state on menu
  toggleMenu() {

  }
}
