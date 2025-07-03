import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { TranslocoModule } from '@ngneat/transloco';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { RolesService } from 'app/modules/admin/admin-settings/roles/roles.service';
import { AlertsService } from 'app/core/services/alerts.service';
import { panValidator } from 'app/core/validators/rv-validators';
import { zip } from 'lodash';
import { RvAutoCompleteComponent } from 'app/modules/shared/component/rv-auto-complete/rv-auto-complete.component';
import { lab } from 'chroma-js';
import { Observable, map, startWith } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { RVFormUtilsService } from 'app/core/util/rvform-utils.service';
@Component({
  selector: 'app-employee-add-edit',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, TranslocoModule, RvAutoCompleteComponent],
  templateUrl: './employee-add-edit.component.html',
  styleUrl: './employee-add-edit.component.scss'
})
export class EmployeeAddEditComponent implements OnInit {
  @Input() openFrom: any;
  @Output() action = new EventEmitter<any>();
  employeeForm: FormGroup;
  currentEmployee;
  editMode = false;
  filteredList: Observable<any[]>;
  roleKeyValues;
  sessionUser;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RolesService,
    private employeeService: EmployeeService,
    private router: Router,
    private alertService: AlertsService,
    private userSerive: UserService,
    public formUtils: RVFormUtilsService) {
    this.userSerive.user$.subscribe({
      next: user => {
        this.sessionUser = user;
        this.createEmployeeForm();
        this.currentEmployee = this.route.snapshot.data['user'];
        this.route.params.subscribe((params) => {
          const id = params['id'];
          if (id && this.currentEmployee) {
            this.editMode = true;
            this.patchValues();
          }
        });
      },
      error: error => {

      }
    })

  }
  ngOnInit(): void {
    this.loadRoles();
  }
  loadRoles() {
    this.roleService.getRoles().subscribe({
      next: result => {
        this.roleKeyValues = result.map(item => ({ key: item.id, value: item.name }));
        this.employeeForm.controls.role.setValue((this.currentEmployee && this.currentEmployee.roles && this.currentEmployee.roles.length > 0) ? this.currentEmployee.roles[0].id : null);
        this.handleRoleValueChanges();
      }
    })
  }

  createEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      pan: [''],
      dateOfBirth: [''],
      dateOfJoining: [''],
      manager: [false],
      deliveryUser: [false],
      salaryAccount: [false],
      address1: [''],
      address2: [''],
      country: [''],
      state: [''],
      city: [''],
      zipCode: [''],
      bankName: [''],
      branchName: [''],
      accountNumber: [''],
      accountHolderName: [''],
      swiftCode: [''],
      username: [''],
      password: [''],
      role: [null],
      wages: [0.00, Validators.pattern(/^\d*\.?\d{0,2}$/)],
      commission: [0.00, Validators.pattern(/^\d*\.?\d{0,2}$/)],
      extraWages: [0.00, Validators.pattern(/^\d*\.?\d{0,2}$/)],
      target: [0.00, Validators.pattern(/^\d*\.?\d{0,2}$/)]
    });
  }

  patchValues() {
    this.employeeForm.patchValue({
      firstName: this.currentEmployee.firstName,
      lastName: this.currentEmployee.lastName,
      email: this.currentEmployee.email,
      mobileNumber: this.currentEmployee.phoneNumber,
      pan: this.currentEmployee.customFields.find(item => item.key == 'PAN').value,
      dateOfBirth: this.currentEmployee.dateOfBirth,
      dateOfJoining: this.currentEmployee.customFields.find(item => item.key == 'DATE_OF_JOINING').value,
      manager: this.currentEmployee.customFields.find(item => item.key == 'MANAGER').value,
      deliveryUser: this.currentEmployee.customFields.find(item => item.key == 'DELIVERY_USER').value,
      salaryAccount: this.currentEmployee.customFields.find(item => item.key == 'SALARY_ACCOUNT').value,
      bankName: this.currentEmployee.customFields.find(item => item.key == 'BANK_NAME').value,
      branchName: this.currentEmployee.customFields.find(item => item.key == 'BRANCH_NAME').value,
      accountNumber: this.currentEmployee.customFields.find(item => item.key == 'ACCOUNT_NUMBER').value,
      accountHolderName: this.currentEmployee.customFields.find(item => item.key == 'ACCOUNT_HOLDER_NAME').value,
      swiftCode: this.currentEmployee.customFields.find(item => item.key == 'SWIFT_CODE').value,
      wages: this.currentEmployee.customFields.find(item => item.key == 'WAGES').value,
      commission: this.currentEmployee.customFields.find(item => item.key == 'COMMISSION').value,
      extraWages: this.currentEmployee.customFields.find(item => item.key == 'EXTRA_WAGES').value,
      target: this.currentEmployee.customFields.find(item => item.key == 'TARGET').value,
      address1: (this.currentEmployee.address && this.currentEmployee.address.length > 0) ? this.currentEmployee.address[0].address1 : null,
      address2: (this.currentEmployee.address && this.currentEmployee.address.length > 0) ? this.currentEmployee.address[0].address2 : null,
      country: (this.currentEmployee.address && this.currentEmployee.address.length > 0) ? this.currentEmployee.address[0].country : null,
      state: (this.currentEmployee.address && this.currentEmployee.address.length > 0) ? this.currentEmployee.address[0].state : null,
      city: (this.currentEmployee.address && this.currentEmployee.address.length > 0) ? this.currentEmployee.address[0].city : null,
      zipCode: (this.currentEmployee.address && this.currentEmployee.address.length > 0) ? this.currentEmployee.address[0].zipcode : null,
      username: this.currentEmployee.username,
      password: this.currentEmployee.password,
    });
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      let employee = this.getEmployeeObjectFromEmployeeForm();
      if (!this.editMode) {
        this.employeeService.createUser(employee).subscribe({
          next: result => {
            this.alertService.showAlert('Employee Added Successfully', true)
            if (this.openFrom == 'dialog') {
              this.action.emit(result);
            } else {
              this.router.navigate(['/masters/employee']);
            }
          },
          error: error => {
            this.alertService.showAlert('Error while create Employee', false)
          }
        })
      } else {
        this.employeeService.updateUser(this.currentEmployee.id, employee).subscribe({
          next: result => {
            this.alertService.showAlert('Employee Updated Successfully', true)
            this.router.navigate(['/masters/employee']);
          },
          error: error => {
            this.alertService.showAlert("Error while Update Employee", false)
          }
        })
      }
    }
  }

  getEmployeeObjectFromEmployeeForm(): any {
    let employee;
    if (!this.editMode) {
      employee = {
        firstName: this.employeeForm.controls['firstName'].value,
        lastName: this.employeeForm.controls['lastName'].value,
        email: this.employeeForm.controls['email'].value,
        phoneNumber: this.employeeForm.controls['mobileNumber'].value,
        dateOfBirth: this.employeeForm.controls['dateOfBirth'].value,
        username: this.employeeForm.controls['username'].value,
        password: this.employeeForm.controls['password'].value,
        roles: this.employeeForm.controls['role'].value ? [{ id: this.employeeForm.controls['role'].value }] : [],
        customFields: this.getCustomFields(),
        address: [this.getAddress()],
        preferences: this.getPreferences(),
        active: true,
      }
    } else {
      employee = this.currentEmployee;
      employee.firstName = this.employeeForm.controls['firstName'].value;
      employee.lastName = this.employeeForm.controls['lastName'].value;
      employee.email = this.employeeForm.controls['email'].value;
      employee.phoneNumber = this.employeeForm.controls['mobileNumber'].value;
      employee.dateOfBirth = this.employeeForm.controls['dateOfBirth'].value;
      employee.username = this.employeeForm.controls['username'].value;
      employee.password = this.employeeForm.controls['password'].value;
      employee.roles = this.employeeForm.controls['role'].value ? [{ id: this.employeeForm.controls['role'].value }] : [];
      employee.customFields = this.getCustomFields();
      employee.address = [this.getAddress()];
      employee.preferences = this.getPreferences();
      employee.active = true;
    }
    return employee;
  }

  getCustomFields(): any[] {
    let customFields = [
      { key: 'PAN', value: this.employeeForm.controls['pan'].value },
      { key: 'DATE_OF_JOINING', value: this.employeeForm.controls['dateOfJoining'].value },
      { key: 'MANAGER', value: this.employeeForm.controls['manager'].value },
      { key: 'DELIVERY_USER', value: this.employeeForm.controls['deliveryUser'].value },
      { key: 'SALARY_ACCOUNT', value: this.employeeForm.controls['salaryAccount'].value },
      { key: 'BANK_NAME', value: this.employeeForm.controls['bankName'].value },
      { key: 'BRANCH_NAME', value: this.employeeForm.controls['branchName'].value },
      { key: 'ACCOUNT_NUMBER', value: this.employeeForm.controls['accountNumber'].value },
      { key: 'ACCOUNT_HOLDER_NAME', value: this.employeeForm.controls['accountHolderName'].value },
      { key: 'SWIFT_CODE', value: this.employeeForm.controls['swiftCode'].value },
      { key: 'WAGES', value: this.employeeForm.controls['wages'].value },
      { key: 'COMMISSION', value: this.employeeForm.controls['commission'].value },
      { key: 'EXTRA_WAGES', value: this.employeeForm.controls['extraWages'].value },
      { key: 'TARGET', value: this.employeeForm.controls['target'].value }
    ]
    return customFields.filter(item => item.value != null);
  }

  getAddress(): any {
    return {
      address1: this.employeeForm.controls['address1'].value,
      address2: this.employeeForm.controls['address2'].value,
      country: this.employeeForm.controls['country'].value,
      state: this.employeeForm.controls['state'].value,
      city: this.employeeForm.controls['city'].value,
      zipcode: this.employeeForm.controls['zipCode'].value
    }
  }

  getPreferences() {
    return {
      language: 'en',
      theme: 'theme-brand',
      dark: false,
      layout: 'classy'
    }
  }
  handleRoleValueChanges() {
    this.filteredList = this.employeeForm.controls['role'].valueChanges.pipe(
      startWith(''),
      map(value => {
        let list = value ? this._filterList(value as string) : this.roleKeyValues.slice();
        if (!list || list.length == 0) {
          this.employeeForm.controls['role'].setValue(null);
        }
        return list;
      }),

    );
  }

  displayFormElement = (selectedElement) => {
    return selectedElement && selectedElement != "" ? this.roleKeyValues.find(o => o.key == selectedElement).value : null;
  }

  private _filterList(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.roleKeyValues.filter(option => (option?.key.toLowerCase().includes(filterValue) || option?.value.toLowerCase().includes(filterValue)));
  }

  cancel() {
    if (this.openFrom == 'dialog') {
      this.action.emit('close');
    } else {
      this.router.navigate(['/masters/employee']);
    }
  }

  upperCaseInput(formControlName): void {
    const val = this.employeeForm.controls[formControlName].value
    if (val)
      this.employeeForm.controls[formControlName].setValue(val.toUpperCase());
  }
  getNumberFieldControl(controlName): any {
    //console.log('controlName', controlName);
    return this.employeeForm.get(controlName);
  }
}
