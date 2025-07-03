import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RvChipsWithoutFormComponent } from './rv-chips-without-form.component';

describe('RvChipsWithoutFormComponent', () => {
  let component: RvChipsWithoutFormComponent;
  let fixture: ComponentFixture<RvChipsWithoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RvChipsWithoutFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RvChipsWithoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
