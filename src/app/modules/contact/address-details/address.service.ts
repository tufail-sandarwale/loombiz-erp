import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private fb: FormBuilder) { }

  createAddress(): FormGroup {
    return this.fb.group({
      gstType: [''],
      gstin: [''],
      panNo: [''],
      contactFirstName: [''],
      contactLastName: [''],
      contactCompanyName: [''],
      contactNo: ['', ],
      contactEmail: [''],
      addressLine1: [''],
      addressLine2: [''],
      country: [''],
      state: ['', ],
      city: ['', ],
      pincode: ['', ]
    });
  }

  addAddress(addresses: FormArray) {
    addresses.push(this.createAddress());
  }

  removeAddress(addresses: FormArray, index: number) {
    addresses.removeAt(index);
  }
}
