import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { TranslocoModule } from '@ngneat/transloco';
import { RvAutoCompleteComponent } from 'app/modules/shared/component/rv-auto-complete/rv-auto-complete.component';
import { map, Observable, startWith } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'app/core/services/alerts.service';
import { UserService } from 'app/core/user/user.service';
import { ReceiptService } from '../receipt.service';
import { RVFormUtilsService } from 'app/core/util/rvform-utils.service';
import { MatRadioChange } from '@angular/material/radio';
import { valid } from 'chroma-js';

@Component({
  selector: 'app-receipt-add-edit',
  standalone: true,
  imports: [CommonModule,TranslocoModule,SharedFormFmodules,
    RvAutoCompleteComponent,
    SharedMaterialModules],
  templateUrl: './receipt-add-edit.component.html',
  styleUrl: './receipt-add-edit.component.scss',
  providers: [DatePipe] 
})
export class ReceiptAddEditComponent {
  receiptForm: FormGroup;
  currentReceipt;
  showBankOptions;
  receiptStatuses = ['cleared', 'pending', 'failed']; // Example statuses
   editMode = false;
   filteredList: Observable<any[]>;
   sessionUser;
   roleKeyValues;
   selectedPaymentOption: string; // Tracks the selected option in the first radio group
   selectedBankOption: string; // Tracks the selected option in the second radio group
   accountGroupOptions;
   accountList;
   invoiceDataSource;
  //  availableInvoices;
   availableInvoices: any[] = [];
  paymentTypesRequiringPayableAmount = ['AgainstVoucher', 'OnAccount','AdvancePayment'];
   displayedColumns: string[] = ['billNo', 'taxableAmount', 'netAmount', 'paidAmount', 'pendingAmount', 'kasarAmount', 'payableAmount', 'actions'];
   
   constructor(private formBuilder: FormBuilder,
     private route: ActivatedRoute,
     private receiptService: ReceiptService,
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
         this.createReceiptForm();
         this.currentReceipt = this.route.snapshot.data['receipt'];
         this.route.params.subscribe((params) => {
           const id = params['id'];
           if (id && this.currentReceipt) {
             this.editMode = true;
             this.loadReceiptData(id);
            
           }
         });
       },
       error: error => {
 
       }
     })
 
   }
 
   ngOnInit(): void {
      this.createReceiptForm();
      this.loadAccountGroups('');
      this.loadAccount();
      this.selectedPaymentOption = this.receiptForm.get('paymentMode')?.value;
      this.selectedBankOption = this.receiptForm.get('bankType')?.value;
      this.formatInitialDates();
      this.receiptForm.get('paymentType')?.valueChanges.subscribe(value => {
  this.updatePayableAmountValidators(value);
});
 // this.customerForm.get('country')?.setValue('IN');
 }
 
  loadAccountGroups(selectedPaymentType: string): void {
    if (selectedPaymentType === 'cash') {
      this.receiptService.getCashAccountGroups().subscribe({
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
      this.receiptService.getBankAccountGroups().subscribe({
        next: (result) => {
          console.log('bank account groups', result);
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

  loadAccount()  {
    this.receiptService.getAccount().subscribe({
      next: result => {
        console.log('account', result);
        // this.accountList = account;
        this.accountList = result.map(account => ({
          key: account.id,
          value: account.accountName
        }));
        // Ensure patching happens after accountList is loaded
        if (this.editMode && this.currentReceipt) {
          this.receiptForm.get('accountsDetails')?.setValue(this.currentReceipt.accountsDetails?.id);
        }
      },
      error: error => {
        this.alertService.showAlert(error.error.message, false);
      }
    });
  }

   
   createReceiptForm() {
     this.receiptForm = this.formBuilder.group({
       transactionDate: [new Date().toISOString().split('T')[0]], // Set default to today
       receiptDate: [new Date().toISOString().split('T')[0]],     // Set default to today
       chequeDate: [new Date().toISOString().split('T')[0]],      // Set default to today
       receiptId: [''],
       receiptNo: [''],
       bankType: [''],
       paymentType: ['', Validators.required], // Required payment type
    //  partyName: ['',],
       transactionNo: ['', Validators.required],
       transactionType: [''],
       accountGroup: ['', Validators.required],
       chequeNo: ['', Validators.required],
       paymentMode: ['', Validators.required], // Required payment mode
       amount: ['', [Validators.required, Validators.min(0)]],
       description: [''],
       receiptStatus:  [null, Validators.required], // Set required if needed
       accountsDetails:[''],
       againstVoucher: this.formBuilder.array([])
     });
     this.addRow();
   }
 
  
 
    // Handle changes when the payment type is changed (cash/bank)
  
     onPaymentOptionChange(event: any): void {
       const selectedPaymentType = event.value;
     
       if (selectedPaymentType === 'cash') {
         // If Cash is selected, disable all bank-related fields
         this.clearBankDetails(); // This function will reset and disable bank-related fields
       this.receiptForm.get('bankType')?.disable();
        } else if (selectedPaymentType === 'bank') {
         // If Bank is selected, enable the bank option and check which bank option is selected
         this.receiptForm.get('bankType').enable();  // Enable bank option group
         this.onBankOptionChange({ value: this.receiptForm.get('bankType').value }); // Recheck which bank option is selected
       }
       this.loadAccountGroups(selectedPaymentType);
     }
   onBankOptionChange(event: any): void {
     const selectedBankOption = event.value;
     const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
 
     if (selectedBankOption === 'online') {
       // Enable and set validators for transaction-related fields
       this.receiptForm.get('transactionDate').enable();
       // Set default transaction date
       this.receiptForm.get('transactionDate').setValue(currentDate);
       this.receiptForm.get('transactionDate').setValidators([Validators.required]);
       
       this.receiptForm.get('transactionNo').enable();
       this.receiptForm.get('transactionNo').setValidators([Validators.required]);
   
       // Disable cheque-related fields
       this.receiptForm.get('chequeDate').reset();
       this.receiptForm.get('chequeDate').disable();
       
       this.receiptForm.get('chequeNo').reset();
       this.receiptForm.get('chequeNo').disable();
     } else if (selectedBankOption === 'cheque') {
       // Enable and set validators for cheque-related fields
       this.receiptForm.get('chequeDate').enable();
        // Set default cheque date
        this.receiptForm.get('chequeDate').setValue(currentDate);
       this.receiptForm.get('chequeDate').setValidators([Validators.required]);
       
       this.receiptForm.get('chequeNo').enable();
       this.receiptForm.get('chequeNo').setValidators([Validators.required]);
   
       // Disable transaction-related fields
       this.receiptForm.get('transactionDate').reset();
       this.receiptForm.get('transactionDate').disable();
       
       this.receiptForm.get('transactionNo').reset();
       this.receiptForm.get('transactionNo').disable();
     }
   
     // Update the validity of all form controls
     this.receiptForm.get('transactionDate').updateValueAndValidity();
     this.receiptForm.get('transactionNo').updateValueAndValidity();
     this.receiptForm.get('chequeDate').updateValueAndValidity();
     this.receiptForm.get('chequeNo').updateValueAndValidity();
   }
   clearBankDetails(): void {
     // Disable and clear transaction-related fields
     this.receiptForm.get('transactionDate').reset();
     this.receiptForm.get('transactionDate').disable();
     
     this.receiptForm.get('transactionNo').reset();
     this.receiptForm.get('transactionNo').disable();
   
     // Disable and clear cheque-related fields
     this.receiptForm.get('chequeDate').reset();
     this.receiptForm.get('chequeDate').disable();
     
     this.receiptForm.get('chequeNo').reset();
     this.receiptForm.get('chequeNo').disable();
     
     // Disable the bank option radio group
     this.receiptForm.get('bankType').reset();
    //  this.receiptForm.get('bankType').disable();
   }
   formatInitialDates() {
     const initialDate = this.receiptForm.get('transactionDate')?.value;
     if (initialDate) {
       const formattedDate = this.datePipe.transform(initialDate, 'yyyy-MM-dd');
       this.receiptForm.get('transactionDate')?.setValue(formattedDate);
       this.receiptForm.get('receiptDate')?.setValue(formattedDate);
       this.receiptForm.get('chequeDate')?.setValue(formattedDate);
     }
   }
 
    loadReceiptData(id: string): void {
     this.receiptService.getReceiptById(id).subscribe({
       next: (data) => {
         console.log('edit data', data);
         this.currentReceipt= data;
         this.editMode = true;
         // Load the account group based on the payment type before patching
         this.loadAccountGroups(this.currentReceipt.paymentMode);
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
     this.receiptForm.patchValue({
       transactionDate: this.currentReceipt.transactionDate,
       receiptDate: this.currentReceipt.receiptDate,
       paymentType: this.currentReceipt.paymentType,
       chequeDate: this.currentReceipt.chequeDate,
       receiptNo: this.currentReceipt.receiptNo,
       bankType: this.currentReceipt.bankType,
       receiptId:this.currentReceipt.receiptId,
       transactionType:this.currentReceipt.transactionType,
       accountGroup: this.currentReceipt.accountGroup?.id, // Patch the ID
      // partyName: this.currentReceipt.partyName?.id, // Patch the ID
       transactionNo: this.currentReceipt.transactionNo,
       chequeNo: this.currentReceipt.chequeNo,
       paymentMode: this.currentReceipt.paymentMode,
       amount: this.currentReceipt.amount,
       description: this.currentReceipt.description,
       receiptStatus: this.currentReceipt.receiptStatus,
       accountsDetails: this.currentReceipt.accountsDetails?.id
     //   billNo: this.currentReceipt.billNo,
     //   kasarAmount: this.currentReceipt.kasarAmount,
     //   amount: this.currentReceipt.amount,
     // PaymentAmount: this.currentReceipt.PaymentAmount,
     //   pendingAmount: this.currentReceipt.pendingAmount,
     //   netAmount: this.currentReceipt.netAmount,
     //   paidAmount: this.currentReceipt.paidAmount,
     
     });
       // 👇 Trigger form control update logic manually
  this.onPaymentOptionChange({ value: this.currentReceipt.paymentMode });
  if (this.currentReceipt.paymentMode === 'bank') {
    this.onBankOptionChange({ value: this.currentReceipt.bankType });
  }

  this.updateValidators();
   }
   updateValidators(): void {
     const bankOptionControl = this.receiptForm.get('bankType');
 
     if (this.selectedPaymentOption === 'bank') {
       bankOptionControl.setValidators([Validators.required]);
     } else {
       bankOptionControl.clearValidators();
     }
     
     // If online option is selected
     if (this.selectedPaymentOption === 'bank' && this.receiptForm.get('bankType').value === 'online') {
       // Add any additional validators if needed
     }
 
     bankOptionControl.updateValueAndValidity(); // Refresh the validity state
   }
  
   onSubmit() {
   
    console.log("receipt form value", this.receiptForm.value);
  
    // Mark all fields as touched to show validation errors
    if (!this.receiptForm.valid) {
      this.receiptForm.markAllAsTouched();
      return;
    }
  
    if (this.receiptForm.valid) {
      // Extract form data and include accountGroup
      const receiptData = {
        ...this.receiptForm.value,
        accountGroup: {
          id: this.receiptForm.get('accountGroup')?.value, // Ensure 'accountGroup' exists in your form controls
        },
        accountsDetails: {
          id: this.receiptForm.get('accountsDetails')?.value, // Ensure 'accountsDetails' exists in your form controls
        }
      };
  // Add mode: Save new receipt
      if (!this.editMode) {
        this.receiptService.addReceipt(receiptData).subscribe({
          next: () => {
            this.alertService.showAlert('Receipt added successfully.', true);
            this.router.navigate(['/basic-accounts/receipt']);
          },
          error: (error) => {
            this.alertService.showAlert(error.error.message, false);
          }
        });
      } 
      // Edit mode: Update existing receipt
      else {
        this.receiptService.updateReceipt(this.currentReceipt.id, receiptData).subscribe({
          next: () => {
            console.log("update data",receiptData);
            this.alertService.showAlert('Receipt updated successfully.', true);
            this.router.navigate(['/basic-accounts/receipt']);
          },
          error: (error) => {
            this.alertService.showAlert(error.error.message, false);
          }
        });
      }
    }
  }
  
   
   cancel(){
     this.router.navigate(['/basic-accounts/receipt']);
   }
   
   getNumberFieldControl(controlName): any{
     //console.log('controlName', controlName);
     return this.receiptForm.get(controlName);
   }
  
    onFormControlSelected(controlPath: string, selectedValue: any) {
    // console.log(`Selected value for ${controlPath}:`, selectedValue);
     const formControl = this.receiptForm.get(controlPath);
    // console.log(`Form control for ${controlPath}:`, formControl?.value);
     if (formControl) {
       formControl.setValue(selectedValue);
     } else {
       console.error(`Form control for ${controlPath} not found.`);
     }
   }

   getInvoiceForAccountId(accountId) {
    // const accountId = this.receiptForm.get('accountsDetails')?.value;

    this.receiptService.getSeleOrderByAccountAndPaymentStatus(accountId).subscribe({
      next: (result) => { 
        // this.invoiceGridDataSource = result; 
        this.invoiceDataSource = result; 
        this.availableInvoices = this.invoiceDataSource.map((invoice) => invoice.invoiceNo);
      },
      error: (error) => {
        console.error('Error fetching invoice list:', error);
      }
    });
  }

  get voucherRows() {
    return this.receiptForm.get('againstVoucher') as FormArray;
  }

  createRow() {
    return this.formBuilder.group({
      billNo: [''],
      taxableAmount: [''],
      netAmount: [''],
      paidAmount: [''],
      pendingAmount: [''],
      kasarAmount: [''],
      payableAmount: ['',Validators.required],
      saleMasterId: [''],
      paymentType: [''],
    });
  }

  addRow() {
    this.voucherRows.push(this.createRow());  
  }

  setupValueChanges(index: number) {
    this.voucherRows.at(index).get('kasarAmount')?.valueChanges.subscribe((kasarAmount) => {
      const totalAmount = this.voucherRows.at(index).get('pendingAmount')?.value || 0;
  
      if (kasarAmount != null && kasarAmount !== '' && !isNaN(kasarAmount)) {
        const payableAmount = Number(totalAmount - kasarAmount).toFixed(2);
        this.voucherRows.at(index).get('payableAmount')?.setValue(payableAmount, { emitEvent: false });
        this.updateTotalPayableAmount();
      }
    });
  
    this.voucherRows.at(index).get('payableAmount')?.valueChanges.subscribe((payableAmount) => {
      const totalAmount = this.voucherRows.at(index).get('pendingAmount')?.value || 0;
      if (payableAmount > totalAmount) {
        this.voucherRows.at(index).get('payableAmount')?.setValue(totalAmount, { emitEvent: false });
      }
    });
  }

  updateTotalPayableAmount() {
    // const rows = this.receiptForm.get('voucherRows') as FormArray;
    // this.voucherRows.at(index).get('kasarAmount')?.valueChanges.subscribe((kasarAmount) => {
    let totalPayableAmount = this.voucherRows.controls.reduce((sum, row) => {
      let payableAmount = Number(row.get('payableAmount')?.value) || 0;
      return sum + payableAmount;
    }, 0);
   
    this.receiptForm.get('amount')?.setValue(totalPayableAmount.toFixed(2));
  }

  deleteRow(index: number) {
    this.voucherRows.removeAt(index);
    this.updateTotalPayableAmount();
  }

  getAvailableBills(currentIndex: number) {
    const allSelectedBills = this.voucherRows.controls
      .map((control, index) => index !== currentIndex ? control.get('billNo').value : null)
      .filter(bill => bill);
       const invoices = this.availableInvoices || [];
    return invoices.filter(bill => !allSelectedBills.includes(bill));
  }

  
  onInvoiceChange(index: number) {
    const selectedInvoiceId = this.voucherRows.at(index).get('billNo')?.value;
    const selectedInvoice = this.invoiceDataSource.find(inv => inv.invoiceNo === selectedInvoiceId);

    if (selectedInvoice) {
      const row = this.voucherRows.at(index);
      row.patchValue({
        taxableAmount: selectedInvoice.taxableValueTotal,
        netAmount: selectedInvoice.finalBillAmount,
        paidAmount: Number(selectedInvoice.finalBillAmount -selectedInvoice.dueAmount).toFixed(2),
        pendingAmount: selectedInvoice.dueAmount,
        payableAmount: selectedInvoice.dueAmount,
        saleMasterId: selectedInvoice.id
      });
      this.setupValueChanges(index);
      this.updateTotalPayableAmount();
    }
  }

  onSelectionChange() {
    if(this.receiptForm.get('paymentType')?.value === 'against_voucher') {
      (this.receiptForm.get('againstVoucher') as FormArray).reset();
      this.getInvoiceForAccountId(this.receiptForm.get('accountsDetails')?.value);
      if(this.voucherRows.length === 0) {
        this.addRow();
      }
    } else {
      (this.receiptForm.get('againstVoucher') as FormArray).clear();
    }
  }
  close(){
    this.router.navigate(['/basic-accounts/receipt']);
  }

 updatePayableAmountValidators(paymentType: string): void {
    this.voucherRows.controls.forEach(row => {
      const control = row.get('payableAmount');
      if (this.paymentTypesRequiringPayableAmount.includes(paymentType)) {
        control?.setValidators([Validators.required]);
      } else {
        control?.clearValidators();
      }
      control?.updateValueAndValidity();
    });
  }

}
