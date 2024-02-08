import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiHelperService } from '../../helpers/api-helper/api-helper.service';
import { StorageHelperService } from '../../helpers/storage-helper/storage-helper.service';
import { ApiDomains, ApiKeyObjDomains } from '../../types/enums/domains.enum';
import { StorageApiKeys } from '../../types/enums/storage.keys.enum';
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

  constructor(
    private apiService: ApiHelperService,
    private storageHelper: StorageHelperService
  ) { }

  public initializeDataCenter(
    culture: string,
    domain: ApiDomains,
    storageKey: StorageApiKeys,
    temporalData: boolean = true,
    createStorage: boolean = true
  ): void {
    const fullUrl: string = `${environment.restServer}/${domain}`;
    const apiKeyObjDomain = this.mapToApiKeyObjDomain(domain);
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
            this.dataCenter.next(this.mapAsDomainInterface(apiKeyObjDomain, domain));
          }
        }
      );
  }

  public validateAndCreateStorage(
    temporalData: boolean,
    storageKey: StorageApiKeys,
    res: T
  ) {
    const storageMethod = temporalData ? 'getSessionStorage' : 'getLocalStorage';
    const currentStorage = this.storageHelper[storageMethod](storageKey);
    if (currentStorage === null || !this.objAreEqual(res, currentStorage)) {
      this.createStorage(temporalData, storageKey, res);
      this.dataCenter.next(res);
    } else {
      this.dataCenter.next(currentStorage);
    }
  }

  public getData(): BehaviorSubject<T> {
    return this.dataCenter;
  }

  public clearData(): void {
    this.dataCenter.next({} as T);
  }

  private createStorage(temporalData: boolean, storageKey: StorageApiKeys, res: T) {
    const storageMethod = temporalData ? 'setSessionStorage' : 'setLocalStorage';
    this.storageHelper[storageMethod](storageKey, res);
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

  private mapToApiKeyObjDomain(apiDomain: ApiDomains): ApiKeyObjDomains {
    switch (apiDomain) {
      case ApiDomains.BLOG:
        return ApiKeyObjDomains.BLOG;
      case ApiDomains.ECO:
        return ApiKeyObjDomains.ECO;
      case ApiDomains.COMMON:
        return ApiKeyObjDomains.COMMON;
      case ApiDomains.INFO:
        return ApiKeyObjDomains.INFO;
      case ApiDomains.MEMBERS:
        return ApiKeyObjDomains.MEMBERS;
      default:
        throw new Error(`Unhandled domain: ${apiDomain}`);
    }
  }

  private objAreEqual(obj: T, obj2: T): boolean {
    return JSON.stringify(obj) === JSON.stringify(obj2);
  }
}
