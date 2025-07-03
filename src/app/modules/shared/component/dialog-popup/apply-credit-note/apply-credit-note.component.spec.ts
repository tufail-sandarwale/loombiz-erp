import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCreditNoteComponent } from './apply-credit-note.component';

describe('ApplyCreditNoteComponent', () => {
  let component: ApplyCreditNoteComponent;
  let fixture: ComponentFixture<ApplyCreditNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyCreditNoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplyCreditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
