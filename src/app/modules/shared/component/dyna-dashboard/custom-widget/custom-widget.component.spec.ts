import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomWidgetComponent } from './custom-widget.component';

describe('CustomWidgetComponent', () => {
  let component: CustomWidgetComponent;
  let fixture: ComponentFixture<CustomWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
