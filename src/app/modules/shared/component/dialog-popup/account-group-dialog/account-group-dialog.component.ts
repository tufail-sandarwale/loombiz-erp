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
  type: 'product' | 'category' | 'productSubCategory' | 'itemName' | 'parentGroup';
  fields: Field[];
  title: string;
  record?: any;
  showParentGroupDetails?: boolean; // Optional property to show tax details
}
@Component({
  selector: 'app-account-group-dialog',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule],
  templateUrl: './account-group-dialog.component.html',
  styleUrl: './account-group-dialog.component.scss'
})
export class AccountGroupSharedDialogComponent {

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
    public dialogRef: MatDialogRef<AccountGroupSharedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.isEditMode = !!this.data.record;
    this.fields = this.data.fields;
    
    const group: any = {};
  
    this.fields.forEach(field => {
      let fieldValue: string = '';
  
      // Check if in edit mode and record has the field
      if (this.isEditMode && this.data.record && this.data.record.hasOwnProperty(field.name)) {
        fieldValue = this.data.record[field.name] ?? '';
  
        // Ensure correct selection for dropdowns
        if (field.type === 'select' && typeof fieldValue === 'object' && fieldValue !== null) {
          fieldValue = (fieldValue as { id?: string }).id || ''; // Use ID if available, otherwise empty string
        }
      } else if (field.selected !== undefined) {
        fieldValue = field.selected;
      }
  
      group[field.name] = [fieldValue, field.validators || []];
    });      // Find and set options for 'parentGroup' dropdown
    const selectedField = this.data.fields.find(field => field.name === 'parentGroup');
    if (selectedField) {
      this.fieldOptions = selectedField.options;
    }
  
    // Handle showing parent group details if applicable
    this.showParentGroupDetails = this.data.showParentGroupDetails || false;
  
    this.dialogForm = this.fb.group(group);
      // Trigger selection change manually for edit mode
  if (this.isEditMode && this.dialogForm.get('parentGroup')?.value) {
    this.onSelectionChange({ value: this.dialogForm.get('parentGroup')?.value });
  }
  }
  
  onSelectionChange(event: any) {
    if (!event || !event.value) return; // Prevent errors if event is undefined
  
    const selectedOption = this.fieldOptions.find(option => option.key === event.value);
  
    if (selectedOption) {
      this.selectedDetails = {
        groupUnder: selectedOption.groupUnder || 'N/A',
        groupNature: selectedOption.groupNature || 'N/A',
        groupLevel: selectedOption.groupLevel || 'N/A'
      };
    }
  }
  
  
    
//  onSelectionChange(event: any) {
//   // Find the selected option from the tax options list
//   const selectedOption = this.fieldOptions.find(option => option.key === event.value);

//   if (selectedOption) {
//     // Set the selectedDetails object with tax information for the selected option
//     this.selectedDetails = {
//       groupUnder: selectedOption.groupUnder,       // Assuming rate is a property in the option
//       groupNature: selectedOption.groupNature, // Assuming country is a property in the option
//       groupLevel: selectedOption.groupLevel      // Assuming state is a property in the option
//     };
//   }
// }

  
  onSubmit(): void {
    if (this.dialogForm.valid) {
      const formValue = this.dialogForm.value;
      // console.log('Form Value:', formValue);
      const formattedResult = {
        ...formValue,
        parentGroup: formValue.parentGroup ?  formValue.parentGroup : undefined  // Ensure tax is formatted correctly
      };
  
    //  console.log('formattedResult Value:', formattedResult);
  
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
