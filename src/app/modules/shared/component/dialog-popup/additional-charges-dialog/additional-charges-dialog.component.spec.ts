import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalChargesDialogComponent } from './additional-charges-dialog.component';

describe('AdditionalChargesDialogComponent', () => {
  let component: AdditionalChargesDialogComponent;
  let fixture: ComponentFixture<AdditionalChargesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalChargesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionalChargesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
