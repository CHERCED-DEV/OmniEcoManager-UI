import { Injectable } from '@angular/core';
import { ApiDataManagerService } from '../../../core/drivers/api-data-manager/api-data-manager.service';
import { CultureService } from '../../../core/services/culture/culture.service';
import { CommonApiConfig, LayoutConfig } from '../../../core/types/interfaces/domains/common.interface';
import { ApiDomains } from '../../../core/types/enums/domains.enum';
import { StorageApiKeys } from '../../../core/types/enums/storage.keys.enum';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public layout: LayoutConfig = {} as LayoutConfig;


  constructor(
    private cultureService: CultureService,
    private dataCenter: ApiDataManagerService
  ) {
    this.cultureService.cultureListener().subscribe((currentLang)=> {
      this.dataCenter.initializeDataCenter(currentLang, ApiDomains.COMMON, StorageApiKeys.COMMON)
    })
    console.log(this.dataCenter.getData(ApiDomains.COMMON)?.getValue());
    this.createObjects(this.dataCenter.getData(ApiDomains.COMMON)?.getValue())
  }


  private createObjects(call: any) {
    console.log(call.layout?.header);
    this.layout = {
      header: call.layout?.header,
      footer: call.layout?.footer,
    };
  }
}
