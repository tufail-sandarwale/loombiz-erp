import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFormFmodules } from '../../modules/shared-form-modules';
import { SharedMaterialModules } from '../../modules/shared-material-modules';
import { MatFormFieldModule } from '@angular/material/form-field';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-rv-chip-auto-complete',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, SharedMaterialModules, SharedFormFmodules],
  templateUrl: './rv-chip-auto-complete.component.html',
  styleUrl: './rv-chip-auto-complete.component.scss'
})
export class RvChipAutoCompleteComponent implements OnInit {
  @ViewChild('chipInput', { static: false }) chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('selectedOptAuto', { static: false }) matAutocomplete: MatAutocomplete;

  @Input() parentForm: FormGroup;
  @Input() formElement: any;
  @Input() fixedOptionValues: string[] = [];
  @Output() chipEvent = new EventEmitter<any>();
  tags: string[] = [];
  addOnBlur = true;
  filteredOptions: Observable<string[]>;
  chipsInputCtrl = new FormControl;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  announcer = inject(LiveAnnouncer);
  orignalOptions: string[] = [];
  ngOnInit(): void {
    this.orignalOptions = this.fixedOptionValues;
    if (this.formElement.options) {
      this.tags = this.formElement.options;
    }
    this.handleValueChanges();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && value != "" && this.orignalOptions.includes(value)) {
      this.tags.push(value);
      this.parentForm.controls[this.formElement.name].setValue(this.tags);
      this.chipEvent.emit(value);
    }
    this.chipsInputCtrl.setValue(null);
    event.chipInput!.clear();
    // Clear the input value
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag}`);
      this.parentForm.controls[this.formElement.name].setValue(this.tags);
      this.chipEvent.emit(tag);
      this.fixedOptionValues = this.orignalOptions.filter(item => !this.tags.includes(item));
      this.handleValueChanges();
    }
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    event.option.deselect();
    this.chipInput.nativeElement.value = '';
    this.chipsInputCtrl.setValue(null);
    this.tags.push(event.option.viewValue);
    this.parentForm.controls[this.formElement.name].setValue(this.tags);
    this.chipEvent.emit(event.option.viewValue);
    this.fixedOptionValues = this.orignalOptions.filter(item => !this.tags.includes(item));
    this.handleValueChanges();
  }

  private _filterOptions(value: string): string[] {
    const filterValue = value.toString().toLowerCase();
    return this.fixedOptionValues.filter(option => option.toLowerCase().includes(filterValue));
  }

  handleValueChanges() {
    this.filteredOptions = this.chipsInputCtrl.valueChanges.pipe(
      startWith(null),
      map((chip: string | null) => {
        let filterValues = chip ? this._filterOptions(chip) : this.fixedOptionValues.slice();
        return filterValues;
      })
    );
  }
}
