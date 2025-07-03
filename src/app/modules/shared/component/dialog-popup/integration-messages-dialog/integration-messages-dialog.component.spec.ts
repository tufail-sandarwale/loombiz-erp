import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationMessagesDialogComponent } from './integration-messages-dialog.component';

describe('IntegrationMessagesDialogComponent', () => {
  let component: IntegrationMessagesDialogComponent;
  let fixture: ComponentFixture<IntegrationMessagesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrationMessagesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntegrationMessagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
