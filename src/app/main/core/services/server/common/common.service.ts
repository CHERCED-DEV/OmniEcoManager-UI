import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { StorageApiKeys } from '../../../types/enums/storage.keys';
import { HttpsRequests } from '../../../types/enums/validation_types.enum';
import { CommonApiConfig, LayoutConfig } from '../../../types/interfaces/common.interface';
import { ApiHelperService } from '../../helpers/api-helper/api-helper.service';
import { StorageHelperService } from '../../helpers/storage-helper/storage-helper.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private commonSessionStorage: CommonApiConfig;
  public layout: LayoutConfig = {} as LayoutConfig;


  constructor(
    private apiService: ApiHelperService,
    private storageHelperService: StorageHelperService
  ) {
    this.commonSessionStorage = this.storageHelperService.getSessionStorage(StorageApiKeys.COMMON);
    if (!this.commonSessionStorage) {
      this.inicializate()
    } else {
      this.createObjects(this.commonSessionStorage)
    }
  }

  private inicializate() {
    this.apiService.request(HttpsRequests.GET, environment.commonApi)
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
