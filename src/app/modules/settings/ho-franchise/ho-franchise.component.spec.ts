import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoFranchiseComponent } from './ho-franchise.component';

describe('HoFranchiseComponent', () => {
  let component: HoFranchiseComponent;
  let fixture: ComponentFixture<HoFranchiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoFranchiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoFranchiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
