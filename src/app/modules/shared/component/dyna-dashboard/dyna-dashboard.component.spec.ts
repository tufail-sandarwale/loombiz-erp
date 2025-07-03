import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynaDashboardComponent } from './dyna-dashboard.component';

describe('DynaDashboardComponent', () => {
  let component: DynaDashboardComponent;
  let fixture: ComponentFixture<DynaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynaDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
