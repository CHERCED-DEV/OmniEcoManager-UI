import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CultureService {
  public cultures: string[] = ['es', 'en', 'fr'];
  private currentLangSubject = new BehaviorSubject<string>('');

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  cultureListener(): Observable<string> {
    return this.currentLangSubject.asObservable();
  }

  getLang(): string {
    return this.currentLangSubject.getValue();
  }

  setLang(lang: string): void {
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
