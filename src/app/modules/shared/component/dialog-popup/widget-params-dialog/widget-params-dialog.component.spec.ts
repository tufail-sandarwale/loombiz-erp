import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetParamsDialogComponent } from './widget-params-dialog.component';

describe('WidgetParamsDialogComponent', () => {
  let component: WidgetParamsDialogComponent;
  let fixture: ComponentFixture<WidgetParamsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetParamsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WidgetParamsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
