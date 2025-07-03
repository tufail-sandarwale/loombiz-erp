import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdfDetailsComponent } from './udf-details.component';

describe('UdfDetailsComponent', () => {
  let component: UdfDetailsComponent;
  let fixture: ComponentFixture<UdfDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UdfDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UdfDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
