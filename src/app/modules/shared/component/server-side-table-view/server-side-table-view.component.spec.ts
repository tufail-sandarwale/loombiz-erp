import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerSideTableViewComponent } from './server-side-table-view.component';

describe('ServerSideTableViewComponent', () => {
  let component: ServerSideTableViewComponent;
  let fixture: ComponentFixture<ServerSideTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerSideTableViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServerSideTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
