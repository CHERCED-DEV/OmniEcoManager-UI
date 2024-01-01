import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../main/common/layout/layout.module';
import { CultureService } from '../main/core/services/helpers/culture/culture.service';
import { TranslationService } from '../main/core/services/helpers/translation/translation.service';
import { InputsValidationService } from '../main/core/services/security/validation/inputs/inputs-validation.service';
import { CommonService } from '../main/core/services/server/common/common.service';
import { FooterConfig, HeaderConfig } from '../main/core/types/interfaces/common.interface';
import { SharedModule } from '../main/shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TranslateModule,
    LayoutModule,
    SharedModule],
  providers: [CommonService, CultureService, TranslationService, InputsValidationService],
  template: `
  <div class="page-wrap">
    <app-header
      [static_content]="header">
    </app-header>
        <router-outlet>
        </router-outlet>
    <app-footer
      [static_content]="footer">
    </app-footer>
  </div>`
})
export class AppComponent {
  public header: HeaderConfig;
  public footer: FooterConfig;
  constructor(
    private commonService: CommonService,
    private cultureService: CultureService
  ) {
    this.cultureService.setLang(this.cultureService.cultures[1]);
    this.header = this.commonService.layout.header;
    this.footer = this.commonService.layout.footer;
  }
}
