import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { StorageApiKeys } from '../../../types/enums/storage.keys';
import { HttpsRequests } from '../../../types/enums/validation_types.enum';
import { LayoutConfig } from '../../../types/interfaces/common.interface';
import { CommonApiResponse, CommonConfig } from '../../../types/interfaces/strapiCallers/strapi.apis.interface';
import { ApiHelperService } from '../../helpers/api-helper/api-helper.service';
import { StorageHelperService } from '../../helpers/storage-helper/storage-helper.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private commonSessionStorage: LayoutConfig;

  public layout: LayoutConfig = {} as LayoutConfig;
  public regex: string[] = [];
  public error_menssages: string[] = [];


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
    .subscribe((data: LayoutConfig ) => {
        this.storageHelperService.setSessionStorage(StorageApiKeys.COMMON, data);
        this.createObjects(data)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private createObjects(call: LayoutConfig) {
    this.layout = {
      header: call.header,
      footer: call.footer,
      starter: call.starter    
    };
    //this.regex = call.regex;
    //this.error_menssages = call.error_messages
  }
}
