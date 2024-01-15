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
import { EcoApiConfig } from '../../types/interfaces/domains/eco.domain.interface';
import { CommonApiConfig } from '../../types/interfaces/domains/common.interface';
import { InfoApiConfig } from '../../types/interfaces/domains/info.domain.interface';
import { MembersApiConfig } from '../../types/interfaces/domains/membars.domian.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiDataManagerService {
  private dataCenter = new BehaviorSubject<any>({});

  constructor(
    private apiService: ApiHelperService,
    private storageHelperService: StorageHelperService) {
  }

  public initializeDataCenter(
    culture: string,
    domain: ApiDomains,
    storageKey: StorageApiKeys,
    temporalData: boolean = true,
    createStorage: boolean = true
  ): void {
    const fullUrl: string = `${environment.restServer}/${domain}`
    this.apiService.request<ApiDataManagerConfig>(HttpsRequests.GET, fullUrl, culture)
      .subscribe((res) => {
        const apiKeyObjDomain = this.mapToApiKeyObjDomain(domain);
        if (createStorage) {
          this.validateAndCreateStorage(temporalData, storageKey, this.mapAsDomainInterface(res[apiKeyObjDomain], domain))
        } else {
          this.dataCenter.next(this.mapAsDomainInterface(res[apiKeyObjDomain], domain));
        }
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
    this.dataCenter.next({});
  }

  private validateAndCreateStorage(temporalData: boolean, storageKey: StorageApiKeys, res: any) {
    const storageMethod = temporalData ? 'getSessionStorage' : 'getLocalStorage';
    const currentStorage = this.storageHelperService[storageMethod](storageKey);
    if (currentStorage && this.objAreEqual(currentStorage, res)) {
      this.dataCenter.next(res);
    } else {
      this.createStorage(temporalData, storageKey, res);
    }
  }

  private createStorage(temporalData: boolean, storageKey: StorageApiKeys, res: any) {
    const storageMethod = temporalData ? 'setSessionStorage' : 'setLocalStorage';
    this.storageHelperService[storageMethod](storageKey, res);
  }

  private mapAsDomainInterface(res: any, domain: ApiDomains): any {
    switch (domain) {
      case ApiDomains.BLOG:
        return res as BlogApiConfig;
      case ApiDomains.ECO:
        return res as EcoApiConfig;
      case ApiDomains.COMMON:
        return res as CommonApiConfig;
      case ApiDomains.INFO:
        return res as InfoApiConfig;
      case ApiDomains.MEMBERS:
        return res as MembersApiConfig;
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

  private objAreEqual(obj: any[], obj2: any[]): boolean {
    return JSON.stringify(obj) === JSON.stringify(obj2);
  }

}
