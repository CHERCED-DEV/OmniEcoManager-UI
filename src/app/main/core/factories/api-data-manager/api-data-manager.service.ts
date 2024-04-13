import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiHelperService } from '../../helpers/api-helper/api-helper.service';
import { StorageHelperService } from '../../helpers/storage-helper/storage-helper.service';
import { CultureService } from '../../services/culture/culture.service';
import { ApiDomains } from '../../types/enums/domains.enum';
import { HttpsRequests } from '../../types/enums/helpers.enum';
import {
  StorageApiKeys
} from '../../types/enums/storage.keys.enum';
import { ApiDataManagerConfig } from '../../types/interfaces/core/api-data-manager.interface';
import { GenericData } from '../../types/interfaces/core/helpers-data-types.interface';

@Injectable()
export class ApiDataManagerService<T = unknown> {
  private dataCenter: BehaviorSubject<T> = new BehaviorSubject<T>({} as T);
  private localStorage: GenericData<T> = {};
  private sessionStorage: GenericData<T> = {};

  constructor(
    private apiService: ApiHelperService,
    private storageHelper: StorageHelperService,
    private cultureService: CultureService
  ) {
    this.storageValidator(this.cultureService.getLang());
  }

  public dataCenterListener(
    culture: string,
    domain: ApiDomains,
    storageKey: StorageApiKeys,
    temporalData: boolean = true,
    createStorage: boolean = true
  ): void {
    const fullUrl: string = `${environment.restServer}/${domain}`;
    const currentStorage = this.storageHasValueForKey(temporalData, culture);
    if (currentStorage && currentStorage[culture]) {
      this.dataCenter.next(currentStorage as T);
    } else {
      this.apiService
        .request<ApiDataManagerConfig>(HttpsRequests.GET, fullUrl, culture)
        .subscribe(
          (res) => {
            if (createStorage) {
              this.createStorage(
                temporalData,
                storageKey,
                culture,
                res as T
              );
              this.setDataCenterFromStorage(
                temporalData,
                culture,
                this.dataCenter,
              )
            } else {
              this.dataCenter.next(res as T);
            }
          }
        );
    }
  }

  private createStorage(
    temporalData: boolean,
    storageKey: StorageApiKeys,
    culture: string,
    res: T
  ): void {
    const storageMethod = temporalData ? 'setSessionStorage' : 'setLocalStorage';
    const existingStorage = temporalData ? this.sessionStorage : this.localStorage;

    const cultureExists = Object.values(culture).some(storageKeyItem => storageKeyItem.hasOwnProperty(storageKey));

    if (!cultureExists) {
      existingStorage[culture] = res;
    }

    this.storageHelper[storageMethod](storageKey, existingStorage);
  }

  private storageHasValueForKey(
    temporalData: boolean,
    culture: string,
  ): GenericData<T> | undefined {
    if (temporalData) {
      if (culture in this.sessionStorage) {
        return this.sessionStorage[culture] as GenericData<T>;
      } else {
        return undefined;
      }
    } else {
      if (culture in this.localStorage) {
        return this.localStorage[culture] as GenericData<T>;
      } else {
        return undefined;
      }
    }
  }

  private storageValidator(culture: string): void {
    const storageCultureKeys: string[] = Object.values(culture);
    storageCultureKeys.forEach((key) => {
      const localRes = this.storageHelper.getLocalStorage(key);
      const sessionRes = this.storageHelper.getSessionStorage(key);
      if (localRes) {
        this.localStorage[key] = localRes;
      }
      if (sessionRes) {
        this.sessionStorage[key] = sessionRes;
      }
    })
  }

  private setDataCenterFromStorage(
    temporalData: boolean,
    culture: string,
    dataCenter: BehaviorSubject<T>,
  ): void {
    const currentDataStorage = this.storageHasValueForKey(temporalData, culture);
    dataCenter.next(currentDataStorage as T);
  }

  public getDataByCulture(culture: string): BehaviorSubject<T> {
    return this.dataCenter;
  }

  public getData(): BehaviorSubject<T> {
    return this.dataCenter;
  }

  public clearData(): void {
    this.dataCenter.next({} as T);
  }
}
