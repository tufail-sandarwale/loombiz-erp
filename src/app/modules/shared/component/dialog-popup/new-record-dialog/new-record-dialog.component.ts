import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeAddEditComponent } from 'app/modules/masters/employee/employee-add-edit/employee-add-edit.component';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { CustomerAddEditComponent } from 'app/modules/masters/customer-master/customer-add-edit/customer-add-edit.component';
import { SaleOrderListComponent } from 'app/modules/pos/sale-order/sale-order-list/sale-order-list.component';
import { PaymentAddEditComponent } from 'app/modules/basic-accounts/payment/payment-add-edit/payment-add-edit.component';
@Component({
  selector: 'app-new-record-dialog',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, EmployeeAddEditComponent, 
    CustomerAddEditComponent, PaymentAddEditComponent],
  templateUrl: './new-record-dialog.component.html',
  styleUrl: './new-record-dialog.component.scss'
})
export class NewRecordDialogComponent implements OnInit {
  loaded = false;
  constructor(
    public dialogRef: MatDialogRef<NewRecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.loaded = true;
  }

  action(action: string) {
    this.dialogRef.close(action);
  }
}
