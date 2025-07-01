import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RvAutoCompleteComponent } from './rv-auto-complete.component';

describe('RvAutoCompleteComponent', () => {
  let component: RvAutoCompleteComponent;
  let fixture: ComponentFixture<RvAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RvAutoCompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RvAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
