import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSideTableViewComponent } from './client-side-table-view.component';

describe('ClientSideTableViewComponent', () => {
  let component: ClientSideTableViewComponent;
  let fixture: ComponentFixture<ClientSideTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSideTableViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientSideTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
