import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiPayDialogComponent } from './multi-pay-dialog.component';

describe('MultiPayDialogComponent', () => {
  let component: MultiPayDialogComponent;
  let fixture: ComponentFixture<MultiPayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiPayDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiPayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
