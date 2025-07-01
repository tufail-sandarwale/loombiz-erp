import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RvChipsComponent } from './rv-chips.component';

describe('RvChipsComponent', () => {
  let component: RvChipsComponent;
  let fixture: ComponentFixture<RvChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RvChipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RvChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
