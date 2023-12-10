import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { OverlayMenuComponent } from './components/overlay-menu/overlay-menu.component';
import { HeaderContainerComponent } from './header-container.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderContainerComponent,
    AlertComponent,
    OverlayMenuComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    HeaderContainerComponent
  ]
})
export class HeaderModule { }
