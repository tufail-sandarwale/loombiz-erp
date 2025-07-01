import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
}

interface DialogData {
  type: 'product' | 'category';
  fields: Field[];
  title: string;
}

@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule],
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {
  dialogForm: FormGroup;
  title: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    const group: any = {};

    this.data.fields.forEach(field => {
      group[field.name] = ['', Validators.required];
    });

    this.dialogForm = this.fb.group(group);

    // Debugging: Log the initial form controls
    console.log('Initial Form Controls:', this.dialogForm.controls);
  }

  onSubmit(): void {
    if (this.dialogForm.valid) {
      console.log('Form Values:', this.dialogForm.value); // Log form values to the console
      this.dialogRef.close(this.dialogForm.value);
    } else {
      // Mark all controls as touched to display validation messages
      Object.keys(this.dialogForm.controls).forEach(field => {
        const control = this.dialogForm.get(field);
        control?.markAsTouched({ onlySelf: true });

        // Debugging: Log the control state
        console.log(`Control ${field} state:`, {
          value: control?.value,
          valid: control?.valid,
          touched: control?.touched,
          dirty: control?.dirty
        });
      });
      console.log('Form Invalid');
    }
  }
}
