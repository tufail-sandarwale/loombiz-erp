import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { AlertsService } from 'app/core/services/alerts.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/** Interface for form fields */
interface Field {
  name: string;
  label: string;
  type: 'input' | 'select';
  placeholder?: string;
  validators?: any[];
  options?: { key: string; value: string }[];
  selected?: string;
}

/** Interface for dialog data */
interface DialogData {
  type: 'sms' | 'whatsapp' | 'email';
  fields: Field[];
  title: string;
  message?: string;
  record?: any;
}

@Component({
  selector: 'app-notification-dialog',
  standalone: true,
  imports: [
    CommonModule,
    SharedMaterialModules,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './notification-dialog.component.html',
  styleUrl: './notification-dialog.component.scss'
})
export class NotificationDialogComponent implements OnInit {
  dialogForm!: FormGroup;
  selectedType!: string;
  message!: string;
  title!: string;
  fields: Field[] = [];

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef, // Helps detect UI changes
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    console.log("🟢 Dialog Data Received:", this.data);

    this.title = this.data?.title || 'Notification';
    this.message = this.data?.message || '';
    this.selectedType = this.data?.type || 'sms';
    this.fields = this.data?.fields || [];

    if (this.fields.length === 0) {
      console.warn("⚠️ No fields provided to the dialog.");
    }

    this.initializeForm();
  }

  initializeForm(): void {
    const formControls: Record<string, any> = {};
  
    this.fields.forEach(field => {
      console.log(`Processing field: ${field.name}, Options:`, field.options); // Debugging
  
      formControls[field.name] = [
        field.selected || '',
        field.validators || []
      ];
    });
  
    this.dialogForm = this.fb.group(formControls);
    this.cdr.detectChanges();
  }

  onSubmit(): void {
    if (this.dialogForm.valid) {
      const formData = this.dialogForm.value;
      console.log('✅ Submitted Data:', formData);
      this.dialogRef.close(formData);
    } else {
      this.dialogForm.markAllAsTouched();
      console.error('❌ Form is invalid');
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
