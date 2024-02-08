import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../main/common/layout/layout.module';
import { ApiDataManagerService } from '../main/core/factories/api-data-manager/api-data-manager.service';
import { StorageHelperService } from '../main/core/helpers/storage-helper/storage-helper.service';
import { CultureService } from '../main/core/services/culture/culture.service';
import { AviableCulturesConfig } from '../main/core/types/enums/cultures.enum';
import { ApiDomains } from '../main/core/types/enums/domains.enum';
import { StorageApiKeys, StorageServiceKey } from '../main/core/types/enums/storage.keys.enum';
import { CommonApiConfig, FooterConfig, HeaderConfig } from '../main/core/types/interfaces/domains/common.interface';
import { CultureSessionConfig } from '../main/core/types/interfaces/shared/culture.interface';
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
  providers: [ApiHelperService, ApiDataManagerService, CultureService],
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
  private cultureInit!: CultureSessionConfig;

  public header!: HeaderConfig;
  public footer!: FooterConfig;

  private commonDataCenterService: ApiDataManagerService<CommonApiConfig>;
  private temporalData: boolean = false;

  constructor(
    private cultureService: CultureService,
    private storageHelperService: StorageHelperService,
    private apiHelperService: ApiHelperService,
  ) {
    this.createCulture();
    this.commonDataCenterService = new ApiDataManagerService<CommonApiConfig>(apiHelperService, storageHelperService);
  }

  ngOnInit(): void {
    this.cultureService.cultureListener().subscribe(
      (currentLang) => {
        if (currentLang !== null && currentLang !== undefined && currentLang !== '') {
          this.commonDataCenterService.initializeDataCenter(
            currentLang,
            ApiDomains.COMMON,
            StorageApiKeys.COMMON,
            this.temporalData
          )
        }
      }
    )
    this.layoutDataBinding();
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
    this.commonDataCenterService.getData().subscribe(
      (data) => {
        this.header = data.layout?.header,
        this.footer = data.layout?.footer
      }
    )
  }
}
