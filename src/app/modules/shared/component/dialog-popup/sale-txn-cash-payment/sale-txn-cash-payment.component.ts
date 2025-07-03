import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RvDisplayPricePipe } from 'app/core/pipe/rv-display-price.pipe';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
interface Denomination {
  value: number;
  label: string;
  type: 'note' | 'coin';
  color: string;
  bgColor: string;
}
@Component({
  selector: 'app-sale-txn-cash-payment',
  standalone: true,
  imports: [CommonModule, RvDisplayPricePipe, SharedMaterialModules, SharedFormFmodules],
  templateUrl: './sale-txn-cash-payment.component.html',
  styleUrl: './sale-txn-cash-payment.component.scss'
})
export class SaleTxnCashPaymentComponent {
  billAmount = 1250;
  denominationCounts: Record<number, number> = {};
  totalTendered = 0;
  change = 0;
  paymentComplete = false;

  denominations: Denomination[] = [
    { value: 2000, label: '₹2000', type: 'note', color: 'text-pink-700', bgColor: 'bg-pink-50 border-pink-200' },
    { value: 500, label: '₹500', type: 'note', color: 'text-yellow-700', bgColor: 'bg-yellow-50 border-yellow-200' },
    { value: 200, label: '₹200', type: 'note', color: 'text-orange-700', bgColor: 'bg-orange-50 border-orange-200' },
    { value: 100, label: '₹100', type: 'note', color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200' },
    { value: 50, label: '₹50', type: 'note', color: 'text-purple-700', bgColor: 'bg-purple-50 border-purple-200' },
    { value: 10, label: '₹10', type: 'note', color: 'text-amber-700', bgColor: 'bg-amber-50 border-amber-200' },
    { value: 5, label: '₹5', type: 'coin', color: 'text-gray-700', bgColor: 'bg-gray-50 border-gray-200' },
    { value: 2, label: '₹2', type: 'coin', color: 'text-slate-700', bgColor: 'bg-slate-50 border-slate-200' },
    { value: 1, label: '₹1', type: 'coin', color: 'text-zinc-700', bgColor: 'bg-zinc-50 border-zinc-200' },
  ];
  constructor(public dialogRef: MatDialogRef<SaleTxnCashPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.billAmount = this.data.billData.finalPayableAmount;
    this.totalTendered = this.billAmount;
  }
  updateDenomination(value: number, increment: boolean) {
    const current = this.denominationCounts[value] || 0;
    this.denominationCounts[value] = Math.max(0, current + (increment ? 1 : -1));
    this.calculateTotals();
  }

  calculateTotals() {
    this.totalTendered = Object.entries(this.denominationCounts)
      .reduce((sum, [value, count]) => sum + Number(value) * count, 0);
    this.change = Math.max(0, this.totalTendered - this.billAmount);
  }

  totalTenderedChanged() {
    this.change = Math.max(0, this.totalTendered - this.billAmount);
  }

  handleCompletePayment() {
    let result = {
      totalTendered: this.totalTendered,
      change: this.change,
      cashDenomination: this.denominationCounts
    }
    this.dialogRef.close(result);
  }

  handleClear() {
    this.denominationCounts = {};
    this.totalTendered = 0;
    this.change = 0;
    this.paymentComplete = false;
  }

  handleReset() {
    this.denominationCounts = {};
    this.totalTendered = this.billAmount;
    this.change = 0;
    this.paymentComplete = false;
  }

  get isPaymentSufficient() {
    return this.totalTendered >= this.billAmount;
  }
  onClose(): void {
  this.dialogRef.close(); // closes the dialog
}
}
