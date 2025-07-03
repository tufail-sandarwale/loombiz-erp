import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettyCashBookComponent } from './petty-cash-book.component';

describe('PettyCashBookComponent', () => {
  let component: PettyCashBookComponent;
  let fixture: ComponentFixture<PettyCashBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PettyCashBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PettyCashBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
