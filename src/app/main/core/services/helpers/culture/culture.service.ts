import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CultureService {
  private currentLangSubject = new Subject<string>();
  public currentLang$ = this.currentLangSubject.asObservable();
  public cultures: string[] = ['es', 'en', 'fr'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setLangFromUrl();
    });
  }

  createCulture() {
    if (this.getLang() === undefined) {
      this.setLang(this.cultures[1]);
    }
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
    }
  }
}
