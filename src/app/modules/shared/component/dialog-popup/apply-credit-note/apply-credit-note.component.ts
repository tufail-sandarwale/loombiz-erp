import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { RvDisplayPricePipe } from 'app/core/pipe/rv-display-price.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { RvAutoCompleteComponent } from '../../rv-auto-complete/rv-auto-complete.component';

export interface CreditNoteDialogData {
  creditNoteBalance: number;
  finalPayableAmount: number;
  advanceReceipt: any;
}

@Component({
  selector: 'app-apply-credit-note',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, TranslocoModule, RvDisplayPricePipe, RvAutoCompleteComponent],
  templateUrl: './apply-credit-note.component.html',
  styleUrls: ['./apply-credit-note.component.scss']
})
export class ApplyCreditNoteComponent {
  creditNoteForm: FormGroup;
  maxAllowedAmount: number;
  advanceReceipt: any;
  advancePaymentElement = {
    name: 'receiptNo',
    placeholder: 'Scan / SelectAdvance Payment',
    options: [],
  };
  selectedAdvancePayment: any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ApplyCreditNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreditNoteDialogData
  ) {
    // Calculate the maximum allowed amount (minimum of credit note balance and final payable amount)
    this.maxAllowedAmount = Math.min(this.data.creditNoteBalance, this.data.finalPayableAmount);
    this.advanceReceipt = this.data.advanceReceipt;
    this.fillAdvancePayments();
    this.creditNoteForm = this.fb.group({
      creditNoteType: ['credit_note', Validators.required],
      receiptNo: [''],
      receiptUsedAmount: [''],
      amount: ['', [
        Validators.required,
        Validators.min(1),
      ]]
    });
  }

  fillAdvancePayments() {
    this.advanceReceipt.map(item => {
      item['usedAmount'] = item['usedAmount'] ? item['usedAmount'] : 0
      item['balance'] = item['amount'] - item['usedAmount']
      if(item['balance'] > 0) {
        this.advancePaymentElement.options.push({ key: item.id, value: item.receiptNo })
      }
    })
  }
  get amount() {
    return this.creditNoteForm.get('amount');
  }

  onSubmit() {
    if (this.creditNoteForm.valid) {
      const amount = this.creditNoteForm.get('amount')?.value;
      if (amount <= this.maxAllowedAmount || amount <= this.maxPaybleAmount) {
        let creditNoteObj = {
          creditNoteType: this.creditNoteForm.get('creditNoteType')?.value,
          receiptNo: this.creditNoteForm.get('creditNoteType')?.value === 'credit_note' ? null : this.selectedAdvancePayment?.receiptNo,
          amount: amount,
          paymentMode: this.creditNoteForm.get('creditNoteType')?.value === 'credit_note' ? 'credit_note' : this.selectedAdvancePayment?.paymentMode
        }
        this.dialogRef.close(creditNoteObj);
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  advancePaymentClickEvent(event: any) {
    this.selectedAdvancePayment = this.advanceReceipt.find(item => item.id == event)
    console.log(event)
  }

  get maxPaybleAmount(): number {
    if (this.selectedAdvancePayment?.balance > this.data.finalPayableAmount) {
      return this.data.finalPayableAmount;
    } else {
      return this.selectedAdvancePayment?.balance || 0;
    }
  }

}
