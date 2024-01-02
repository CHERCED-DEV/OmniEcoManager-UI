import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CultureService } from '../culture.service';

@Injectable()
export class CultureResolver implements Resolve<void> {
    constructor(private cultureService: CultureService) { }

    resolve(route: ActivatedRouteSnapshot): void {
        console.log(route);
        const paramsFromUrl = route.params;
        const { lang } = paramsFromUrl
        /* if (lang && this.cultureService.cultures.includes(lang)) {
            this.cultureService.currentLang = lang;
        } else {
            this.cultureService.currentLang = 'en';
        } */
    }
}
