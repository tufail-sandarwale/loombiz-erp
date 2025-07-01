import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetails {
  @Output() addressSaved = new EventEmitter<any[]>();
  addressForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      addressLines: this.fb.array([this.createAddressLine()])
    });
  }

  get addressLines(): FormArray {
    return this.addressForm.get('addressLines') as FormArray;
  }

  createAddressLine(): FormGroup {
    return this.fb.group({
      gstType: [''],
      gstin: [''],
      panNo: [''],
      contactFirstName: ['', Validators.required],
      contactLastName: [''],
      contactCompanyName: [''],
      contactNo: [''],
      contactEmail: ['', [Validators.required, Validators.email]],
      addressLine1: [''],
      addressLine2: [''],
      country: [''],
      state: [''],
      city: [''],
      pincode: ['', Validators.required]
    });
  }

  addAddressLine(): void {
    this.addressLines.push(this.createAddressLine());
  }

  removeAddressLine(index: number): void {
    this.addressLines.removeAt(index);
  }

  onSaveAddress(): void {
    if (this.addressForm.valid) {
      this.addressSaved.emit(this.addressForm.value.addressLines);
      console.log('Address emitted:', this.addressForm.value.addressLines);
    }
  }
}
