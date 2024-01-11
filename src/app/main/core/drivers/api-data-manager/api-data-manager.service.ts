import { Injectable } from '@angular/core';
import { ApiHelperService } from '../../helpers/api-helper/api-helper.service';
import { StorageHelperService } from '../../helpers/storage-helper/storage-helper.service';
import { CultureService } from '../../services/culture/culture.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { StorageApiKeys } from '../../types/enums/storage.keys.enum';
import { ApiDataManagerConfig } from '../../types/interfaces/domains/api-data-manager.interface';
import { HttpsRequests } from '../../types/enums/validation_types.enum';
import { ApiDomains } from '../../types/enums/domains.enum';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiDataManagerService {
  private dataCenter = new BehaviorSubject<ApiDataManagerConfig>({});
  private dataCenterStorage: ApiDataManagerConfig = {};

  constructor(
    private apiService: ApiHelperService,
    private storageHelperService: StorageHelperService) {
  }

  public initializeDataCenter(
    culture: string,
    domain: ApiDomains,
    storageKey: StorageApiKeys,
    temporalData: boolean
  ): void {
    const fullUrl: string = `${environment.restServer}/${domain}`
    this.apiService.request<ApiDataManagerConfig>(HttpsRequests.GET, fullUrl, culture)
      .subscribe((res) => {
        if (temporalData) {
          this.storageHelperService.setSessionStorage(storageKey, res);
        } else {
          this.storageHelperService.setLocalStorage(storageKey, res);
        }
        this.dataCenter.next(res);
      },
        (error) => {
          console.error('Error initializing data center:', error);
        }
      );
  }

  public getData(): ApiDataManagerConfig {
    return this.dataCenter.getValue();
  }

  public clearData(): void {
    this.dataCenterStorage = {};
    this.dataCenter.next(this.dataCenterStorage);
  }

  public storageHasData(): boolean {
    return !!this.dataCenterStorage;
  }

  private objAreEqual(obj: any[], obj2: any[]): boolean {
    return JSON.stringify(obj) === JSON.stringify(obj2);
  }

}
