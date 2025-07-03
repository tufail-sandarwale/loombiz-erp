import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCheckingComponent } from './stock-checking.component';

describe('StockCheckingComponent', () => {
  let component: StockCheckingComponent;
  let fixture: ComponentFixture<StockCheckingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockCheckingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockCheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
