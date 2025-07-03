import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'app/core/services/alerts.service';
import { RvDisplayPricePipe } from 'app/core/pipe/rv-display-price.pipe';
import { AccountService } from 'app/modules/basic-accounts/account/account.service';

@Component({
  selector: 'app-multi-pay-dialog',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, RvDisplayPricePipe],
  templateUrl: './multi-pay-dialog.component.html',
  styleUrl: './multi-pay-dialog.component.scss'
})
export class MultiPayDialogComponent {
  loaded = false;
  billDetailsDataSource = new MatTableDataSource<any>([]);
  columns = ['position', 'name', 'qty', 'amount'];
  paymentForm: FormGroup;
  paymentAccounts: any[] = [];
  paymentModes: any[] = [];
  finalAmount = 0;
  constructor(
    public dialogRef: MatDialogRef<MultiPayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private alertService: AlertsService,
    private accountService: AccountService
  ) {
    this.finalAmount = Number((this.data.billData.finalPayableAmount).toFixed(2));
    this.paymentForm = this.fb.group({
      payments: this.fb.array([this.createPaymentGroup('cash', this.finalAmount)])
    });
  }
  ngOnInit(): void {
    let data = this.data.billData.saleDetails.map((element, index) => {
      return { position: index + 1, name: element.shortName, qty: element.qty, amount: element.netSellingPriceSubTotal };
    });
    this.billDetailsDataSource.data = data;
    this.getPaymentAccounts();
    this.getPaymentMethods();
    this.loadAccountsByParentGroup('Bank Account');
    this.loaded = true;
  }

  createPaymentGroup(paymentMode: string = '', amount: number = null): FormGroup {
    return this.fb.group({
      paymentMode: [paymentMode, Validators.required],
      paymentAmount: [amount, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      paymentAccount: [null],
      bankAccount: [null],
      upiId: [null],
      chequeNumber: [null],
      cardHolderName: [null],
      cardTransactionNumber: [null]
    });
  }
  setDefaultPayment() {

  }
  get payments(): FormArray {
    return this.paymentForm.get('payments') as FormArray;
  }
  addPayment(): void {
    let addedAmount = this.addedAmount;
    if (addedAmount >= this.finalAmount) {
      this.alertService.showAlert('Amount is Already Added', false);
      return;
    }
    let paymentMode = 'cash';
    let remainingAmount = Number((this.finalAmount - addedAmount).toFixed(2));
    this.payments.push(this.createPaymentGroup(paymentMode, remainingAmount));
  }

  get addedAmount(): number {
    let amount = this.payments.controls.reduce((total, paymentGroup: FormGroup) => {
      const amount = paymentGroup.get('paymentAmount')?.value;
      return total + (amount ? +amount : 0); // Convert amount to number and add to total
    }, 0);
    return Number(amount.toFixed(2));
  }

  removePayment(index: number): void {
    this.payments.removeAt(index);
  }

  submitPayment() {
    let remainingAmount = this.finalAmount - this.addedAmount;
    if(remainingAmount > 0){
      this.payments.push(this.createPaymentGroup('pay_later', remainingAmount));
    }
    if(this.payments.value){
      this.dialogRef.close(this.payments.value);
    }
  }
  getPaymentAccounts() {
    this.paymentAccounts = [
      { key: 'hdfc_kondwa', value: 'HDFC KONDWA' },
      { key: 'sbi_kondwa', value: 'SBI KONDWA' }
    ];
  }

  getPaymentMethods() {
    this.paymentModes = [
      { key: 'cash', value: 'Cash' },
      { key: 'card', value: 'Card' },
      { key: 'upi', value: 'UPI' },
      { key: 'bank', value: 'Bank' },
      { key: 'cheque', value: 'Cheque' },
      { key: 'wallet', value: 'Wallet' }
    ];
  }

  loadAccountsByParentGroup(parentGroup: string) {
    this.accountService.getAccountsByParentGroup(parentGroup).subscribe(result => {
      this.paymentAccounts = result.map(item => ({ key: item.id, value: item.accountName }));
    })
  }
}
