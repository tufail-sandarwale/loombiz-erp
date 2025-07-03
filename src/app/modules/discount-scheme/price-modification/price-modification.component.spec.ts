import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceModificationComponent } from './price-modification.component';

describe('PriceModificationComponent', () => {
  let component: PriceModificationComponent;
  let fixture: ComponentFixture<PriceModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceModificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriceModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
