import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeAddEditComponent } from 'app/modules/masters/employee/employee-add-edit/employee-add-edit.component';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { CustomerAddEditComponent } from 'app/modules/masters/customer-master/customer-add-edit/customer-add-edit.component';
import { SaleOrderListComponent } from 'app/modules/pos/sale-order/sale-order-list/sale-order-list.component';
import { PaymentListComponent } from 'app/modules/basic-accounts/payment/payment-list/payment-list.component';
import { CreditNotesListComponent } from 'app/modules/pos/credit-notes/credit-notes-list/credit-notes-list.component';
import { SalesRegisterListComponent } from 'app/modules/pos/sales-register/sales-register-list/sales-register-list.component';
@Component({
  selector: 'app-table-dialog',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, SaleOrderListComponent
    , PaymentListComponent, CreditNotesListComponent, SalesRegisterListComponent
  ],

  templateUrl: './table-dialog.component.html',
  styleUrl: './table-dialog.component.scss'
})
export class TableDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  action(action: string) {
    this.dialogRef.close(action);
  }
}
