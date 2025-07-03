import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RvChipAutoCompleteComponent } from './rv-chip-auto-complete.component';

describe('RvChipAutoCompleteComponent', () => {
  let component: RvChipAutoCompleteComponent;
  let fixture: ComponentFixture<RvChipAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RvChipAutoCompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RvChipAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
