import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../main/common/layout/layout.module';
import { CultureService } from '../main/core/services/helpers/culture/culture.service';
import { TranslationService } from '../main/core/services/helpers/translation/translation.service';
import { InputsValidationService } from '../main/core/services/security/validation/inputs/inputs-validation.service';
import { CommonService } from '../main/core/services/server/common/common.service';
import { CultureSessionConfig, FooterConfig, HeaderConfig } from '../main/core/types/interfaces/common.interface';
import { SharedModule } from '../main/shared/shared.module';
import { StorageHelperService } from '../main/core/services/helpers/storage-helper/storage-helper.service';
import { StorageServiceKey } from '../main/core/types/enums/storage.keys.enum';
import { AviableCulturesConfig } from '../main/core/types/enums/cultures.enum';

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
  public cultureInit!: CultureSessionConfig;
  public header!: HeaderConfig;
  public footer!: FooterConfig;
  constructor(
    private commonService: CommonService,
    private cultureService: CultureService,
    private storageHelperService: StorageHelperService
  ) {
    this.cultureInit = this.cultureStorageResolver()
    this.createCulture();
  }
  private createCulture() {
    if (!this.cultureInit) {
      this.cultureService.updateLang(AviableCulturesConfig.ES);
    }
  }

  private cultureStorageResolver (): CultureSessionConfig {
    const cultureStorage = this.storageHelperService.getSessionStorage(StorageServiceKey.CULTURE);
    return cultureStorage
  } 

  ngOnInit(): void {
    this.layoutDataBinding();
  }

  private layoutDataBinding() {
    this.header = this.commonService.layout.header;
    this.footer = this.commonService.layout.footer;
  }
}
