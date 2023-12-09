import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarterPageComponent } from './components/starter-page/starter-page.component';
import { PageHandlerComponent } from './page-handler.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [PageHandlerComponent, StarterPageComponent, LoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [PageHandlerComponent]
})
export class PageHandlerModule { }
