import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../main/common/layout/layout.module';
import { ApiDataManagerService } from '../main/core/factories/api-data-manager/api-data-manager.service';
import { StorageHelperService } from '../main/core/helpers/storage-helper/storage-helper.service';
import { CultureService } from '../main/core/services/culture/culture.service';
import { AviableCulturesConfig } from '../main/core/types/enums/cultures.enum';
import { ApiDomains } from '../main/core/types/enums/domains.enum';
import { StorageApiKeys, StorageServiceKey } from '../main/core/types/enums/storage.keys.enum';
import { GenericStorageContent } from '../main/core/types/interfaces/core/storage-data-types.interface';
import { CommonApiConfig, FooterConfig, HeaderConfig } from '../main/core/types/interfaces/domains/common.interface';
import { CultureSessionConfig } from '../main/core/types/interfaces/core/culture.interface';
import { SharedModule } from '../main/shared/shared.module';
import { ApiHelperService } from '../main/core/helpers/api-helper/api-helper.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TranslateModule,
    LayoutModule,
    SharedModule],
  providers: [ApiHelperService, CultureService],
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
export class AppComponent extends ApiDataManagerService<CommonApiConfig> implements OnInit {
  private cultureInit!: CultureSessionConfig;

  public header!: HeaderConfig;
  public footer!: FooterConfig;

  constructor(
    protected cultureService: CultureService,
    protected storageHelperService: StorageHelperService,
    protected apiHelperService: ApiHelperService,
  ) {
    super(apiHelperService, storageHelperService);
  }

  ngOnInit(): void {
    this.internalInit();
    this.layoutDataBinding();
  }

  private internalInit() {
    this.createCulture();
    this.storageValidator(this.cultureService.getLang());
    this.cultureService.cultureListener().subscribe(
      (currentLang) => {
        if (currentLang) {
          this.dataCenterListener(
            currentLang,
            ApiDomains.COMMON,
            StorageApiKeys.COMMON,
            false
            )
        }
      }
    )
  }

  private createCulture() {
    this.cultureInit = this.cultureStorageResolver();
    if (!this.cultureInit) {
      this.cultureService.updateLang(AviableCulturesConfig.ES);
    }
  }

  private cultureStorageResolver(): CultureSessionConfig {
    const cultureStorage = this.storageHelperService.getSessionStorage(StorageServiceKey.CULTURE);
    return cultureStorage
  }

  private layoutDataBinding() {
    this.getData().subscribe(
      (common) => {
        this.header = common.layout.header,
        this.footer = common.layout.footer
      }
    )
  }
}
