import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountScheme2Component } from './discount-scheme-2.component';

describe('DiscountScheme2Component', () => {
  let component: DiscountScheme2Component;
  let fixture: ComponentFixture<DiscountScheme2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountScheme2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscountScheme2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
