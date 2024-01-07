import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpsRequests } from '../../../types/enums/validation_types.enum';
import { environment } from '../../../../../../environments/environment';
import { CultureService } from '../culture/culture.service';

@Injectable({
  providedIn: 'root',
})
export class ApiHelperService {
  constructor(private httpClient: HttpClient) { }

  request(
    method: HttpsRequests,
    url: string,
    lang: string,
    token: string = environment.token,
    content_type: string = 'application/json',
    body?: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': content_type,
      Authorization: token ? `Bearer ${token}` : '',
      'accept-language': lang,
    });

    const options: { headers: HttpHeaders; body?: any } = { headers };

    if (body) {
      options.body = body;
    }

    return this.httpClient.request(method, url, options);
  }

}

