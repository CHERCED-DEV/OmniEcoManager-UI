import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CultureService {
  private currentLang: string = 'en';
  public cultures: string[] = ['es', 'en', 'fr'];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  getLang(): string {
    return this.currentLang;
  }

  setLang(lang: string): void {
    this.currentLang = lang;

    // Construye el dominio con la cultura y navega a la nueva URL
    const url = this.router.createUrlTree([], {
      relativeTo: this.activatedRoute,
      queryParams: { lang: this.currentLang },
      queryParamsHandling: 'merge'
    }).toString();

    this.router.navigateByUrl(url, { replaceUrl: true });
  }

  setLangFromUrl(): void {
    const langFromUrl = this.activatedRoute.snapshot.paramMap.get('lang');
    if (langFromUrl && this.cultures.includes(langFromUrl)) {
      this.currentLang = langFromUrl;
    }
  }
}
