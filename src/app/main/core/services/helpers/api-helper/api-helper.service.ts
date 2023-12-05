import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiHelperService {
  constructor(private httpClient: HttpClient) { }

  request(
    method: string,
    url: string,
    token: string | null = null,
    content_type: string = 'application/json',
    body?: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': content_type,
      Authorization: token ? `Bearer ${token}` : '',
    });
  
    const options: { headers: HttpHeaders; body?: any } = { headers };
  
    if (body) {
      options.body = body;
    }
  
    return this.httpClient.request(method, url, options);
  }
  
}

