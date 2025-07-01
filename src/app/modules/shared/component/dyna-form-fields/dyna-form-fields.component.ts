import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModules } from "../../modules/shared-material-modules";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dyna-form-fields',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules],
  templateUrl: './dyna-form-fields.component.html',
  styleUrl: './dyna-form-fields.component.scss'
})
export class DynaFormFieldsComponent implements OnInit, OnChanges {
  @Input() formGroup: FormGroup;
  @Input() formConfigJson: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formConfigJson']) {
      this.buildForm();
    }
  }

  buildForm() {
    this.formConfigJson.forEach(config => {
      let validators = config.mandatoy === 'true' ? [Validators.required] : [];
      if (!this.formGroup.get(config.labelName.trim())) {
        this.formGroup.addControl(config.labelName.trim(), this.fb.control(config.defauleValue || '', validators));
      }
    });
  }

  isTextBox(controlName: string): boolean {
    return this.formConfigJson.find(c => c.labelName.trim() === controlName)?.labelType === 'textbox';
  }
  
  isDropDown(controlName: string): boolean {
    return this.formConfigJson.find(c => c.labelName.trim() === controlName)?.labelType === 'dropdown';
  }
  
  showLabel(controlName: string): boolean {
    return this.formConfigJson.find(c => c.labelName.trim() === controlName)?.showLabel === 'true';
  }
  
  getOptions(controlName: string): string[] {
    return this.formConfigJson.find(c => c.labelName.trim() === controlName)?.optionaValue.split(',') || [];
  }
  
  getFormControls(): string[] {
    return Object.keys(this.formGroup.controls);
  }
}