import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationMessagesComponent } from './integration-messages.component';

describe('IntegrationMessagesComponent', () => {
  let component: IntegrationMessagesComponent;
  let fixture: ComponentFixture<IntegrationMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrationMessagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntegrationMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
