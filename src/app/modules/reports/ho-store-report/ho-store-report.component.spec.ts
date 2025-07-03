import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoStoreReportComponent } from './ho-store-report.component';

describe('HoStoreReportComponent', () => {
  let component: HoStoreReportComponent;
  let fixture: ComponentFixture<HoStoreReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoStoreReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoStoreReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
