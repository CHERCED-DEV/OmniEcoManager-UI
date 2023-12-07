import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UI_ELEMENTS } from './ui-elements/ui-elements.index';



@NgModule({
  declarations: [...UI_ELEMENTS],
  imports: [
    CommonModule, 
  ],
  exports: [...UI_ELEMENTS]
})
export class SharedModule { }
