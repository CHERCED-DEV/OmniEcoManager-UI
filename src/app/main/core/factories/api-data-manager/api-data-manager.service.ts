import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiHelperService } from '../../helpers/api-helper/api-helper.service';
import { StorageHelperService } from '../../helpers/storage-helper/storage-helper.service';
import { ApiDomains } from '../../types/enums/domains.enum';
import {
  GenericCultureNode,
  GenericStorageContent,
  StorageApiKeys
} from '../../types/enums/storage.keys.enum';
import { HttpsRequests } from '../../types/enums/validation_types.enum';
import { ApiDataManagerConfig } from '../../types/interfaces/domains/api-data-manager.interface';
import { BlogApiConfig } from '../../types/interfaces/domains/blog.domain.interface';
import { CommonApiConfig } from '../../types/interfaces/domains/common.interface';
import { EcoApiConfig } from '../../types/interfaces/domains/eco.domain.interface';
import { InfoApiConfig } from '../../types/interfaces/domains/info.domain.interface';
import { MembersApiConfig } from '../../types/interfaces/domains/membars.domian.interface';

@Injectable()
export class ApiDataManagerService<T = unknown> {
  private dataCenter: BehaviorSubject<T> = new BehaviorSubject<T>({} as T);
  private localStorage: GenericStorageContent<T> = {};
  private sessionStorage: GenericStorageContent<T> = {};

  constructor(
    private apiService: ApiHelperService,
    private storageHelper: StorageHelperService
  ) {
    this.storageValidator();
  }

  public dataCenterListener(
    culture: string,
    domain: ApiDomains,
    storageKey: StorageApiKeys,
    temporalData: boolean = true,
    createStorage: boolean = true
  ): void {
    const fullUrl: string = `${environment.restServer}/${domain}`;
    const apiKeyObjDomain = this.mapToApiKeyObjDomain(domain);
    const currentStorage = this.storageHasValueForKey(temporalData, storageKey)
    if (currentStorage && currentStorage[domain] && currentStorage[domain][culture]) {
      this.dataCenter.next(this.mapAsDomainInterface(currentStorage, domain));
    } else {
      this.apiService
        .request<ApiDataManagerConfig>(HttpsRequests.GET, fullUrl, culture)
        .subscribe(
          (res) => {
            if (createStorage) {
              this.createStorage(
                temporalData,
                storageKey,
                domain,
                culture,
                this.mapAsDomainInterface(res[apiKeyObjDomain], domain)
              );
              this.setDataCenterFromStorage(
                temporalData,
                storageKey,
                domain,
                this.dataCenter,
              )
            } else {
              this.dataCenter.next(this.mapAsDomainInterface(res[apiKeyObjDomain], domain));
            }
          }
        );
    }
  }

  private createStorage(
    temporalData: boolean,
    storageKey: StorageApiKeys,
    domain: ApiDomains,
    culture: string,
    res: T
  ): void {
    const storageMethod = temporalData ? 'setSessionStorage' : 'setLocalStorage';
    const existingStorage = temporalData ? this.sessionStorage : this.localStorage;

    const domainExists = Object.values(existingStorage).some(storageItem => storageItem.hasOwnProperty(storageKey));
    const cultureExists = Object.values(domainExists).some(cultureItem => cultureItem.hasOwnProperty(culture));

    if (!domainExists) {
      existingStorage[domain] = {};
    }

    if (!cultureExists) {
      existingStorage[domain][culture]= res;
    }

    this.storageHelper[storageMethod](storageKey, existingStorage);
  }

  private storageHasValueForKey(
    temporalData: boolean,
    storageKey: StorageApiKeys,
  ): GenericStorageContent<T> | undefined {
    if (temporalData) {
      const sessionItem = Object.keys(this.sessionStorage).find(item => item.hasOwnProperty(storageKey));
      return sessionItem as GenericStorageContent<T> | undefined;
    } else {
      const localItem = Object.keys(this.localStorage).find(item => item.hasOwnProperty(storageKey));
      return localItem as GenericStorageContent<T> | undefined;
    }
  }

  private storageValidator(): void {
    const storageKeys: StorageApiKeys[] = Object.values(StorageApiKeys);
    storageKeys.forEach((key) => {
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
    storageKey: StorageApiKeys,
    domain: ApiDomains,
    dataCenter: BehaviorSubject<T>,
  ): void {
    const currentDataStorage = this.storageHasValueForKey(temporalData, storageKey);
    dataCenter.next(this.mapAsDomainInterface(currentDataStorage, domain));
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

  private mapAsDomainInterface(res: any, domain: ApiDomains): T {
    switch (domain) {
      case ApiDomains.BLOG:
        return res as BlogApiConfig as T;
      case ApiDomains.ECO:
        return res as EcoApiConfig as T;
      case ApiDomains.COMMON:
        return res as CommonApiConfig as T;
      case ApiDomains.INFO:
        return res as InfoApiConfig as T;
      case ApiDomains.MEMBERS:
        return res as MembersApiConfig as T;
      default:
        throw new Error(`Unhandled domain: ${domain}`);
    }
  }

  private mapToApiKeyObjDomain(apiDomain: ApiDomains): StorageApiKeys {
    switch (apiDomain) {
      case ApiDomains.BLOG:
        return StorageApiKeys.BLOG;
      case ApiDomains.ECO:
        return StorageApiKeys.ECO;
      case ApiDomains.COMMON:
        return StorageApiKeys.COMMON;
      case ApiDomains.INFO:
        return StorageApiKeys.INFO;
      case ApiDomains.MEMBERS:
        return StorageApiKeys.MEMBERS;
      default:
        throw new Error(`Unhandled domain: ${apiDomain}`);
    }
  }
}
