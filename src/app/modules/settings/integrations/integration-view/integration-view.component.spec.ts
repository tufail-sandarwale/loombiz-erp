import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationViewComponent } from './integration-view.component';

describe('IntegrationViewComponent', () => {
  let component: IntegrationViewComponent;
  let fixture: ComponentFixture<IntegrationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrationViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntegrationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
