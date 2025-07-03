import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayEndComponent } from './day-end.component';

describe('DayEndComponent', () => {
  let component: DayEndComponent;
  let fixture: ComponentFixture<DayEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayEndComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
