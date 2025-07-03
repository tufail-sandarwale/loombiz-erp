import { Component, OnInit } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { TranslocoModule } from '@ngneat/transloco';
import { ActivatedRoute, Router } from '@angular/router';
import { DebitNoteService } from '../debit-note.service';
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
  selector: 'app-debit-note-add-edit',
  standalone: true,
  imports: [CommonModule,TranslocoModule,SharedFormFmodules,
      RvAutoCompleteComponent,
      SharedMaterialModules],
  templateUrl: './debit-note-add-edit.component.html',
  styleUrl: './debit-note-add-edit.component.scss'
})
export class DebitNoteAddEditComponent {

  debitNoteForm: FormGroup;
  currentDebitNote;
  editMode = false;
  filteredList: Observable<any[]>;
  sessionUser;
  roleKeyValues;
  accountList;
  accountGroupOptions;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RolesService,
    private debitNoteService: DebitNoteService,
    private router: Router,
    private alertService: AlertsService,
    private userSerive: UserService,
    private datePipe: DatePipe,
  private getCommonService: GetCommonService,
) {
    this.userSerive.user$.subscribe({
      next: user => {
        this.sessionUser = user;
         this.createDebitNoteForm();
        this.currentDebitNote = this.route.snapshot.data['bank'];
       // console.log( "Tax edit data", this.currentDebitNote)
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
    this.debitNoteService.getAccount().subscribe({
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

  createDebitNoteForm() {
    this.debitNoteForm = this.formBuilder.group({
      transactionDate: [new Date().toISOString().split('T')[0]],
      fromAccount: [''],
      toAccount: [''],
      ammount: [0.00, Validators.pattern(/^\d*\.?\d{0,2}$/)],
      description : [''],
    
     
    });
  }

  patchValues() {
    this.debitNoteForm.patchValue({
      transactionDate:this.currentDebitNote.transactionDate,
      fromAccount: this.currentDebitNote.fromAccount,
      toAccount: this.currentDebitNote.toAccount,
      ammount : this.currentDebitNote.ammount,
      description: this.currentDebitNote.description, 
      
    });
  }
  

  loadCreditNoteData(id: string): void {
    this.debitNoteService.getDebitNoteById(id).subscribe({
      next: (creditNote) => {
        console.log('Debit Note edit data', creditNote);
        
        this.currentDebitNote = creditNote;
        this.patchValues();
      },
      error: (error) => {
        console.error('Error fetching Debit Note data:', error);
      },
    });
  }

 
  onSubmit() {
    if (this.debitNoteForm.valid) {
      const creditData = this.debitNoteForm.value;
     // const taxDataJson = JSON.stringify(taxData);
     //console.log("taxData >>>> " ,taxData);
     
      if (!this.editMode) {
        
        this.debitNoteService.addDebitNote(creditData).subscribe({
          next: result => {
            this.alertService.showAlert('Debit Note Details Add Successfully', true)
            this.router.navigate(['/basic-accounts/debit-note']);;
          },
          error: error => {
            this.alertService.showAlert('Error while create Debit Note Details', false)
          }
        })
      } else {
       console.log("edit Debit Note" , creditData);
        this.debitNoteService.updateDebitNote(this.currentDebitNote.id, this.debitNoteForm.value).subscribe({
          next: result => {
            this.alertService.showAlert('Debit Note Details Updated Successfully', true)
            this.router.navigate(['/basic-accounts/debit-note']);
          },
          error: error => {
            this.alertService.showAlert("Error while Update Debit Note Details", false)
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
    this.router.navigate(['/basic-accounts/debit-note']);
  }

  upperCaseInput(formControlName): void {
    const val = this.debitNoteForm.controls[formControlName].value
    if (val)
      this.debitNoteForm.controls[formControlName].setValue(val.toUpperCase());
  }

}
