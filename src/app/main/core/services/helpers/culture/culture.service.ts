import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CultureService {
  public cultures: string[] = ['es', 'en', 'fr'];
  private currentLangSubject = new BehaviorSubject<string>('en');
  public currentLang$ = this.currentLangSubject.asObservable();
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  getLang(): Observable<string> {
    return this.currentLang$;
  }

  setLang(lang: string): void {
    this.currentLangSubject.next(lang);
    this.router.navigate([lang], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge'
    });
  }

  setLangFromUrl(): void {
    const langFromUrl = this.activatedRoute.snapshot.paramMap.get('lang');
    if (langFromUrl && this.cultures.includes(langFromUrl)) {
      this.currentLangSubject.next(langFromUrl);
    } else {
      let currentLang: string = '';
      this.currentLangSubject.subscribe((lang) => {
        currentLang = lang
      });
      if(currentLang !== '') {
        this.setLang(currentLang);
      }
    }
  }
}
