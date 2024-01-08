import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CultureService } from '../culture.service';
import { AviableCulturesConfig } from '../../../../types/enums/cultures.enum';

@Injectable()
export class CultureResolver implements Resolve<void> {
    constructor(private cultureService: CultureService) { }

    resolve(route: ActivatedRouteSnapshot): void {
        const paramsFromUrl = route.params;
        const { lang } = paramsFromUrl
        if (lang) {
            this.cultureService.updateLang(lang);
        } else {
            this.cultureService.cultureListener().subscribe((lang: string) => {
                this.cultureService.updateLang(lang as AviableCulturesConfig);
            })
        }
    }
}
