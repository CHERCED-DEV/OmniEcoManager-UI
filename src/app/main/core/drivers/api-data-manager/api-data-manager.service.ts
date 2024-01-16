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

@Injectable({
  providedIn: 'root'
})
export class ApiDataManagerService {
  private dataCenters: { [key in ApiDomains]?: BehaviorSubject<unknown> } = {};

  constructor(
    private apiService: ApiHelperService,
    private storageHelper: StorageHelperService) {
  }

  public initializeDataCenter(
    culture: string,
    domain: ApiDomains,
    storageKey: StorageApiKeys,
    temporalData: boolean = true,
    createStorage: boolean = true
  ): void {
    const fullUrl: string = `${environment.restServer}/${domain}`;
    const apiKeyObjDomain = this.mapToApiKeyObjDomain(domain)
    this.apiService.request<ApiDataManagerConfig>(HttpsRequests.GET, fullUrl, culture).subscribe(
      (res) => {
        const dataCenter = this.getDataCenter(domain);
        if (createStorage) {
          this.validateAndCreateStorage(temporalData, storageKey, this.mapAsDomainInterface(res[apiKeyObjDomain], domain), dataCenter);
        } else {
          dataCenter.next(this.mapAsDomainInterface(apiKeyObjDomain, domain));
        }
      },
      (error) => {
        console.error('Error initializing data center:', error);
      }
    );
  }

  public getData(domain: ApiDomains,): BehaviorSubject<unknown> | undefined {
    const dataCenter = this.getDataCenter(domain);
    return dataCenter as BehaviorSubject<unknown> | undefined;
  }

  public clearData(): void {
    Object.keys(this.dataCenters).forEach((key) => {
      const domainKey = key as ApiDomains;
      this.dataCenters[domainKey]!.next({});
    });
  }

  private getDataCenter(domain: ApiDomains): BehaviorSubject<unknown> {
    if (!this.dataCenters[domain]) {
      this.dataCenters[domain] = new BehaviorSubject<unknown>({});
    }
    return this.dataCenters[domain]!;
  }

  private validateAndCreateStorage(temporalData: boolean, storageKey: StorageApiKeys, res: any, dataCenter: BehaviorSubject<unknown>) {
    const storageMethod = temporalData ? 'getSessionStorage' : 'getLocalStorage';
    const currentStorage = this.storageHelper[storageMethod](storageKey);
    if (currentStorage && this.objAreEqual(currentStorage, res)) {
      dataCenter.next(res);
    } else {
      this.createStorage(temporalData, storageKey, res);
    }
  }

  private createStorage(temporalData: boolean, storageKey: StorageApiKeys, res: unknown) {
    const storageMethod = temporalData ? 'setSessionStorage' : 'setLocalStorage';
    this.storageHelper[storageMethod](storageKey, res);
  }

  private mapAsDomainInterface(res: any, domain: ApiDomains): unknown {
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
