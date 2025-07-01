import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { TranslocoModule } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { AlertsService } from 'app/core/services/alerts.service';
import { RvAutoCompleteComponent } from 'app/modules/shared/component/rv-auto-complete/rv-auto-complete.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {ProductTableComponent} from '../product-table/product-table.component'



interface City {
  value: string;
  option: string;
}
interface Payment {
  value: string;
  option: string;
}
interface Day {
  value: string;
  option: string;
}

@Component({
  selector: 'app-contact-add-edit',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, 
    TranslocoModule, RvAutoCompleteComponent,MatRadioModule,
    MatCardModule,
    ProductTableComponent,
    ],

  templateUrl: './contact-add-edit.component.html',
  styleUrl: './contact-add-edit.component.scss'
})
export class ContactAddEditComponent implements OnInit {
  contactForm: FormGroup;
  contactData: any[] = [];
  searchText: string = '';
  users: any[] = [];
  cities: City[] = [
    {value: 'blr', option: 'Bangalore'},
    {value: 'mum', option: 'Mumbai'},
    {value: 'pune', option: 'Pune'},
  ];
  countries: any[] = [];
  states: any[] = [];
  districts: any[] = [];
  constructor(private fb: FormBuilder, 
    private contactService: ContactService,
    private router: Router,
    private alertService: AlertsService,) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      // Common fields for all types
      contactType: [''],
      generalDetails:this.fb.group({
      clientId:[''],
      branchId:[''],
      firstName: ['', Validators.required],
      lastName: [''],
      companyName: [''],
      code: [''],
      email: [''],
      mobileNo: [''],
      telephoneNo: [''],
      remarks: [''],
      tds: [''],
      creditLimit: [''],
      debitAmount: [''],
      paymentMode: [''],
      paymentTerms: [''],
      dateOfBirth: [''],
      anniversaryDate: [''],
      whatAppNo: [''],
      category:[''],
      city:[''],
      bankName: [''],
      accountNo:[],
      ifscCode: [''],
      branchName: [''],
      transportId: [''],
      customerCategory:[''],
      gstType: [''],
      gstin: [''],
      panNo: [''],
      contactFirstName: [''],
      contactLastName: [''],
      contactCompanyName: [''],
      contactNo: [''],
      contactEmail: [''],
      addressLine1: [''],
      addressLine2: [''],
      country: [''],
      state: [''],
      pincode: [''],
    }),
    productDetails: this.fb.array([]),
    addressDetails: this.fb.array([]), // Make sure this matches your form array name in the template
  });
 // this.addAddressLine();
 this.loadCountries();

    // Handle changes in country selection
    this.contactForm.get('generalDetails.country')?.valueChanges.subscribe(countryId => {
      this.loadStates(countryId);
      this.contactForm.get('generalDetails.state')?.setValue(null);
      this.districts = [];
    });

    // Handle changes in state selection
    this.contactForm.get('generalDetails.state')?.valueChanges.subscribe(stateId => {
      this.loadDistricts(stateId);
    });
}
loadCountries(): void {
  this.contactService.getCountries().subscribe({
    next: (data) => this.countries = data,
    error: (error) => console.error('Error loading countries:', error)
  });
}

loadStates(countryId: string): void {
  if (countryId) {
    this.contactService.getStates(countryId).subscribe({
      next: (data) => this.states = data,
      error: (error) => console.error('Error loading states:', error)
    });
  } else {
    this.states = [];
  }
}

loadDistricts(stateId: string): void {
  if (stateId) {
    this.contactService.getDistricts(stateId).subscribe({
      next: (data) => this.districts = data,
      error: (error) => console.error('Error loading districts:', error)
    });
  } else {
    this.districts = [];
  }
}



get addressFormArray(): FormArray {
  return this.contactForm.get('addressDetails') as FormArray; // Ensure the name is correct
}

 createAddressFormGroup(): FormGroup {
  const generalDetails = this.contactForm.get('generalDetails') as FormGroup;
  
  if (generalDetails) {
    return this.fb.group({
      gstType: [generalDetails.get('gstType')?.value],
      gstin: [generalDetails.get('gstin')?.value],
      panNo: [generalDetails.get('panNo')?.value],
      contactFirstName: [generalDetails.get('contactFirstName')?.value],
      contactLastName: [generalDetails.get('contactLastName')?.value],
      contactCompanyName: [generalDetails.get('contactCompanyName')?.value],
      contactNo: [generalDetails.get('contactNo')?.value],
      contactEmail: [generalDetails.get('contactEmail')?.value],
      addressLine1: [generalDetails.get('addressLine1')?.value],
      addressLine2: [generalDetails.get('addressLine2')?.value],
      country: [generalDetails.get('country')?.value],
      state: [generalDetails.get('state')?.value],
      city: [generalDetails.get('city')?.value],
      pincode: [generalDetails.get('pincode')?.value],
    });
  }
  return this.fb.group({
    gstType: [''],
    gstin: [''],
    panNo: [''],
    contactFirstName: [''],
    contactLastName: [''],
    contactCompanyName: [''],
    contactNo: [''],
    contactEmail: [''],
    addressLine1: [''],
    addressLine2: [''],
    country: [''],
    state: [''],
    city: [''],
    pincode: [''],
  });
}

addAddressLine(): void {
  this.addressFormArray.push(this.createAddressFormGroup());
  console.log('Added Address Line:', this.addressFormArray.controls);
}

removeAddressLine(index: number): void {
  this.addressFormArray.removeAt(index);
}
   onSubmit() {
    const contactType = this.contactForm.get('contactType').value;
   
      if (this.contactForm.valid) {
        
      const contactData = this.contactForm.value;
      const contactDataJson = JSON.stringify(contactData);
      console.log("form values", contactDataJson);
      this.contactService.saveContact(contactDataJson).subscribe({
        next: result => {
          this.alertService.showAlert('Contact saved successfully', true)
          this.router.navigate(['/contact']);
        },
        error: error => {
          this.alertService.showAlert('Error while create Employee', false)
        }

      });
    } else {
      // Handle form validation errors
    }
  }
  
  // loadData() {
  //   this.contactService.loadData()
  //     .subscribe(users => {
  //       this.users = users;
  //     });
  // }

   // Method to get access to productDetails form array
   get productDetailsFormArray() {
    return this.contactForm.get('productDetails') as FormArray;
  }

  // Method to add a new product detail form group to the form array
  addProduct() {
    this.productDetailsFormArray.push(this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      action: ['add']
    }));
  }

 
  
  cancel() {
    this.router.navigate(['/contact']);
  }

  upperCaseInput(formControlName): void {
    const val = this.contactForm.controls[formControlName].value
    if (val)
      this.contactForm.controls[formControlName].setValue(val.toUpperCase());
  }

  
}