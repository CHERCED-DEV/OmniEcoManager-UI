import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageHelperService } from '../storage-helper/storage-helper.service';
import { StorageServiceKey } from '../../../types/enums/storage.keys';
import { CultureSessionConfig } from '../../../types/interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class CultureService {
  public cultures: string[] = ['es', 'en', 'fr'];
  private currentLangSubject = new BehaviorSubject<string>('');
  private cultureStorage: CultureSessionConfig;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storageHelperService: StorageHelperService) {
    this.cultureStorage = this.storageHelperService.getSessionStorage(StorageServiceKey.CULTURE);
    this.cultureListener().subscribe((culture) => {
      if (culture !== '') {
        const options: CultureSessionConfig = {
          value: culture,
          init: true
        }
        this.storageHelperService.setSessionStorage(StorageServiceKey.CULTURE, options);
      } else {
        this.setLang(this.cultureStorage.value)
      }
    })
  }

  cultureListener(): Observable<string> {
    return this.currentLangSubject.asObservable();
  }

  getLang(): string {
    return this.currentLangSubject.getValue();
  }

  private setLang(lang: string): void {
    this.currentLangSubject.next(lang);
  }

  updateLang(lang: string) {
    const currentUrl = this.router.url; // Obtiene la URL actual
    const currentLang = this.getLang();
    const newUrl = currentUrl.replace(`/${currentLang}`, `/${lang}`);
    this.setLang(lang);
    this.router.navigate([newUrl], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge'
    });
  }

}
