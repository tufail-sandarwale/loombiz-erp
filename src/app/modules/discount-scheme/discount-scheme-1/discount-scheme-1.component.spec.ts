import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountScheme1Component } from './discount-scheme-1.component';

describe('DiscountScheme1Component', () => {
  let component: DiscountScheme1Component;
  let fixture: ComponentFixture<DiscountScheme1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountScheme1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscountScheme1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
