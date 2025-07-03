import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdfListComponent } from './udf-list.component';

describe('UdfListComponent', () => {
  let component: UdfListComponent;
  let fixture: ComponentFixture<UdfListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UdfListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UdfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
