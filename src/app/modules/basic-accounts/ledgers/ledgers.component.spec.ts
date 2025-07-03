import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgersComponent } from './ledgers.component';

describe('LedgersComponent', () => {
  let component: LedgersComponent;
  let fixture: ComponentFixture<LedgersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LedgersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
