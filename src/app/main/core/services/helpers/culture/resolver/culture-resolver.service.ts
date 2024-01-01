import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CultureService } from '../culture.service';

@Injectable()
export class CultureResolver implements Resolve<void> {
    constructor(private cultureService: CultureService) { }

    resolve(route: ActivatedRouteSnapshot): void {
        const langFromUrl = route.paramMap.get('lang');

        if (langFromUrl && this.cultureService.cultures.includes(langFromUrl)) {
            this.cultureService.currentLang = langFromUrl;
        } else {
            this.cultureService.currentLang = 'en';
        }
    }
}
