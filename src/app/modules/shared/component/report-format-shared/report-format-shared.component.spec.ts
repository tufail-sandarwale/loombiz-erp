import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFormatSharedComponent } from './report-format-shared.component';

describe('ReportFormatSharedComponent', () => {
  let component: ReportFormatSharedComponent;
  let fixture: ComponentFixture<ReportFormatSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportFormatSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportFormatSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
