import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { OverlayMenuComponent } from './components/overlay-menu/overlay-menu.component';
import { HeaderContainerComponent } from './header-container.component';

@NgModule({
  declarations: [
    HeaderContainerComponent,
    AlertComponent,
    OverlayMenuComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderContainerComponent
  ]
})
export class HeaderModule { }
