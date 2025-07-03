import { Component, Inject, OnInit,NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { AlertsService } from 'app/core/services/alerts.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  validators?: Validators[];
  options?: { key: string; value: string }[];
  selected?: string; // Optional, for default selected value
  fields?: Field[];  // For 'group' fields, this will contain nested fields
}
interface DialogData {
  type: 'product' | 'category' | 'productSubCategory' | 'itemName' | 'parentGroup';
  fields?: Field[];
  title: string;
  record?: any;
  showParentGroupDetails?: boolean; // Optional property to show tax details
}
@Component({
  selector: 'app-account-dialog',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule],
  templateUrl: './account-dialog.component.html',
  styleUrl: './account-dialog.component.scss'
})
export class AccountSharedDialogComponent {



  dialogForm: FormGroup;
  title: string;
  isEditMode: boolean;
  fields: Field[];
  byDefaultSelected: { [key: string]: string } = {}; // Define byDefaultSelected here
  selectedDetails:  any = null;
  fieldOptions: any[] = [];
  showParentGroupDetails: boolean = false; // Flag to determine whether to show tax details
  // debit: number = 0;
  // credit: number = 0;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AccountSharedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alertService: AlertsService
  ) {

      // Initialize form here
  // this.dialogForm = this.fb.group({
  //   debit: [0, [Validators.min(0)]], // Initialize debit with 0
  //   credit: [0, [Validators.min(0)]], // Initialize credit with 0
  // });

  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.isEditMode = !!this.data.record;
    this.fields = this.data.fields;
    console.log('data fields',this.fields);
    
    const group: any = {};
  
    this.fields.forEach((field) => {
      if (field.type === 'group') {
        console.log('fields ', field['fields'])
        field['fields'].forEach((subField: Field) => {
          group[subField.name] = [subField.selected || '', subField.validators || []];
        });
      } else {
        group[field.name] = [field.selected || '', field.validators || []];
      }
    });
  
    this.dialogForm = this.fb.group(group);
  
    // Value change logic for debit and credit
    this.dialogForm.get('debit')?.valueChanges.subscribe((debitValue) => {
      if (debitValue > 0) {
        this.dialogForm.get('credit')?.setValue(0, { emitEvent: false });
      }
    });
  
    this.dialogForm.get('credit')?.valueChanges.subscribe((creditValue) => {
      if (creditValue > 0) {
        this.dialogForm.get('debit')?.setValue(0, { emitEvent: false });
      }
    });
  }

  
onSubmit(): void {
  if (this.dialogForm.valid) {
    const formValue = this.dialogForm.value;
    

    // Extract debit and credit values, default to 0 if undefined
    const debit = formValue.debit || 0;
    const credit = formValue.credit || 0;
    console.log('debit',-debit)
    const openingBalance = debit > 0 ? { debit: -debit, credit: 0 } : { debit: 0, credit };

    const formattedResult = {
      ...formValue,
      openingBalance, // Include the constructed opening balance
    };
    console.log("before close ",formattedResult)

    this.dialogRef.close(formattedResult); // Close dialog and return result
  } else {
    // Mark all controls as touched to show validation errors
    Object.keys(this.dialogForm.controls).forEach(field => {
      const control = this.dialogForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });

    console.error('Form Invalid');
  }
}


  onCancel(): void {
    this.dialogRef.close(null);
  }



}
