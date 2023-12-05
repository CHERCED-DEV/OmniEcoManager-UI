import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { MainFooterNavComponent } from './components/main-footer-nav/main-footer-nav.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { SocialmediaComponent } from './components/socialmedia/socialmedia.component';
import { FooterContainerComponent } from './footer-container.component';

@NgModule({
  declarations: [
    FooterContainerComponent,
    CopyrightComponent, 
    MainFooterNavComponent, 
    NewsletterComponent, 
    SocialmediaComponent
  ],
  imports: [
    CommonModule, 
  ],
  exports: [
    FooterContainerComponent
  ]
})
export class FooterModule { }
