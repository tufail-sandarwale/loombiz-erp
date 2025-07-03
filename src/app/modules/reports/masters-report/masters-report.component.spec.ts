import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersReportComponent } from './masters-report.component';

describe('MastersReportComponent', () => {
  let component: MastersReportComponent;
  let fixture: ComponentFixture<MastersReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MastersReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MastersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
