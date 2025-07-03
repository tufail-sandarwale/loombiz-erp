import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { TranslocoModule } from '@ngneat/transloco';
import { RvAutoCompleteComponent } from 'app/modules/shared/component/rv-auto-complete/rv-auto-complete.component';
import { map, Observable, startWith } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'app/core/services/alerts.service';
import { UserService } from 'app/core/user/user.service';
import { PaymentService } from '../payment.service';
import { RVFormUtilsService } from 'app/core/util/rvform-utils.service';
import { MatRadioChange } from '@angular/material/radio';
import { valid } from 'chroma-js';
@Component({
  selector: 'app-payment-add-edit',
  standalone: true,
  imports: [CommonModule,TranslocoModule,SharedFormFmodules,
    RvAutoCompleteComponent,
    SharedMaterialModules],
  templateUrl: './payment-add-edit.component.html',
  styleUrl: './payment-add-edit.component.scss',
  providers: [DatePipe] 
})
export class PaymentAddEditComponent {
  @Input() openFrom: any;
  @Output() action = new EventEmitter<any>();
 paymentForm: FormGroup;
 currentPayment;
 showBankOptions;
 paymentStatuses = ['cleared', 'pending', 'failed']; // Example statuses
  editMode = false;
  filteredList: Observable<any[]>;
  sessionUser;
  roleKeyValues;
  selectedPaymentOption: string; // Tracks the selected option in the first radio group
  selectedBankOption: string; // Tracks the selected option in the second radio group
  accountGroupOptions: { key: string; value: string }[] = [];
  accountList;
  payTypeOptions;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router,
    private alertService: AlertsService,
    private userSerive: UserService,
    private datePipe: DatePipe,
    public formUtils: RVFormUtilsService) {
       
    this.selectedPaymentOption = ''; 
    this.selectedBankOption = ''; 
    this.userSerive.user$.subscribe({
      next: user => {
        this.sessionUser = user;
        this.createPaymentForm();
        this.currentPayment = this.route.snapshot.data['payment'];
        this.route.params.subscribe((params) => {
          const id = params['id'];
          if (id && this.currentPayment) {
            this.editMode = true;
            this.loadPaymentData(id);
           
          }
        });
      },
      error: error => {

      }
    })

  }

  ngOnInit(): void {
     this.createPaymentForm();
     this.loadAccountGroups('');
     this.loadAccount();
     this.selectedPaymentOption = this.paymentForm.get('paymentMode')?.value;
     this.selectedBankOption = this.paymentForm.get('bankType')?.value;
     this.formatInitialDates();
// this.customerForm.get('country')?.setValue('IN');
}
onPaymentOptionChange(event: any): void {
  const selectedPaymentType = event.value;

  if (selectedPaymentType === 'cash') {
    this.clearBankDetails(); // Reset and disable bank-related fields
    this.paymentForm.get('bankType')?.disable(); // Explicitly disable bankType control
  } else if (selectedPaymentType === 'bank') {
    this.paymentForm.get('bankType')?.enable(); // Enable bank option group
    this.onBankOptionChange({ value: this.paymentForm.get('bankType')?.value });
  }

  // Dynamically load account groups based on payment type
  this.loadAccountGroups(selectedPaymentType);
}

loadAccountGroups(selectedPaymentType: string): void {
  if (selectedPaymentType === 'cash') {
    console
    this.paymentService.getCashAccountGroups().subscribe({
      next: (result) => {
        console.log('cash account groups', result);
        this.accountGroupOptions = (result || []).map(accountGroup => ({
          key: accountGroup.id,
          value: accountGroup.groupName
        }));
      },
      error: (err) => {
        console.error('Error loading cash accounts:', err);
        this.accountGroupOptions = [];
      }
    });
  } else if (selectedPaymentType === 'bank') {
    this.paymentService.getBankAccountGroups().subscribe({
      next: (result) => {
        this.accountGroupOptions = (result || []).map(accountGroup => ({
          key: accountGroup.id,
          value: accountGroup.groupName
        }));
      },
      error: (err) => {
        console.error('Error loading bank accounts:', err);
        this.accountGroupOptions = [];
      }
    });
  } else {
    this.accountGroupOptions = []; // Clear if no selection
  }
}


loadAccount() {
  this.paymentService.getAccount().subscribe({
    next: (result) => {
      this.accountList = result.map(account => ({
        key: account.id,
        value: account.accountName
      }));

      // Ensure patching happens after accountList is loaded
      if (this.editMode && this.currentPayment) {
        this.paymentForm.get('accountsDetails')?.setValue(this.currentPayment.accountsDetails?.id);
      }
    },
    error: error => {
      this.alertService.showAlert(error.error.message, false);
    }
  });
}


  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      transactionDate: [new Date().toISOString().split('T')[0]], // Set default to today
      paymentDate: [new Date().toISOString().split('T')[0]],     // Set default to today
      chequeDate: [new Date().toISOString().split('T')[0]],      // Set default to today
      paymentId: [''],
      bankType: [''],
      paymentType: ['', Validators.required], // Required payment type
      transactionNo: [''],
      transactionType: [''],
      accountGroup:  ['', Validators.required], // Required account group
      chequeNo: [''],
      paymentMode: ['', Validators.required], // Required payment mode
      amount: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      paymentStatus:  [null, Validators.required], // Set required if needed
      accountsDetails: [''],
      
       paymentNo: [''],
      // bankType: [''],
      // billNo: [''],
      // kasarAmount: [0.00, Validators.pattern(/^\d*\.?\d{0,2}$/)],
      // amount: [0.00, Validators.pattern(/^\d*\.?\d{0,2}$/)],
      // PaymentAmount: [0.00, Validators.pattern(/^\d*\.?\d{0,2}$/)],
      // pendingAmount: [0.00, Validators.pattern(/^\d*\.?\d{0,2}$/)],
      // netAmount: [0.00, Validators.pattern(/^\d*\.?\d{0,2}$/)],
      // paidAmount: [0.00, Validators.pattern(/^\d*\.?\d{0,2}$/)]
    });
    console.log('Patched form values:', this.paymentForm.value);
  }

 

   // Handle changes when the payment type is changed (cash/bank)
 
  
  onBankOptionChange(event: any): void {
    const selectedBankOption = event.value;
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

    if (selectedBankOption === 'online') {
      // Enable and set validators for transaction-related fields
      this.paymentForm.get('transactionDate').enable();
      // Set default transaction date
      this.paymentForm.get('transactionDate').setValue(currentDate);
      this.paymentForm.get('transactionDate').setValidators([Validators.required]);
      
      this.paymentForm.get('transactionNo').enable();
      this.paymentForm.get('transactionNo').setValidators([Validators.required]);
  
      // Disable cheque-related fields
      this.paymentForm.get('chequeDate').reset();
      this.paymentForm.get('chequeDate').disable();
      
      this.paymentForm.get('chequeNo').reset();
      this.paymentForm.get('chequeNo').disable();
    } else if (selectedBankOption === 'cheque') {
      // Enable and set validators for cheque-related fields
      this.paymentForm.get('chequeDate').enable();
       // Set default cheque date
       this.paymentForm.get('chequeDate').setValue(currentDate);
      this.paymentForm.get('chequeDate').setValidators([Validators.required]);
      
      this.paymentForm.get('chequeNo').enable();
      this.paymentForm.get('chequeNo').setValidators([Validators.required]);
  
      // Disable transaction-related fields
      this.paymentForm.get('transactionDate').reset();
      this.paymentForm.get('transactionDate').disable();
      
      this.paymentForm.get('transactionNo').reset();
      this.paymentForm.get('transactionNo').disable();
    }
  
    // Update the validity of all form controls
    this.paymentForm.get('transactionDate').updateValueAndValidity();
    this.paymentForm.get('transactionNo').updateValueAndValidity();
    this.paymentForm.get('chequeDate').updateValueAndValidity();
    this.paymentForm.get('chequeNo').updateValueAndValidity();
  }
  clearBankDetails(): void {
    // Disable and clear transaction-related fields
    this.paymentForm.get('transactionDate').reset();
    this.paymentForm.get('transactionDate').disable();
    
    this.paymentForm.get('transactionNo').reset();
    this.paymentForm.get('transactionNo').disable();
  
    // Disable and clear cheque-related fields
    this.paymentForm.get('chequeDate').reset();
    this.paymentForm.get('chequeDate').disable();
    
    this.paymentForm.get('chequeNo').reset();
    this.paymentForm.get('chequeNo').disable();
    
    // Disable the bank option radio group
    this.paymentForm.get('bankType').reset();
    // this.paymentForm.get('bankType').disable();
  }
  formatInitialDates() {
    const initialDate = this.paymentForm.get('transactionDate')?.value;
    if (initialDate) {
      const formattedDate = this.datePipe.transform(initialDate, 'yyyy-MM-dd');
      this.paymentForm.get('transactionDate')?.setValue(formattedDate);
      this.paymentForm.get('paymentDate')?.setValue(formattedDate);
      this.paymentForm.get('chequeDate')?.setValue(formattedDate);
    }
  }

 loadPaymentData(id: string): void {
  this.paymentService.getPaymentById(id).subscribe({
    next: (data) => {
      console.log('Edit data', data);
      this.currentPayment = data;
      this.editMode = true;
      // Load the account group based on the payment mode before patching
      this.loadAccountGroups(this.currentPayment.paymentMode);
      this.loadAccount();
      // After loading account groups, patch the form
      setTimeout(() => this.patchValues(), 500); // Allow async loading time
    },
    error: (error) => {
      console.error('Error fetching payment data:', error);
    },
  });
}


  patchValues() {
    this.paymentForm.patchValue({
      transactionDate: this.currentPayment.transactionDate,
      paymentDate: this.currentPayment.paymentDate,
      paymentType: this.currentPayment.paymentType,
      chequeDate: this.currentPayment.chequeDate,
       paymentNo: this.currentPayment.paymentNo,
      bankType: this.currentPayment.bankType,
     // bankType: this.currentPayment.bankType,
      paymentId:this.currentPayment.paymentId,
      transactionNo: this.currentPayment.transactionNo,
      transactionType: this.currentPayment.transactionType,
      accountGroup: this.currentPayment.accountGroup?.id,
      chequeNo: this.currentPayment.chequeNo,
      paymentMode: this.currentPayment.paymentMode,
      amount: this.currentPayment.amount,
      description: this.currentPayment.description,
      paymentStatus: this.currentPayment.paymentStatus,
      accountsDetails: this.currentPayment.accountsDetails?.id,

    //   billNo: this.currentPayment.billNo,
    //   kasarAmount: this.currentPayment.kasarAmount,
    //   amount: this.currentPayment.amount,
    // PaymentAmount: this.currentPayment.PaymentAmount,
    //   pendingAmount: this.currentPayment.pendingAmount,
    //   netAmount: this.currentPayment.netAmount,
    //   paidAmount: this.currentPayment.paidAmount,
    
    });
    
  }
  updateValidators(): void {
    const bankOptionControl = this.paymentForm.get('bankType');

    if (this.selectedPaymentOption === 'bank') {
      bankOptionControl.setValidators([Validators.required]);
    } else {
      bankOptionControl.clearValidators();
    }
    
    // If online option is selected
    if (this.selectedPaymentOption === 'bank' && this.paymentForm.get('bankType').value === 'online') {
      // Add any additional validators if needed
    }

    bankOptionControl.updateValueAndValidity(); // Refresh the validity state
  }
 
  onSubmit() {
  console.log("payment form value",this.paymentForm.value);
  if (!this.paymentForm.valid) {
    console.log('Form is invalid. Please check your inputs.');
  this.paymentForm.markAllAsTouched();
      return;
  }
    if (this.paymentForm.valid) {
       // Extract form data and include accountGroup
       const PaymentData = {
        ...this.paymentForm.value,
        accountGroup: {
          id: this.paymentForm.get('accountGroup')?.value, // Ensure 'accountGroup' exists in your form controls
        },
        accountsDetails: {
          id: this.paymentForm.get('accountsDetails')?.value, // Ensure 'accountsDetails' exists in your form controls
        }
      };
  
      console.log('Prepared payment data:', PaymentData);
      if (!this.editMode) {
        this.paymentService.addPayment(PaymentData).subscribe({
          next: () => {
            this.alertService.showAlert('Payment added successfully.', true);
            if (this.openFrom == 'dialog') {
              this.action.emit('close');
            } else {
              this.router.navigate(['/basic-accounts/payment']);
            }
          },
          error: error => {
            this.alertService.showAlert(error.message, false);
          }
        });
      } else {
        this.paymentService.updatePayment(this.currentPayment.id, PaymentData).subscribe({
          next: () => {
            this.alertService.showAlert('Payment updated successfully.', true);
            this.router.navigate(['/basic-accounts/payment']);
          },
          error: error => {
            this.alertService.showAlert(error.error.message, false);
          }
        });
      }
    }
  }

  
  cancel(){
      if (this.openFrom == 'dialog') {
        this.action.emit('close');
      } else {
        this.router.navigate(['/basic-accounts/payment']);
      }
    
    
  }
  
  getNumberFieldControl(controlName): any{
    //console.log('controlName', controlName);
    return this.paymentForm.get(controlName);
  }
 
   onFormControlSelected(controlPath: string, selectedValue: any) {
   // console.log(`Selected value for ${controlPath}:`, selectedValue);
    const formControl = this.paymentForm.get(controlPath);
   // console.log(`Form control for ${controlPath}:`, formControl?.value);
    if (formControl) {
      formControl.setValue(selectedValue);
    } else {
      console.error(`Form control for ${controlPath} not found.`);
    }
  }
  
}
