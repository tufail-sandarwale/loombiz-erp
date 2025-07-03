import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosAdditionalChargesDialogComponent } from './pos-additional-charges-dialog.component';

describe('PosAdditionalChargesDialogComponent', () => {
  let component: PosAdditionalChargesDialogComponent;
  let fixture: ComponentFixture<PosAdditionalChargesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosAdditionalChargesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PosAdditionalChargesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
