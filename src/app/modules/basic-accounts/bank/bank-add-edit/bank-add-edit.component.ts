import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { TranslocoModule } from '@ngneat/transloco';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from '../bank.service';
import { RolesService } from 'app/modules/admin/admin-settings/roles/roles.service';
import { AlertsService } from 'app/core/services/alerts.service';
import { panValidator } from 'app/core/validators/rv-validators';
import { zip } from 'lodash';
import { RvAutoCompleteComponent } from 'app/modules/shared/component/rv-auto-complete/rv-auto-complete.component';
import { lab } from 'chroma-js';
import { Observable, map, startWith } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { EmployeeService } from 'app/modules/masters/employee/employee.service';
import { GetCommonService } from 'app/modules/shared/services/get-common.service'
import { ProductService } from 'app/modules/masters/product/product.service';

@Component({
  selector: 'app-bank-add-edit',
  standalone: true,
  imports: [CommonModule,TranslocoModule,SharedFormFmodules,
    RvAutoCompleteComponent,
    SharedMaterialModules],
  templateUrl: './bank-add-edit.component.html',
  styleUrl: './bank-add-edit.component.scss'
})
export class BankAddEditComponent {

  bankForm: FormGroup;
  currentBank;
  editMode = false;
  filteredList: Observable<any[]>;
  sessionUser;
  roleKeyValues;
  countries: any[] = [];
  states: any[] = [];
  districts: any[] = [];
  
  countryFormElement;
  stateFormElement;
  accountGroupOptions;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RolesService,
    private bankService: BankService,
    private router: Router,
    private alertService: AlertsService,
    private userSerive: UserService,
  private getCommonService: GetCommonService,
) {
    this.userSerive.user$.subscribe({
      next: user => {
        this.sessionUser = user;
         this.createBankForm();
        this.currentBank = this.route.snapshot.data['bank'];
       // console.log( "Tax edit data", this.currentBank)
        this.route.params.subscribe((params) => {
          const id = params['id'];
          if (id) {
            this.editMode = true;
            this.loadBankData(id);
          }
        });
      },
      error: error => {

      }
    })

  }
  ngOnInit(): void {
   
   
    this.loadAccountGroups();
    this.loadCountries();
    this.loadStates(null);
    // Handle changes in country selection
    this.bankForm.get('country')?.valueChanges.subscribe(countryCode => {
       // let country = countryCode['id'];
       this.districts = [];
      this.states = [];
    
      this.bankForm.get('state')?.setValue(null);
        this.bankForm.get('city')?.setValue(null);
          if (countryCode) {
          this.loadStates(countryCode);
        }
   
      })
      this.bankForm.get('state')?.valueChanges.subscribe(stateCode => {
        this.bankForm.get('city')?.setValue(null);
         this.districts = [];
        this.loadDistricts(stateCode);
      });
  }
  createBankForm() {
    this.bankForm = this.formBuilder.group({
      bankName:['', Validators.required],
      branchName: ['', Validators.required],
      accountGroup: ['', Validators.required],
      accountHolderName : [''],
     accountNo: ['', Validators.required],
     ifscCode : [''],
      swiftCode: [''],
      address: [''],
      country: ['', Validators.required],
      state:  ['', Validators.required],
      city: ['', Validators.required],
      postalCode: [''],
     
    });
  }
  
  loadCountries(): void {
    this.getCommonService.getCountries().subscribe({
      next: (data) => this.countries = data,
      error: (error) => console.error('Error loading countries:', error)
    });
  }
  
 
  loadStates(countryCode: string): void {
    if (countryCode) {
      this.getCommonService.getStates(countryCode).subscribe({
        next: (data) => this.states = data,
        error: (error) => {
          console.error('Error loading states:', error);
          this.states = [];
        }
      });
    } else {
      this.states = [];
    }
  }
  loadDistricts(stateCode: string): void {
    if (stateCode) {
      this.getCommonService.getCities(stateCode).subscribe({
        next: (data) => this.districts = data,
        error: (error) => {
          console.error('Error loading districts:', error);
          this.districts = [];
        }
      });
    } else {
      this.districts = [];
    }
  }
  loadAccountGroups() {
    this.bankService.getAccountGroups().subscribe({
      next: result => {
        // console.log('accountGroup:', result);
        // Map the response to dropdown options
        this.accountGroupOptions = result.map(accountGroup => ({
          key: accountGroup.id,
          value: accountGroup.groupName
        }));
      },
      error: err => {
        console.error('Error loading payment terms:', err);
      }
    });
  }
   onFo
  
  

  loadBankData(id: string): void {
    this.bankService.getBankById(id).subscribe({
      next: (bank) => {
        console.log('Bank edit data', bank);
        
        this.currentBank = bank;
        this.patchValues();
      },
      error: (error) => {
        console.error('Error fetching Bank data:', error);
      },
    });
  }

  patchValues() {
    this.bankForm.patchValue({
      bankName:this.currentBank.bankName,
      branchName: this.currentBank.branchName,
      accountGroup: this.currentBank.accountGroup?.id,
      accountHolderName : this.currentBank.accountHolderName,
      accountNo: this.currentBank.accountNo, 
      ifscCode : this.currentBank.ifscCode,
      swiftCode: this.currentBank.swiftCode,
      address: this.currentBank.address,
      country:  this.currentBank.country,
      state:  this.currentBank.state,
      city: this.currentBank.city,
      postalCode: this.currentBank.postalCode,
    });
  }
  onSubmit() {
    console.log('Form submitted:', this.bankForm.value);
    
    if (!this.bankForm.valid) {
      this.bankForm.markAllAsTouched();
          return;
   }
    if (this.bankForm.valid) {
      // const bankData = this.bankForm.value;
     // const taxDataJson = JSON.stringify(taxData);
     //console.log("taxData >>>> " ,taxData);
       // Extract form data and include accountGroup
       const bankData = {
        ...this.bankForm.value,
        accountGroup: {
          id: this.bankForm.get('accountGroup')?.value, // Ensure 'accountGroup' exists in your form controls
          
        }
      };
console.log("bankData >>>> " ,bankData);

      if (!this.editMode) {
        
        this.bankService.addBank(bankData).subscribe({
          next: result => {
            this.alertService.showAlert('Bank Details Add Successfully', true)
            this.router.navigate(['/basic-accounts/bank']);
          },
          error: error => {
            this.alertService.showAlert('Error while create Bank Details', false)
          }
        })
      } else {
       console.log("edit Bank" , bankData);
        this.bankService.updateBank(this.currentBank.id,bankData).subscribe({
          next: result => {
            this.alertService.showAlert('Bank Details Updated Successfully', true)
            this.router.navigate(['/basic-accounts/bank']);
          },
          error: error => {
            this.alertService.showAlert("Error while Update Bank Details", false)
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
    this.router.navigate(['/basic-accounts/bank']);
  }

  upperCaseInput(formControlName): void {
    const val = this.bankForm.controls[formControlName].value
    if (val)
      this.bankForm.controls[formControlName].setValue(val.toUpperCase());
  }

}
