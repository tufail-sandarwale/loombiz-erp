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
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule],
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductSharedDialogComponent implements OnInit {
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
    public dialogRef: MatDialogRef<AddProductSharedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.isEditMode = !!this.data.record;
    this.fields = this.data.fields;
  
    const group: any = {};
  
    this.fields.forEach(field => {
      let fieldValue: string | null = null;
  
      if (this.isEditMode && this.data.record) {
        fieldValue = this.data.record[field.name];
  
        // If the field is a select type and the value is an object, extract the appropriate key
        if (field.type === 'select' && typeof fieldValue === 'object') {
          fieldValue = (fieldValue as any).name; // Ensure to match the structure of your record
        }
      } else if (field.selected !== undefined) {
        fieldValue = field.selected;
      }
  
      group[field.name] = [fieldValue || '', field.validators || []];
    });
   // Find the 'tax' field and set its options
   const selectedField = this.data.fields.find(field => field.name === 'tax');
   if (selectedField) {
     this.fieldOptions = selectedField.options;
   }
   if (this.data.showParentGroupDetails) {
    this.showParentGroupDetails = true;
  }
  this.showParentGroupDetails = this.data.showParentGroupDetails || false; // Defaults to false if not provided
   this.dialogForm = this.fb.group(group);
 }
    
 onSelectionChange(event: any) {
  // Find the selected option from the tax options list
  const selectedOption = this.fieldOptions.find(option => option.key === event.value);

  if (selectedOption) {
    // Set the selectedDetails object with tax information for the selected option
    this.selectedDetails = {
      rate: selectedOption.rate,       // Assuming rate is a property in the option
      country: selectedOption.country, // Assuming country is a property in the option
      state: selectedOption.state      // Assuming state is a property in the option
    };
  }
}

  
  onSubmit(): void {
    if (this.dialogForm.valid) {
      const formValue = this.dialogForm.value;
      console.log('Form Value:', formValue);
      const formattedResult = {
        ...formValue,
        tax: formValue.tax ?  formValue.tax : undefined  // Ensure tax is formatted correctly
      };
  
     console.log('formattedResult Value:', formattedResult);
  
      this.dialogRef.close(formattedResult);
    } else {
      console.log('else', Object.keys(this.dialogForm.controls));
      
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
