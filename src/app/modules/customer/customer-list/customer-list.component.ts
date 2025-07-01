import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-customer-list',
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
    MatDatepickerModule

  ],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  mainForm: FormGroup;
  showFields = false;

    // Flag values from the database
    basicCustomerFlag = true;
    gstCustomerFlag = true;
    accountCustomerFlag = true;
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
  constructor(private fb: FormBuilder) {
    this.mainForm = this.fb.group({
      basicCustomer: fb.group({
        customerName: [''],
          customerId: [''],
          contactPerson: [''],
          salutation: [''],
          firstName: [''],
          middleName: [''],
          lastName: [''],
          spouseName: [''],
          profession: [''],
          address: fb.group({
            street: [''],
            area: [''],
            city: [''],
            pincode: [''],
            state: [''],
            country: [''],
          }),
          telephoneNo: [''],
          isd: [''],
          mobileNo: [''],
          email: [''],
          whatsappNo: [''],
          birthday: [''],
          anniversary: [''],
          category: [''],
          photo: [''],
          receiveWhatsApp: [''],
          preferredCommunicationMode: [''],
          referredBy: [''],
          gstSettings: [''],
          accountsSettings: [''],
          crmMembershipSettings: [''],
          remarks: [''],
        
      }),
      gstCustomer: fb.group({
        customerId: [''],
        customerName: [''],
        pan: [''],
        registrationType: [''],
        gstinUin: [''],
        placeOfSupply: [''],
        stateCode: [''],
        remarks: ['']
      }),
      accountCustomer: fb.group({
        customerName: ['Tufail', Validators.required],
        customerId: [1, Validators.required],
        openingBalance: ['Saving', Validators.required],
        creditDebitBalance: ['Deb'],
        creditSale: ['B'],
        creditDues: [''],
        creditLimit: [''],
        billingType: [''],
        markup: [''],
        markdown: [''],
        billDiscount: [''],
        productWiseDiscount: [''],
        billingAddress: fb.group({
          street: [''],
          area: [''],
          city: [''],
          pincode: [''],
          state: [''],
          country: [''],
        }),
        telephoneNo: [''],
        isd: [''],
        mobileNo: [''],
        email: [''],
        deliveryAddress: fb.group({
          street: [''],
          area: [''],
          city: [''],
          pincode: [''],
          state: [''],
          country: [''],
        }),
        deliveryTelephoneNo: [''],
        deliveryIsd: [''],
        deliveryMobileNo: [''],
        deliveryEmail: [''],
        remarks: [''],
      }),
    });
    this.updateFieldVisibility() 
  }

 

  // customer-list.component.ts
  fieldVisibilitySettings = {
    basicCustomer: {
      customerName: true,
      customerId: true,
      contactPerson:false,
      salutation:true,
      firstName:true,
      middleName:true,
      lastName:true,
      spouseName:false,
      profession:true,
      address: {
        street: true,
        area: true,
        city: true,
        pincode: true,
        state: true,
        country: true,
      },
      telephoneNo: true,
      isd: true,
      mobileNo: true,
      email: true,
      whatsappNo: true,
      birthday: true,
      anniversary: true,
      category: true,
      photo: false,
      receiveWhatsApp: true,
      preferredCommunicationMode: true,
      referredBy: true,
      gstSettings: true,
      accountsSettings: true,
      crmMembershipSettings: true,
      remarks: true,
    },
    gstCustomer: {
      customerId: true,
      customerName: true,
      pan: true,
      registrationType: true,
      gstinUin: true,
      placeOfSupply: true,
      stateCode: true,
      remarks: true
    },
    accountCustomer: {
      customerName: true,
      customerId: true,
      openingBalance: true,
      creditDebitBalance: true,
      creditSale: true,
      creditDues: true,
      creditLimit: true,
      billingType: true,
      markup: true,
      markdown: true,
      billDiscount: true,
      productWiseDiscount: true,
      billingAddress: {
        street: true,
        area: true,
        city: true,
        pincode: true,
        state: true,
        country: true,
      },
      telephoneNo: true,
      isd: true,
      mobileNo: true,
      email: true,
      deliveryAddress: {
        street: true,
        area: true,
        city: true,
        pincode: true,
        state: true,
        country: true,
      },
     
      remarks: true,
    },
    
  };

  updateFieldVisibility() {
    for (const tab in this.fieldVisibilitySettings) {
      if (this.fieldVisibilitySettings.hasOwnProperty(tab)) {
        const tabSettings = this.fieldVisibilitySettings[tab];
        const formGroup = this.mainForm.get(tab);
  
        if (formGroup) {
          for (const field in tabSettings) {
            if (tabSettings.hasOwnProperty(field)) {
              const control = formGroup.get(field);
  
              if (control) {
                if (tabSettings[field]) {
                  control.enable();
                } else {
                  control.disable();
                }
              }
            }
          }
        }
      }
    }
  }
  


  onSubmitForm() {
    // Handle form submission here
    console.log(this.mainForm.value);
  }
  onReset() {
    // Handle form submission here
    this.mainForm.reset();
    console.log(this.mainForm.value);
  }
}
