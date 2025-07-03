import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearEndProcessingComponent } from './year-end-processing.component';

describe('YearEndProcessingComponent', () => {
  let component: YearEndProcessingComponent;
  let fixture: ComponentFixture<YearEndProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearEndProcessingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YearEndProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
