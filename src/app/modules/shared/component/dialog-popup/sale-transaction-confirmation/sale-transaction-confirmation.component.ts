import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface PaymentMethod {
  type: string;
  amount: number;
}

interface ConfirmationData {
  finalAmount: number;
  paymentMethods: PaymentMethod[];
}

@Component({
  selector: 'app-sale-transaction-confirmation',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './sale-transaction-confirmation.component.html',
  styleUrls: ['./sale-transaction-confirmation.component.scss']
})
export class SaleTransactionConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<SaleTransactionConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
