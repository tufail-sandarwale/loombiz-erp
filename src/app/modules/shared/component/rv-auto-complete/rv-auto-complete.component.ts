import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  @Input() fixedValue = false;
  @Output() valueSelected = new EventEmitter<any>();
  @Input() disableAttr: false;
  @Input() clearInputAfterSelect: false;
  @Input() advanceSearch = false;
  @Input() showAddNewOption = false;
  @Input() showAllOptionsOnClick = true;
  @Input() updatedDate = null;
  originalList: any[];
  filteredList: Observable<any[]>;
  showAddOption = false;
  searchKeys = [];
  constructor() { }

  hasCustomerCategory = false;

  ngOnInit(): void {

    this.originalList = this.formElement.options;
    this.searchKeys = this.formElement.searchKeys;
    if (this.fixedValue) {
      const currentValidators = this.parentForm.get(this.formElement.name).validator ? [this.parentForm.get(this.formElement.name).validator] : [];
      this.parentForm.get(this.formElement.name)?.setValidators([...currentValidators, this.validateOption()]);
    }
    this.handleValueChanges()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.originalList = this.formElement.options;
    this.handleValueChanges();
  }

  handleValueChanges() {

    const control = this.parentForm.get(this.formElement.name); // ✅ works with dot notation

  if (!control) {
    console.warn(`Form control '${this.formElement.name}' is undefined`);
    return;
  }
   
    this.filteredList = this.parentForm.controls[this.formElement.name].valueChanges.pipe(
      startWith(''),
      map(value => {
        let list = value && value.length > 0 ? this._filterList(value as string) : (this.showAllOptionsOnClick ? this.originalList.slice() : []);
        this.showAddOption = value && value.length > 0 && this.showAddNewOption && list.length == 0;
        return list;
      }),

    );
  }

  displayFormElement = (selectedElement) => {
    return selectedElement && selectedElement != "" ? this.originalList.find(o => o.key == selectedElement)?.value : '';
  }

  private _filterList(value: string): any[] {
    const filterValues = value.toLowerCase().split(' '); // Split by spaces
  
    return this.originalList.filter(option => {
      return filterValues.every(fv => {
        const key = option?.key?.toLowerCase();
        const value = option?.value?.toLowerCase();
        let searchKey = '';
  
        if (this.searchKeys && this.searchKeys.length > 0) {
          searchKey = this.searchKeys.find(sk => sk.key === option?.key)?.value?.toLowerCase() || '';
        }
  
        return (
          key.includes(fv) ||
          value.includes(fv) ||
          searchKey?.includes(fv)
        );
      });
    });
  }
  optionSelected(event) {
    if (event.option.value) {
      this.valueSelected.emit(event.option.value);
      console.log("added val: ", event.option.value)
    }
    if (this.clearInputAfterSelect) {
      this.parentForm.get(this.formElement.name).setValue(null);
    }
  }

  showAllList() {
    this.originalList = this.formElement.options;
    this.handleValueChanges();
  }

  validateOption(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value || value == "") {
        return null;
      }
      const validOption = this.formElement.options.map(option => option.key).find(option => option.toLowerCase() === value?.toLowerCase());
      return validOption ? null : { 'invalidOption': { value: control.value } };
    };
  }

  addNewOption() {
    this.valueSelected.emit(this.formElement.addNewLable);
  }

  onEnterKey(event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value;
    let flist = this._filterList(inputValue);
    if (inputValue && flist.length == 1) {
      console.log('Valid option entered:', inputValue);
      this.valueSelected.emit(flist[0].key);
      console.log("added val: ", flist[0].key)
      this.parentForm.get(this.formElement.name).setValue(null);
    } else {
      console.log('No match found. User typed:', inputValue);
      this.parentForm.get(this.formElement.name).setValue(null);
    }
  }
}
