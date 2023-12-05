import { Component } from '@angular/core';
import { ApiHelperService } from '../../../core/services/helpers/api-helper/api-helper.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-header-container',
  templateUrl: './templates/header-container.component.html',
  styleUrl: './templates/header-container.component.scss'
})
export class HeaderContainerComponent {
  data: any
  constructor(private api: ApiHelperService) {

  }

  ngOnInit(): void {
    this.api.request('GET', environment.strapiCms + environment.commonApi, environment.token)
      .subscribe(
        (response) => {
          this.data = response;
          console.log(this.data);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }
}
