import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { TranslocoModule } from '@ngneat/transloco';
import { ActivatedRoute, Router } from '@angular/router';

import { RolesService } from 'app/modules/admin/admin-settings/roles/roles.service';
import { AlertsService } from 'app/core/services/alerts.service';
import { RvAutoCompleteComponent } from 'app/modules/shared/component/rv-auto-complete/rv-auto-complete.component';
import { Observable } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { GetCommonService } from 'app/modules/shared/services/get-common.service'
import { FirmService } from '../firm.service';

@Component({
  selector: 'app-firm-add-edit',
  standalone: true,
  imports: [CommonModule, TranslocoModule, SharedFormFmodules,
    RvAutoCompleteComponent,
    SharedMaterialModules],
  templateUrl: './firm-add-edit.component.html',
  styleUrl: './firm-add-edit.component.scss'
})
export class FirmAddEditComponent implements OnInit {
  firmForm: FormGroup;
  currentfirmForm;
  editMode = false;
  filteredList: Observable<any[]>;
  sessionUser;
  roleKeyValues;
  countries: any[] = [];
  states: any[] = [];
  districts: any[] = [];
  productTypeFormElement;
  productCategoryFormElement;
  productSubCategoryFormElement;
  purchaseTaxFormElement;
  salesTaxFormElement;
  countryFormElement;
  stateFormElement;
  itemNameFormElement;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RolesService,
    private router: Router,
    private alertService: AlertsService,
    private userSerive: UserService,
    private getCommonService: GetCommonService,
    private firmService: FirmService) {
    this.userSerive.user$.subscribe({
      next: user => {
        this.sessionUser = user;
        this.createProfileForm();
        this.currentfirmForm = this.route.snapshot.data['profile'];
        // console.log( "Tax edit data", this.currentTaxRules)
        this.route.params.subscribe((params) => {
          const id = params['id'];
          if (id) {
            this.editMode = true;
            this.loadFirmData(id);
          }
        });
      },
      error: error => {

      }
    })

  }
  ngOnInit(): void {

    this.loadCountries();
    //this.createProfileForm();
    this.setupCountryState();
  }
  createProfileForm() {
    this.firmForm = this.formBuilder.group({
      id: [null],
      name: [''],
      accountType: [''],
      displayName: [''],
      contact: [''],
      ownerNo: [''],
      supportEmail: [''],
      email: [''],
      mobileNo: [''],
      customerCareNo: [''],
      zipcode: [''],
      country: [''],
      state: [''],
      city: [''],
      webSite: [''],
      latitude: [''],
      longitude: [''],
      bankName: [''],
      bankIFSC: [''],
      upi: [''],
      branchName: [''],
      accountHolderName: [''],
      bankAccountNo: [''],
      description: [''],
      businessType: [''],
      gstNumber: [''],
      address1: [''],
      // address	 : this.formBuilder.group({
      //   address1: [''],
      //   country: [''],
      //   state: [''],
      //   city: [''],
      //   zipcode: ['']
      // }),
      addresses: this.formBuilder.array([this.createAddressGroup()]),
      //addresses: this.formBuilder.array([]),

    });
  }



  setupCountryState(): void {
    this.addressesArray.controls.forEach((group, index) => {
      group.get('country')?.valueChanges.subscribe(countryCode => {
        this.states = [];
        this.districts = [];
        group.get('state')?.setValue(null);
        group.get('city')?.setValue(null);
        if (countryCode) {
          this.loadStates(countryCode, index);
        }
      });

      group.get('state')?.valueChanges.subscribe(stateCode => {
        this.districts = [];
        group.get('city')?.setValue(null);
        if (stateCode) {
          this.loadDistricts(stateCode, index);
        }
      });
    });
  }

  loadCountries(): void {
    this.getCommonService.getCountries().subscribe({
      next: (data) => this.countries = data,
      error: (error) => console.error('Error loading countries:', error)
    });
  }

  loadStates(countryCode: string, index: number): void {
    if (countryCode) {
      this.getCommonService.getStates(countryCode).subscribe({
        next: (data) => {
          this.states = data;
          this.addressesArray.at(index).patchValue({ state: null });
        },
        error: (error) => console.error('Error loading states:', error)
      });
    } else {
      this.states = [];
    }
  }

  loadDistricts(stateCode: string, index: number): void {
    if (stateCode) {
      this.getCommonService.getCities(stateCode).subscribe({
        next: (data) => {
          this.districts = data;
          this.addressesArray.at(index).patchValue({ city: null });
        },
        error: (error) => console.error('Error loading districts:', error)
      });
    } else {
      this.districts = [];
    }
  }



  loadFirmData(id: string): void {
    this.firmService.getFirmDataById(id).subscribe({
      next: (data) => {
        console.log('Firm  edit data', data);

        this.currentfirmForm = data;
        this.patchValues();
      },
      error: (error) => {
        console.error('Error fetching Firm data:', error);
      },
    });
  }

  patchValues() {
    this.firmForm.patchValue({
      id: this.currentfirmForm.id,
      name: this.currentfirmForm.name,
      description: this.currentfirmForm.description,
      businessType: this.currentfirmForm.businessType,
      gstNumber: this.currentfirmForm.gstNumber,
      contact: this.currentfirmForm.contact,
      ownerNo: this.currentfirmForm.ownerNo,
      supportEmail: this.currentfirmForm.supportEmail,
      email: this.currentfirmForm.email,
      mapobileNo: this.currentfirmForm.mapobileNo,
      customerCareNo: this.currentfirmForm.customerCareNo,
      address: this.currentfirmForm.address,
      zipcode: this.currentfirmForm.zipcode,
      country: this.currentfirmForm.country,
      state: this.currentfirmForm.state,
      city: this.currentfirmForm.city,
      webSite: this.currentfirmForm.webSite,
      latitude: this.currentfirmForm.latitude,
      longitude: this.currentfirmForm.longitude,
      bankName: this.currentfirmForm.bankName,
      bankIFSC: this.currentfirmForm.bankIFSC,
      upi: this.currentfirmForm.upi,
      branchName: this.currentfirmForm.branchName,
      accountHolderName: this.currentfirmForm.accountHolderName,
      bankAccountNo: this.currentfirmForm.bankAccountNo,



    });
  }
  createAddressGroup() {
    return this.formBuilder.group({
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      country: [''],
      zipcode: [''],
      createdDateTime: [''],
      updatedDateTime: [''],
      version: [1],
      createdBy: [''],
      updatedBy: ['']
    });
  }
  get addressesArray(): FormArray {
    return this.firmForm.get('addresses') as FormArray;
  }
  addAddress(): void {
    this.addressesArray.push(this.createAddressGroup());
  }
  getAddress(index: number): any {
    const addresses = this.firmForm.controls['addresses'] as FormArray;
    return addresses.at(index).value;
  }

  onSubmit() {
    if (this.firmForm.valid) {
      const firmData = this.firmForm.value;
      console.log("Firm Data >>>> ", firmData);
      if (!this.editMode) {

        this.firmService.createOrganization(firmData).subscribe({
          next: result => {
            this.alertService.showAlert('Add Firm details Successfully', true)
            this.router.navigate(['/administration/firm/']);
          },
          error: error => {
            this.alertService.showAlert('Error while Firm details ', false)
          }
        })
      } else {
        console.log(" Firm details", firmData);
        this.firmService.updateOrganization(this.currentfirmForm.id, this.firmForm.value).subscribe({
          next: result => {
            this.alertService.showAlert('Firm Updated Successfully', true)
            this.router.navigate(['/administration/firm/']);
          },
          error: error => {
            this.alertService.showAlert("Error while Update Firm", false)
          }
        })
      }

    }
  }

  private _filterList(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.roleKeyValues.filter(option => (option?.key.toLowerCase().includes(filterValue) || option?.value.toLowerCase().includes(filterValue)));
  }

  cancel() {
    this.router.navigate(['administration/firm']);
  }

  upperCaseInput(formControlName): void {
    const val = this.firmForm.controls[formControlName].value
    if (val)
      this.firmForm.controls[formControlName].setValue(val.toUpperCase());
  }
}
