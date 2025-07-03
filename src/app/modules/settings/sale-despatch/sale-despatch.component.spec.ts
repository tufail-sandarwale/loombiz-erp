import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDespatchComponent } from './sale-despatch.component';

describe('SaleDespatchComponent', () => {
  let component: SaleDespatchComponent;
  let fixture: ComponentFixture<SaleDespatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleDespatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleDespatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
