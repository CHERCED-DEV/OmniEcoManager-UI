import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiHelperService } from '../../helpers/api-helper/api-helper.service';
import { StorageHelperService } from '../../helpers/storage-helper/storage-helper.service';
import { ApiDomains } from '../../types/enums/domains.enum';
import { GenericCultureNode, StorageApiKeys } from '../../types/enums/storage.keys.enum';
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
  private localStorage: Array<{ key: StorageApiKeys, value: T }> = [];
  private sessionStorage: Array<{ key: StorageApiKeys, value: T }> = [];

  constructor(
    private apiService: ApiHelperService,
    private storageHelper: StorageHelperService
  ) {
    this.storageValidator();
  }

  public initializeDataCenter(
    culture: string,
    domain: ApiDomains,
    storageKey: StorageApiKeys,
    temporalData: boolean = true,
    createStorage: boolean = true
  ): void {
    const fullUrl: string = `${environment.restServer}/${domain}`;
    const apiKeyObjDomain = this.mapToApiKeyObjDomain(domain);
    if (this.storageHasValueForKey(temporalData, storageKey)) {
      const storageMethod = temporalData ? 'getSessionStorage' : 'getLocalStorage';
      const currentStorage = this.storageHelper[storageMethod](storageKey);
      this.dataCenter.next(this.mapAsDomainInterface(currentStorage, domain));
    } else {
      this.apiService
      .request<ApiDataManagerConfig>(HttpsRequests.GET, fullUrl, culture)
      .subscribe(
        (res) => {
          if (createStorage) {
            this.validateAndCreateStorage(
              temporalData,
              storageKey,
              this.mapAsDomainInterface(res[apiKeyObjDomain], domain)
            );
          } else {
            this.dataCenter.next(this.mapAsDomainInterface(res[apiKeyObjDomain], domain));
          }
        }
      );
    }    
  }

  public validateAndCreateStorage(
    temporalData: boolean,
    storageKey: StorageApiKeys,
    res: T
  ) {

    if (currentStorage === null || !this.objAreEqual(res, currentStorage)) {
      this.createStorage(temporalData, storageKey, res);
      this.dataCenter.next(res);
    } else {
      this.dataCenter.next(currentStorage);
    }
  }

  private createStorage(temporalData: boolean, storageKey: StorageApiKeys, res: T) {
    const storageMethod = temporalData ? 'setSessionStorage' : 'setLocalStorage';
    this.storageHelper[storageMethod](storageKey, res);
  }

  public createCultureNode<T>(culture: string, res: T): GenericCultureNode<T> {
    const cultureNode: GenericCultureNode<T> = {};
    cultureNode[culture] = res;
    return cultureNode;
  }

  private storageHasValueForKey(
    temporalData: boolean,
    storageKey: StorageApiKeys,
  ): any {
    if (temporalData) {
      const sessionItem = this.sessionStorage.find(item => item.key === storageKey);
      return sessionItem
    } else {
      const localItem = this.localStorage.find(item => item.key === storageKey);
      return localItem
    }
  }

  private storageValidator(): void {
    const storageKeys: StorageApiKeys[] = Object.values(StorageApiKeys);
    storageKeys.forEach((key) => {
      const localRes = this.storageHelper.getLocalStorage(key);
      const sessionRes = this.storageHelper.getSessionStorage(key);
      this.localStorage.push({ key, value: localRes });
      this.sessionStorage.push({ key, value: sessionRes });
    })
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

  private objAreEqual(obj: T, obj2: T): boolean {
    return JSON.stringify(obj) === JSON.stringify(obj2);
  }
}
