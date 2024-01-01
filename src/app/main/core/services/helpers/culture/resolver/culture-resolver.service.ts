import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CultureService } from '../culture.service';

@Injectable()
export class CultureResolver implements Resolve<void> {
    constructor(private cultureService: CultureService) { }

    resolve(): void {
        this.cultureService.setLangFromUrl();
        return;
    }
}
