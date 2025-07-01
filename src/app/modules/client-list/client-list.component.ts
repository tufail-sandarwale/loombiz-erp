import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';

import { AddressComponent } from './address/address.component';
import { FormConfigService } from './form-config.service';
@Component({
  selector: 'app-client-list',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  standalone: true,
  imports: [CommonModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule, 
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatStepperModule,
    AddressComponent,
    

  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit {
  mainForm: FormGroup;
  datas: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
  ]
  @ViewChild('basicCustomerAddress') basicCustomerAddress: AddressComponent;
  @ViewChild('gstCustomerAddress') gstCustomerAddress: AddressComponent;
  @ViewChild('accountCustomerAddress') accountCustomerAddress: AddressComponent;
  @ViewChild(MatStepper) stepper: MatStepper;
  
  

   constructor(private fb: FormBuilder, public formConfigService:FormConfigService) {}

  ngOnInit() {
    this.createForm();
    //console.log('basicCustomerAddress:', this.basicCustomerAddress);
    
  }
  ngAfterViewInit() {
    //console.log('basicCustomerAddress:', this.basicCustomerAddress);
  }
  

  createForm() {
    const formGroupConfig = {};

    Object.keys(this.formConfigService.fieldConfigurations).forEach((formGroupName) => {
      formGroupConfig[formGroupName] = this.createFormGroup(this.formConfigService.fieldConfigurations[formGroupName]);
    });

    this.mainForm = this.fb.group(formGroupConfig);
  }

  createFormGroup(configurations: any[]) {
    const formGroupConfig = {};

    configurations.forEach((field) => {
      // Check visibility condition
      if (field.visible) {
        formGroupConfig[field.name] = [null]; 
      }
    });

    return this.fb.group(formGroupConfig);
  }

  onSubmitForm() {
    // Handle form submission logic
     const basicCustomerData = this.basicCustomerAddress.getData();
    const gstCustomerData = this.gstCustomerAddress.getData();
    const accountCustomerData = this.accountCustomerAddress.getData();
     this.mainForm.patchValue({
      basicCustomer: basicCustomerData,
      gstCustomer: gstCustomerData,
       accountCustomer: accountCustomerData,
     });
    console.log(this.mainForm.value);
  }

  onReset() {
    Object.keys(this.mainForm.controls).forEach(controlName => {
      const control = this.mainForm.get(controlName);
      if (control instanceof FormGroup) {
        control.reset();
      } else {
        control.setValue(null);
      }
    });
  }

}
