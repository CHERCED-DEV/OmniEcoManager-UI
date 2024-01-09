import { Injectable } from '@angular/core';
import {
  LocalStorageService,
  SessionStorageService
} from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class StorageHelperService {
  constructor(
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) { }

  // tslint:disable-next-line: no-any
  public setLocalStorage(key: string, value: any, timeout: number = 0) {
    if (value != null) {
      this.localStorageService.set(key, value, timeout, 't');
    }
  }

  public getLocalStorage(key: string) {
    return this.localStorageService.get(key);
  }

  public removeAllLocalStorage() {
    this.localStorageService.clear();
  }

  public removeLocalStorage(key: string) {
    this.localStorageService.remove(key);
  }
  public cleanLocalStorage() {
    this.localStorageService.clear();
  }

  // tslint:disable-next-line: no-any
  public setSessionStorage(key: string, value: any, timeout: number = 0) {
    if (value != null) {
      this.sessionStorageService.set(key, value, timeout, 't');
    }
  }

  public getSessionStorage(key: string) {
    return this.sessionStorageService.get(key);
  }

  public removeSessionStorage(key: string) {
    this.sessionStorageService.remove(key);
  }

  public removeAllSessionStorage() {
    this.sessionStorageService.clear();
  }

  public cleanSessionStorage() {
    this.sessionStorageService.clear();
  }
}
