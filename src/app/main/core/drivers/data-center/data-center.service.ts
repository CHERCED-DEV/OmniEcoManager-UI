import { Injectable } from '@angular/core';
import { ApiHelperService } from '../../helpers/api-helper/api-helper.service';
import { StorageHelperService } from '../../helpers/storage-helper/storage-helper.service';
import { CultureService } from '../../services/culture/culture.service';

@Injectable()
export class DataCenterService {

  constructor(
    private apiService: ApiHelperService,
    private storageHelperService: StorageHelperService,
    private cultureService: CultureService) {
      this.cultureService.cultureListener().subscribe((culture) => {
        
      })
    }

}
