import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynaFormFieldsComponent } from './dyna-form-fields.component';

describe('DynaFormFieldsComponent', () => {
  let component: DynaFormFieldsComponent;
  let fixture: ComponentFixture<DynaFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynaFormFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynaFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
