import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalePerformaceComponent } from './employee-sale-performace.component';

describe('EmployeeSalePerformaceComponent', () => {
  let component: EmployeeSalePerformaceComponent;
  let fixture: ComponentFixture<EmployeeSalePerformaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSalePerformaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeSalePerformaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
