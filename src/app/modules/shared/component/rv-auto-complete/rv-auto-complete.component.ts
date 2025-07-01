import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedFormFmodules } from '../../modules/shared-form-modules';
import { SharedMaterialModules } from '../../modules/shared-material-modules';

@Component({
  selector: 'app-rv-auto-complete',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, SharedMaterialModules, SharedFormFmodules],
  templateUrl: './rv-auto-complete.component.html',
  styleUrl: './rv-auto-complete.component.scss'
})
export class RvAutoCompleteComponent implements OnInit, OnChanges {
  @Input() parentForm: FormGroup;
  @Input() formElement: any;
  @Output() udfSelected = new EventEmitter<any>();
  originalList: any[];
  filteredList: Observable<any[]>;
  constructor() { }

  ngOnInit(): void {
    this.originalList = this.formElement.options;
    this.handleValueChanges()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.originalList = this.formElement.options;
    this.handleValueChanges();
  }

  handleValueChanges() {
    this.filteredList = this.parentForm.controls[this.formElement.name].valueChanges.pipe(
      startWith(''),
      map(value => {
        let list = value ? this._filterList(value as string) : this.originalList.slice();
        if (!list || list.length == 0) {
          this.parentForm.controls[this.formElement.name].setValue(null);
        }
        return list;
      }),

    );
  }

  displayFormElement = (selectedElement) => {
    return selectedElement && selectedElement != "" ? this.originalList.find(o => o.key == selectedElement).value : null;
  }

  private _filterList(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.originalList.filter(option => (option?.key.toLowerCase().includes(filterValue) || option?.value.toLowerCase().includes(filterValue)));
  }

  optionSelected(event) {
    this.udfSelected.emit(event.option.value);
  }
}