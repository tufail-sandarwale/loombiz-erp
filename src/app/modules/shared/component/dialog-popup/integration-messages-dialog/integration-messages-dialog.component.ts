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
  selected?: string; 
  fields?: Field[];  
}
interface DialogData {
  type: 'product' | 'category' | 'productSubCategory' | 'itemName' | 'parentGroup';
  fields?: Field[];
  title: string;
  record?: any;
  showParentGroupDetails?: boolean; // Optional property to show tax details
}

@Component({
  selector: 'app-integration-messages-dialog',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule],
  templateUrl: './integration-messages-dialog.component.html',
  styleUrl: './integration-messages-dialog.component.scss'
})
export class IntegrationMessagesDialogComponent implements OnInit  {


  dialogForm: FormGroup;
  title: string;
  isEditMode: boolean;
  fields: Field[];
  byDefaultSelected: { [key: string]: string } = {}; // Define byDefaultSelected here
  selectedDetails:  any = null;
  fieldOptions: any[] = [];


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<IntegrationMessagesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alertService: AlertsService
  ) {

  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.isEditMode = !!this.data.record;
    this.fields = this.data.fields || [];
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
  
   
  }

  
onSubmit(): void {
  if (this.dialogForm.valid) {
    const formValue = this.dialogForm.value;
    

    console.log("before close ",formValue)

    this.dialogRef.close(formValue); // Close dialog and return result
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
