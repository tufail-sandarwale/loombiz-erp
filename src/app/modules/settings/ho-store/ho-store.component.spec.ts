import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoStoreComponent } from './ho-store.component';

describe('HoStoreComponent', () => {
  let component: HoStoreComponent;
  let fixture: ComponentFixture<HoStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
