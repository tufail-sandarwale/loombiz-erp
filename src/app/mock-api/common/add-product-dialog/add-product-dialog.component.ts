import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { ProductCategoryService } from '../product-category.service';
import { AlertsService } from 'app/core/services/alerts.service';
import { Router } from '@angular/router';

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
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productCategoryService: ProductCategoryService,
    private alertService: AlertsService,
    private router: Router,
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
      console.log('before closing dialog',this.dialogForm.value);
      this.dialogRef.close(this.dialogForm.value);
      console.log('AFTER closing dialog',this.dialogForm.value);

    } else {
      Object.keys(this.dialogForm.controls).forEach(field => {
        const control = this.dialogForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      console.log('Form Invalid');
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
  
}
