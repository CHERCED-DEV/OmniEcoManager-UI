export interface MembersApiConfig {

}

/* 
@Injectable()
export class ApiDataManagerService {
  private dataCenters: { [key in ApiDomains]?: BehaviorSubject<any> } = {};

  constructor(private apiService: ApiHelperService, private storageHelperService: StorageHelperService) {}

  private getDataCenter(domain: ApiDomains): BehaviorSubject<any> {
    if (!this.dataCenters[domain]) {
      this.dataCenters[domain] = new BehaviorSubject<any>({});
    }
    return new BehaviorSubject<any>(this.dataCenters[domain]!.getValue());
  }

  public initializeDataCenter(
    culture: string,
    domain: ApiDomains,
    storageKey: StorageApiKeys,
    temporalData: boolean = true,
    createStorage: boolean = true
  ): void {
    const fullUrl: string = `${environment.restServer}/${domain}`;
    this.apiService.request<ApiDataManagerConfig>(HttpsRequests.GET, fullUrl, culture).subscribe(
      (res) => {
        const dataCenter = this.getDataCenter(domain);

        if (createStorage) {
          this.validateAndCreateStorage(temporalData, storageKey, this.mapAsDomainInterface(res[domain], domain), dataCenter);
        } else {
          dataCenter.next(this.mapAsDomainInterface(res[domain], domain));
        }
      },
      (error) => {
        console.error('Error initializing data center:', error);
      }
    );
  }

  // Resto de tu código...
} */