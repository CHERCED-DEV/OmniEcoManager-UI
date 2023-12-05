import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFooterNavComponent } from './main-footer-nav.component';

describe('MainFooterNavComponent', () => {
  let component: MainFooterNavComponent;
  let fixture: ComponentFixture<MainFooterNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainFooterNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainFooterNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
