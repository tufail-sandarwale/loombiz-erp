import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountScheme3Component } from './discount-scheme-3.component';

describe('DiscountScheme3Component', () => {
  let component: DiscountScheme3Component;
  let fixture: ComponentFixture<DiscountScheme3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountScheme3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscountScheme3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
