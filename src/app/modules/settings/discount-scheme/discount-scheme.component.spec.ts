import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountSchemeComponent } from './discount-scheme.component';

describe('DiscountSchemeComponent', () => {
  let component: DiscountSchemeComponent;
  let fixture: ComponentFixture<DiscountSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountSchemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscountSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
