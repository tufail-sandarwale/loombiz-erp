import { Component, OnInit } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { TranslocoModule } from '@ngneat/transloco';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditNoteService } from '../credit-note.service';
import { RolesService } from 'app/modules/admin/admin-settings/roles/roles.service';
import { AlertsService } from 'app/core/services/alerts.service';
import { panValidator } from 'app/core/validators/rv-validators';
import { zip } from 'lodash';
import { RvAutoCompleteComponent } from 'app/modules/shared/component/rv-auto-complete/rv-auto-complete.component';
import { lab } from 'chroma-js';
import { Observable, from, map, startWith } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { EmployeeService } from 'app/modules/masters/employee/employee.service';
import { GetCommonService } from 'app/modules/shared/services/get-common.service'
import { ProductService } from 'app/modules/masters/product/product.service';

@Component({
  selector: 'app-credit-note-add-edit',
  standalone: true,
  imports: [CommonModule,TranslocoModule,SharedFormFmodules,
    RvAutoCompleteComponent,
    SharedMaterialModules],
  templateUrl: './credit-note-add-edit.component.html',
  styleUrl: './credit-note-add-edit.component.scss',
  providers: [DatePipe]
})
export class CreditNoteAddEditComponent {

  creditNoteForm: FormGroup;
  currentCreditNote;
  editMode = false;
  filteredList: Observable<any[]>;
  sessionUser;
  roleKeyValues;
  accountList;
  accountGroupOptions;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RolesService,
    private creditNoteService: CreditNoteService,
    private router: Router,
    private alertService: AlertsService,
    private userSerive: UserService,
    private datePipe: DatePipe,
  private getCommonService: GetCommonService,
) {
    this.userSerive.user$.subscribe({
      next: user => {
        this.sessionUser = user;
         this.createCreditNoteForm();
        this.currentCreditNote = this.route.snapshot.data['bank'];
       // console.log( "Tax edit data", this.currentCreditNote)
        this.route.params.subscribe((params) => {
          const id = params['id'];
          if (id) {
            this.editMode = true;
            this.loadCreditNoteData(id);
          }
        });
      },
      error: error => {

      }
    })

  }
  ngOnInit(): void {
   
   
   
    this.loadAccount();
    
  }
  loadAccount()  {
    this.creditNoteService.getAccount().subscribe({
      next: result => {
        console.log('account', result);
        // this.accountList = account;
        this.accountList = result.content.map(account => ({
          key: account.id,
          value: account.accountName
        }));
      },
      error: error => {
        this.alertService.showAlert(error.error.message, false);
      }
    });
  }

  createCreditNoteForm() {
    this.creditNoteForm = this.formBuilder.group({
      transactionDate: [new Date().toISOString().split('T')[0]],
      fromAccount: [''],
      toAccount: [''],
      ammount: [0.00, Validators.pattern(/^\d*\.?\d{0,2}$/)],
      description : [''],
    
     
    });
  }

  patchValues() {
    this.creditNoteForm.patchValue({
      transactionDate:this.currentCreditNote.transactionDate,
      fromAccount: this.currentCreditNote.fromAccount,
      toAccount: this.currentCreditNote.toAccount,
      ammount : this.currentCreditNote.ammount,
      description: this.currentCreditNote.description, 
      
    });
  }
  

  loadCreditNoteData(id: string): void {
    this.creditNoteService.getCreditNoteById(id).subscribe({
      next: (creditNote) => {
        console.log('Credit Note edit data', creditNote);
        
        this.currentCreditNote = creditNote;
        this.patchValues();
      },
      error: (error) => {
        console.error('Error fetching Credit Note data:', error);
      },
    });
  }

 
  onSubmit() {
    if (this.creditNoteForm.valid) {
      const creditData = this.creditNoteForm.value;
     // const taxDataJson = JSON.stringify(taxData);
     //console.log("taxData >>>> " ,taxData);
     
      if (!this.editMode) {
        
        this.creditNoteService.addCreditNote(creditData).subscribe({
          next: result => {
            this.alertService.showAlert('Credit Note Details Add Successfully', true)
            this.router.navigate(['/basic-accounts/crredit-note']);;
          },
          error: error => {
            this.alertService.showAlert('Error while create Credit Note Details', false)
          }
        })
      } else {
       console.log("edit Credit Note" , creditData);
        this.creditNoteService.updateCreditNote(this.currentCreditNote.id, this.creditNoteForm.value).subscribe({
          next: result => {
            this.alertService.showAlert('Credit Note Details Updated Successfully', true)
            this.router.navigate(['/basic-accounts/credit-note']);
          },
          error: error => {
            this.alertService.showAlert("Error while Update Credit Note Details", false)
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
    this.router.navigate(['/basic-accounts/credit-note']);
  }

  upperCaseInput(formControlName): void {
    const val = this.creditNoteForm.controls[formControlName].value
    if (val)
      this.creditNoteForm.controls[formControlName].setValue(val.toUpperCase());
  }

}
