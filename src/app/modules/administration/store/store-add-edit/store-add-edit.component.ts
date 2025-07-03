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
import { StoreService } from '../store.service';
import { modulesData } from '../modules-data';
import { FirmService } from '../../firm/firm.service';


@Component({
  selector: 'app-store-add-edit',
  standalone: true,
  imports: [CommonModule, TranslocoModule, SharedFormFmodules,
    RvAutoCompleteComponent,
    SharedMaterialModules],
  templateUrl: './store-add-edit.component.html',
  styleUrl: './store-add-edit.component.scss'
})
export class StoreAddEditComponent implements OnInit {
  storeForm: FormGroup;
  currentstore;
  editMode = false;
  filteredList: Observable<any[]>;
  sessionUser;
  roleKeyValues;
  countries: any[] = [];
  states: any[] = [];
  districts: any[] = [];
  firmTypeFormElement;
  productCategoryFormElement;
  productSubCategoryFormElement;
  purchaseTaxFormElement;
  salesTaxFormElement;
  countryFormElement;
  stateFormElement;
  itemNameFormElement;
  modulesJson = null;
  firms = [];
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RolesService,
    private router: Router,
    private alertService: AlertsService,
    private userSerive: UserService,
    private getCommonService: GetCommonService,
    private storeService: StoreService,
    private firmService: FirmService) {
    this.modulesJson = modulesData;
    this.userSerive.user$.subscribe({
      next: user => {
        this.sessionUser = user;
        this.createProfileForm();
        this.route.params.subscribe((params) => {
          const id = params['id'];
          if (id) {
            this.editMode = true;
            this.loadStoreData(id);
          }
        });
      },
      error: error => {

      }
    })

  }
  ngOnInit(): void {
    this.loadCountries();
    this.setupCountryState();
    this.loadFirms();
  }
  loadFirms() {
    this.firmService.getOrganizationList().subscribe({
      next: result => {
        this.firms = result;
        this.firmTypeFormElement = {
          name: 'organizationId',
          label: 'Firm',
          options: result.map(item => ({ key: item.id, value: item.name }))
        }
      },
      error: error => {
        console.error('Error Load Firm:', error);
      }
    });
  }
  setModulesToCheckedUnchecked() {
    if (this.editMode) {
      const currentStoreModules = this.currentstore.modulesSubmodules;
      this.modulesJson.forEach(module => {
        module.checked = currentStoreModules.includes(module.code);
        module.subMenu.forEach(subModule => {
          subModule.checked = currentStoreModules.includes(subModule.code);
        });
      });
    }
  }
  createProfileForm() {
    this.storeForm = this.formBuilder.group({
      id: [null],
      name: [''],
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
      address: [''],
      addresses: this.formBuilder.array([this.createAddressGroup()]),
      organizationId: [null]
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



  loadStoreData(id: string): void {
    this.storeService.getStoreDataById(id).subscribe({
      next: (result) => {
        this.currentstore = result;
        this.patchValues();
        this.setModulesToCheckedUnchecked();
      },
      error: (error) => {
        console.error('Error fetching Firm data:', error);
      },
    });
  }

  patchValues() {
    this.storeForm.patchValue({
      id: this.currentstore.id,
      name: this.currentstore.name,
      contact: this.currentstore.contact,
      ownerNo: this.currentstore.ownerNo,
      supportEmail: this.currentstore.supportEmail,
      email: this.currentstore.email,
      mapobileNo: this.currentstore.mapobileNo,
      customerCareNo: this.currentstore.customerCareNo,
      address: this.currentstore.address,
      zipcode: this.currentstore.zipcode,
      country: this.currentstore.country,
      state: this.currentstore.state,
      city: this.currentstore.city,
      webSite: this.currentstore.webSite,
      latitude: this.currentstore.latitude,
      longitude: this.currentstore.longitude,
      bankName: this.currentstore.bankName,
      bankIFSC: this.currentstore.bankIFSC,
      upi: this.currentstore.upi,
      branchName: this.currentstore.branchName,
      accountHolderName: this.currentstore.accountHolderName,
      bankAccountNo: this.currentstore.bankAccountNo,
      description: this.currentstore.description,
      businessType: this.currentstore.businessType,
      gstNumber: this.currentstore.gstNumber,
      organizationId: this.currentstore.organizationId
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
    return this.storeForm.get('addresses') as FormArray;
  }
  addAddress(): void {
    this.addressesArray.push(this.createAddressGroup());
  }
  getAddress(index: number): any {
    const addresses = this.storeForm.controls['addresses'] as FormArray;
    return addresses.at(index).value;
  }

  onSubmit() {
    if (this.storeForm.valid) {
      const storeData = this.storeForm.value;
      storeData['modulesSubmodules'] = this.allSelectedCodes;
      const storeDataJson = JSON.stringify(storeData);
      console.log('Store Data:', storeDataJson);
      storeData['organizationId'] = storeData.organizationId;
      if (!this.editMode) {
        this.storeService.createBranch(storeData).subscribe({
          next: result => {
            this.alertService.showAlert('Add Store details Successfully', true)
            this.router.navigate(['/administration/store/']);
          },
          error: error => {
            this.alertService.showAlert('Error while Store details ', false)
          }
        })
      } else {
        console.log(" Store details", storeData);
        this.storeService.updateOrganization(this.currentstore.id, this.storeForm.value).subscribe({
          next: result => {
            this.alertService.showAlert('Firm Updated Successfully', true)
            this.router.navigate(['/administration/store/']);
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
    this.router.navigate(['administration/store']);
  }

  upperCaseInput(formControlName): void {
    const val = this.storeForm.controls[formControlName].value
    if (val)
      this.storeForm.controls[formControlName].setValue(val.toUpperCase());
  }


  getFormControlValue(controlName: string) {
    return this.storeForm.get(controlName).value;
  }

  onToggleChange(event, type, element) {
    element.checked = !element.checked;
    if (type === 'module') {
      element.subMenu.forEach(subModule => {
        subModule.checked = element.checked;
      });
    }
    if (event) event.stopPropagation();
  }

  onPanelClick(event: MouseEvent) {
    // Panel should open/close only when other elements are clicked, not the toggles
    if ((event.target as HTMLElement).closest('mat-slide-toggle')) {
      event.stopPropagation(); // Stop the panel from reacting if the click is from a toggle
    }
  }

  get allSelectedCodes(): string[] {
    return this.modulesJson.reduce((acc, module) => {
      if (module.checked) {
        acc.push(module.code);
        module.subMenu.forEach(subMenu => {
          if (subMenu.checked) {
            acc.push(subMenu.code);
          }
        });
      }
      return acc;
    }, []);
  }
}
