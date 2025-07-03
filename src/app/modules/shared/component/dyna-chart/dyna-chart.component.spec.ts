import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynaChartComponent } from './dyna-chart.component';

describe('DynaChartComponent', () => {
  let component: DynaChartComponent;
  let fixture: ComponentFixture<DynaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynaChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
