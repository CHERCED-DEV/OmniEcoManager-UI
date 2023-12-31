import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { StorageApiKeys } from '../../../types/enums/storage.keys.enum';
import { HttpsRequests } from '../../../types/enums/validation_types.enum';
import { CommonApiConfig, LayoutConfig } from '../../../types/interfaces/common.interface';
import { ApiHelperService } from '../../helpers/api-helper/api-helper.service';
import { StorageHelperService } from '../../helpers/storage-helper/storage-helper.service';
import { CultureService } from '../../helpers/culture/culture.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private langHeader!: string;
  private commonSessionStorage: CommonApiConfig;
  public layout: LayoutConfig = {} as LayoutConfig;


  constructor(
    private apiService: ApiHelperService,
    private storageHelperService: StorageHelperService,
    private cultureService: CultureService
  ) {
    this.cultureService.cultureListener().subscribe((currentLang)=> {
      this.langHeader = currentLang;
    })
    this.commonSessionStorage = this.storageHelperService.getSessionStorage(StorageApiKeys.COMMON);
    if (!this.commonSessionStorage) {
      this.inicializate()
    } else {
      this.createObjects(this.commonSessionStorage)
    }
  }

  private inicializate() {
    this.apiService.request(HttpsRequests.GET, environment.commonApi, this.langHeader)
    .subscribe((data: CommonApiConfig ) => {
        this.storageHelperService.setSessionStorage(StorageApiKeys.COMMON, data);
        this.createObjects(data)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private createObjects(call: CommonApiConfig) {
    this.layout = {
      header: call.layout.header,
      footer: call.layout.footer,
    };
  }
}
