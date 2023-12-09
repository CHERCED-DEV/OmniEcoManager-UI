import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './main/common/layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { CommonService } from './main/core/services/server/common/common.service';
import { HeaderConfig, FooterConfig, StarterConfig } from './main/core/types/interfaces/common.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    SharedModule],
  providers: [CommonService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public header: HeaderConfig;
  public footer: FooterConfig;
  public starter: StarterConfig;

  constructor(
    private commonService: CommonService
  ) {
    this.starter = this.commonService.layout.starter;
    this.header = this.commonService.layout.header;
    this.footer = this.commonService.layout.footer;
  }
}
