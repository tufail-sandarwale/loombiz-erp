import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RvDisplayPricePipe } from 'app/core/pipe/rv-display-price.pipe';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertsService } from 'app/core/services/alerts.service';
import { AccountService } from 'app/modules/basic-accounts/account/account.service';
import { MultiPayDialogComponent } from '../multi-pay-dialog/multi-pay-dialog.component';

@Component({
  selector: 'app-sale-txn-card-upi-payment',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, RvDisplayPricePipe],
  templateUrl: './sale-txn-card-upi-payment.component.html',
  styleUrl: './sale-txn-card-upi-payment.component.scss'
})
export class SaleTxnCardUpiPaymentComponent {
  paymentForm: FormGroup;
  paymentAccounts: any[] = [];
  paymentModes: any[] = [];
  finalAmount = 0;
  paymentMode;
  constructor(
    public dialogRef: MatDialogRef<SaleTxnCardUpiPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.paymentMode = this.data.paymentMode;
    this.finalAmount = Number((this.data.billData.finalPayableAmount).toFixed(2));
    this.paymentForm = this.fb.group({
      paymentMode: [this.paymentMode, Validators.required],
      paymentAmount: [this.finalAmount, [Validators.required, Validators.min(1)]],
      paymentAccount: [null],
      bankAccount: [null],
      customerUpiId: [null],
      cardHolderName: [null],
      cardTransactionNumber: [null]
    });
    this.loadAccountsByParentGroup('Bank Account');
  }
  submitPayment() {
    if (this.paymentForm.valid) {
      this.dialogRef.close(this.paymentForm.value);
    }
  }

  loadAccountsByParentGroup(parentGroup: string) {
    this.accountService.getAccountsByParentGroup(parentGroup).subscribe(result => {
      this.paymentAccounts = result.map(item => ({ key: item.id, value: item.accountName }));
      this.paymentForm.get('paymentAccount').setValue(this.paymentAccounts[0].key);
    })
  }

  onCancel() {
    this.dialogRef.close();
  }
}
