import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { FormBuilder, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'app/core/services/alerts.service';
import { Router } from '@angular/router';
import { RvLayoutService } from 'app/core/services/rv-layout.service';
import { AddProductSharedDialogComponent } from 'app/modules/shared/component/dialog-popup/add-product-dialog/add-product-dialog.component';
import { PaymentService } from '../payment.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { PaymentPermissionService } from 'app/core/auth/guards/payment.guards';
import { Observable, of } from 'rxjs';
import { TableColumns } from 'app/core/modal/TableColumns';
import { TableActions } from 'app/core/modal/TableActions';
import { ServerSideTableViewComponent } from 'app/modules/shared/component/server-side-table-view/server-side-table-view.component';
import { TableColumnsDialogueComponent } from 'app/dialogues/table-columns-dialogue/table-columns-dialogue.component';
import { TableActionClickEvent } from 'app/core/modal/TableActionClickEvent';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule, TranslocoModule, AddProductSharedDialogComponent, ServerSideTableViewComponent],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss'
})
export class PaymentListComponent {
  @Input() openList: any;
  @Output() action = new EventEmitter<any>();
  pageSize = 10;
  pageNumber = 0;
  loading = false;
  tableCode = 'payment-table'
  filterForm;
  tableColumns!: Observable<TableColumns[]>;
  tableData: Observable<any>;
  actions: TableActions[] = [];
  tableLayoutResult;
  sort = 'updatedDateTime,desc';
  extraFilterParams = null;
  pageIndex = 10;
  totalElements;
  exportTypes = [
    { key: 'pdf', value: 'PDF', icon: 'picture_as_pdf' },
    { key: 'xlsx', value: 'Excel', icon: 'table_view' }
  ];
  filterClicked;

  constructor(
    private paymentService: PaymentService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    public layoutService: RvLayoutService,
    private alertService: AlertsService,
   public paymentPermissionService :PaymentPermissionService)
    {
      //  this.createFilterForm();
    }
    
  ngOnInit(): void {
    this.loadTableLayout();
    this.loadPayment();
    this.loadActions();
  }
 
  export(type) {
    console.log(type);
    let filters = this.filterNonNullValues();
    filters['page'] = 0;
    filters['size'] = this.totalElements;
    this.paymentService.download(filters).subscribe({
      next: (result) => {
        this.alertService.showAlert('File downloaded', true);
        const url = window.URL.createObjectURL(result);
        const a = document.createElement('a');
        a.href = url;
        a.download = `payment.${type}`; // Change file extension if needed
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        this.alertService.showAlert("Payment Details downloaded successfully", true);
      }
    })
  }

  filterNonNullValues(): any {
    const filteredObject: any = {};
    let obj = this.filterForm.value;
    for (const key in obj) {
      if (obj[key] !== null && obj[key] != '' && obj[key].length > 0) {
        filteredObject[key] = obj[key];
      }
    }
    return filteredObject;
  }

  loadPayment() {
    this.tableData = this.paymentService.getPayments(this.pageNumber, this.pageSize, this.sort, this.extraFilterParams);
  }

  loadTableLayout() {
    this.layoutService.getTableLayout(this.tableCode).subscribe({
      next: (result) => {
        console.log('Table Layout Result:', result);
        
        this.tableLayoutResult = result;
        this.tableColumns = of(result.selectedColumns as TableColumns[]);
      }
    })

  }

  loadColumns() {
    return [
      { "key": "id", "value": "SR NO." },
      { "key": "paymentNo", "value": "Payment No", "isSortable": true },
      { "key": "partyName", "value": "Party Name", "isSortable": true },
      { "key": "paymentMode", "value": "Payment Mode" },
      { "key": "transactionDate", "value": "Date" },
      { "key": "amount", "value": "amount" },
      { "key": "Status", "value": "Payment Status" },
      // { "key": "createdBy", "value": "Created By", "isSortable": true},
     { "key": "createdDateTime", "value": "Created Date", "isSortable": true },
      { "key": "actions", "value": "Actions" }
    ]
  }
  changeColumns() {
    const dialogRef = this.layoutService.changeColumns(this.tableLayoutResult);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableLayoutResult.selectedColumns = result;
        this.tableColumns = of(result as TableColumns[]);
      }
    });
  }


    onPaging(event: TableActionClickEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageNumber;
    this.loadPayment();
  }

  tableAction(event: TableActionClickEvent) {
    switch (event.type) {
      case 'columnOrder':
        this.layoutService.processColumnOrder(this.tableCode, this.tableLayoutResult.selectedColumns, event);
        break;
      case 'buttonAction':
        if (event.buttonKey === 'edit') {
          this.router.navigate(['/basic-accounts/payment/edit', event.element.id]);
        } else if (event.buttonKey === 'delete') {
          this.delete(event.element);
        }
        // else if (event.buttonKey === 'view') {
        //   this.router.navigate(['/masters/supplier-master/view', event.element.id]);
        // }

        break;
      // case 'link':
      //   this.router.navigate(['/masters/supplier-master/view', event.element.id]);
      //   break;
      case 'sort':
        this.sort = event.sortColumn;
        this.sort = this.sort.replace('productTypeName', 'productType.name');
        this.sort = this.sort.replace('productCategoryName', 'productCategory.name');
        this.pageNumber = 0;
        this.loadPayment();
        break;
      case 'page':
        this.pageNumber = event.pageNumber;
        this.pageSize = event.pageSize
        this.loadPayment();
        break;
      case 'totalElements':
        this.totalElements = event.totalElements;
        break;
    }
  }

  search() {
    this.pageNumber = 0;
    this.loadPayment();
  }

  clear() {
    this.filterForm.reset();
    this.extraFilterParams = {};
    this.loadPayment();
  }

  add() {
    this.router.navigate(['/basic-accounts/payment/add']);
    this.loadPayment();
  }
  editPayment(element) {
    this.router.navigate(['/basic-accounts/payment/edit', element.id]);
  
 }
  delete(element) {
    const title = "Delete Payment Details";
    const message = "Are you sure you want to delete this Payment Details: " + element.paymentNo + "?";
    const dialogRef = this.alertService.showConfirmationDialog(title, message)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === 'confirmed') {
        this.paymentService.deletePayment(element.id).subscribe({
          next: result => {
            this.alertService.showAlert("Payment Details deleted successfully", true);
            this.loadPayment();
          },
          error: error => {
            this.alertService.showAlert("Error deleting Payment Details", false);
          }
        });
      }
    });
  }
  loadActions() {
    let actions= [];
    if(this.paymentPermissionService.canEdit){
      actions.push({ key: 'edit', value: 'Edit', icon: 'mat_solid:edit', color: 'primary' })
    }
    if(this.paymentPermissionService.canDelete){
      actions.push({ key: 'delete', value: 'Delete', icon: 'mat_solid:delete', color: 'warn' });
    }
    return this.actions = actions;
  }
  close(){
    this.action.emit('close')
  }
}
