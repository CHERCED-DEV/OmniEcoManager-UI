// language.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translate: TranslateService, private router: Router, private route: ActivatedRoute) {
    this.initLanguage();

    // Observar cambios en la ruta para actualizar el idioma
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateLanguage();
    });
  }

  private initLanguage() {
    // Configurar el servicio con los idiomas disponibles
    this.translate.addLangs(['en', 'es', 'fr']);
    
    // Establecer el idioma por defecto
    this.translate.setDefaultLang('en');

    // Detectar el idioma actual de la ruta o establecer uno por defecto
    const browserLang = this.getLanguageFromUrl();
    this.translate.use(browserLang.match(/en|es|fr/) ? browserLang : 'en');
  }

  private updateLanguage() {
    const lang = this.getLanguageFromUrl();
    if (lang && this.translate.getLangs().includes(lang)) {
      this.translate.use(lang);
    }
  }

  private getLanguageFromUrl(): string {
    const segments = this.route.snapshot.url.map(segment => segment.path);
    return segments.length > 0 ? segments[0] : 'es';
  }
}
