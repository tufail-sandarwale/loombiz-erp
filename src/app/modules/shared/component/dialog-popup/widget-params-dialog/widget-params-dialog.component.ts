import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-widget-params-dialog',
  standalone: true,
  templateUrl: './widget-params-dialog.component.html',
  styleUrl: './widget-params-dialog.component.scss',
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules]
})
export class WidgetParamsDialogComponent {
  form: FormGroup;
  parameters: any[];

  constructor(
    private dialogRef: MatDialogRef<WidgetParamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.parameters = data.parameters;
    this.initForm();
  }

  private initForm() {
    const group = {};
    this.parameters.forEach(param => {
      group[param.code] = [param.value];
    });
    this.form = this.fb.group(group);
  }

  onSave() {
    if (this.form.valid) {
      const updatedParams = this.parameters.map(param => ({
        ...param,
        value: this.form.get(param.code).value
      }));
      this.dialogRef.close(updatedParams);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}