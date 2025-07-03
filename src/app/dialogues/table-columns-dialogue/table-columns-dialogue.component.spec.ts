import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnsDialogueComponent } from './table-columns-dialogue.component';

describe('TableColumnsDialogueComponent', () => {
  let component: TableColumnsDialogueComponent;
  let fixture: ComponentFixture<TableColumnsDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableColumnsDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableColumnsDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
