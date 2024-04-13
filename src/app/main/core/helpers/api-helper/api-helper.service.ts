import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpsRequests } from '../../types/enums/helpers.enum';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiHelperService {
  constructor(private httpClient: HttpClient) { }

  request<T>(
    method: HttpsRequests,
    url: string,
    lang: string,
    token: string = environment.token,
    content_type: string = 'application/json',
    body?: any
  ): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': content_type,
      Authorization: token ? `Bearer ${token}` : '',
      'accept-language': lang,
    });

    const options: { headers: HttpHeaders; body?: any } = { headers };

    if (body) {
      options.body = body;
    }

    return this.httpClient.request<T>(method, url, options)
      .pipe(
        tap(response => console.log('Response:', response)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
