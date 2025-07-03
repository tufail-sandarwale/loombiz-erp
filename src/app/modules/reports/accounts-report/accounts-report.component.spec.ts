import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsReportComponent } from './accounts-report.component';

describe('AccountsReportComponent', () => {
  let component: AccountsReportComponent;
  let fixture: ComponentFixture<AccountsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
