import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGroupDialogComponent } from './account-group-dialog.component';

describe('AccountGroupDialogComponent', () => {
  let component: AccountGroupDialogComponent;
  let fixture: ComponentFixture<AccountGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountGroupDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
