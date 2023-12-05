import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiHelperService } from '../../core/services/helpers/api-helper/api-helper.service';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';

@NgModule({
  imports: [CommonModule],
  exports: [
    FooterModule,
    HeaderModule
  ],
  providers: [ApiHelperService]
})
export class LayoutModule { }
