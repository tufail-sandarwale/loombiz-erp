import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { AlertsService } from 'app/core/services/alerts.service';

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  validators?: Validators[];
  options?: { key: string; value: string }[];
  selected?: string; // Optional, for default selected value
}

interface DialogData {
  type: 'product' | 'category' | 'productSubCategory' | 'itemName' | 'tax';
  fields: Field[];
  title: string;
  record?: any;
  showParentGroupDetails?: boolean; // Optional property to show tax details
}

@Component({
  selector: 'app-additional-charges-dialog',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule],
  templateUrl: './additional-charges-dialog.component.html',
  styleUrl: './additional-charges-dialog.component.scss'
})

export class AdditionalChargesDialogComponent {

dialogForm: FormGroup;
  title: string;
  isEditMode: boolean;
  fields: Field[];
  byDefaultSelected: { [key: string]: string } = {}; // Define byDefaultSelected here
  selectedDetails:  any = null;
  fieldOptions: any[] = [];
  showParentGroupDetails: boolean = false; // Flag to determine whether to show tax details
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdditionalChargesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.isEditMode = !!this.data.record;
    this.fields = this.data.fields || []; // Ensure fields is always an array
  
    const group: Record<string, any> = {}; // Explicitly define type
  
    this.fields.forEach(field => {
      let fieldValue: string | null = null;
  
      if (this.isEditMode && this.data.record) {
        fieldValue = this.data.record[field.name] ?? null;

        // Ensure that the field value is extracted correctly for select fields
        if (field.type === 'select' && fieldValue !== null && typeof fieldValue === 'object') {
          fieldValue = (fieldValue as any)?.id ?? (fieldValue as any)?.name ?? '';
        }
      } else if (field.selected !== undefined) {
        fieldValue = field.selected;
      }
  
      group[field.name] = [fieldValue ?? '', field.validators || []];
    });

    // Find the 'tax' field and set its options correctly
    const taxField = this.fields.find(field => field.name === 'tax');
    this.fieldOptions = taxField ? taxField.options || [] : [];
  
    // Set `showParentGroupDetails` correctly with a fallback default
    this.showParentGroupDetails = !!this.data.showParentGroupDetails;
  
    // Initialize the form group
    this.dialogForm = this.fb.group(group);
  
    // console.log("Form Initialized with Values:", this.dialogForm.value);
}
  


  
  onSubmit(): void {
    if (this.dialogForm.valid) {
      const formValue = this.dialogForm.value;
      // console.log('Form Value:', formValue);
      const formattedResult = {
        ...formValue,
        tax: formValue.tax ?  formValue.tax : undefined  // Ensure tax is formatted correctly
      };
  
    //  console.log('formattedResult Value:', formattedResult);
  
      this.dialogRef.close(formattedResult);
    } else {
      // console.log('else', Object.keys(this.dialogForm.controls));
      
      Object.keys(this.dialogForm.controls).forEach(field => {
        const control = this.dialogForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      // console.log('Form Invalid');
    }
  }
  

  onCancel(): void {
    this.dialogRef.close(null);
  }

}
