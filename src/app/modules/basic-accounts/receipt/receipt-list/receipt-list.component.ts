import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'app/core/modal/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { FormBuilder, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'app/core/services/alerts.service';
import { Router } from '@angular/router';
import { AddProductSharedDialogComponent } from 'app/modules/shared/component/dialog-popup/add-product-dialog/add-product-dialog.component';
import { ReceiptService } from '../receipt.service';
import { ReceiptPermissionService } from 'app/core/auth/guards/receipt.guards';
import { Observable, of } from 'rxjs';
import { TableColumns } from 'app/core/modal/TableColumns';
import { TableActions } from 'app/core/modal/TableActions';
import { ServerSideTableViewComponent } from 'app/modules/shared/component/server-side-table-view/server-side-table-view.component';
import { TableColumnsDialogueComponent } from 'app/dialogues/table-columns-dialogue/table-columns-dialogue.component';
import { TableActionClickEvent } from 'app/core/modal/TableActionClickEvent';
import { RvLayoutService } from 'app/core/services/rv-layout.service';

@Component({
  selector: 'app-receipt-list',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule, TranslocoModule, AddProductSharedDialogComponent, ServerSideTableViewComponent],
  templateUrl: './receipt-list.component.html',
  styleUrl: './receipt-list.component.scss'
})
export class ReceiptListComponent {

  pageSize = 10;
  pageNumber = 0;
  loading = false;
  tableCode = 'receipt-table'
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
    private receiptService: ReceiptService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private layoutService: RvLayoutService,
    private alertService: AlertsService,
  public receiptPermissionService : ReceiptPermissionService)
    {
      //  this.createFilterForm();
    }
    
  ngOnInit(): void {
    this.loadTableLayout();
    this.LoadReciept();
    this.loadActions();
  }
 
  export(type) {
    console.log(type);
    let filters = this.filterNonNullValues();
    filters['page'] = 0;
    filters['size'] = this.totalElements;
    this.receiptService.download(filters).subscribe({
      next: (result) => {
        this.alertService.showAlert('File downloaded', true);
        const url = window.URL.createObjectURL(result);
        const a = document.createElement('a');
        a.href = url;
        a.download = `receipt.${type}`; // Change file extension if needed
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        this.alertService.showAlert("Receipt  Details downloaded successfully", true);
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

  
  LoadReciept() {
    this.tableData = this.receiptService.getReceipts(this.pageNumber, this.pageSize, this.sort, this.extraFilterParams);
  }
 
  loadTableLayout() {
    this.layoutService.getTableLayout(this.tableCode).subscribe({
      next: (result) => {
        this.tableLayoutResult = result;
        this.tableColumns = of(result.selectedColumns as TableColumns[]);
      }
    })

  }

  loadColumns() {
    return [
      { "key": "id", "value": "SR NO." },
      { "key": "receiptNo", "value": "Receipt No", "isSortable": true },
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

  tableAction(event: TableActionClickEvent) {
    switch (event.type) {
      case 'columnOrder':
        this.layoutService.processColumnOrder(this.tableCode, this.tableLayoutResult.selectedColumns, event);
        break;
      case 'buttonAction':
        if (event.buttonKey === 'edit') {
          this.router.navigate(['/basic-accounts/receipt/edit', event.element.id]);
        } else if (event.buttonKey === 'delete') {
          this.delete(event.element);
        }
        // else if (event.buttonKey === 'view') {
        //   this.router.navigate(['/basic-accounts/receipt/view', event.element.id]);
        // }

        break;
      case 'link':
        this.router.navigate(['/basic-accounts/receipt/view', event.element.id]);
        break;
      case 'sort':
        this.sort = event.sortColumn;
        this.sort = this.sort.replace('productTypeName', 'productType.name');
        this.sort = this.sort.replace('productCategoryName', 'productCategory.name');
        this.pageNumber = 0;
        this.LoadReciept();
        break;
      case 'page':
        this.pageNumber = event.pageNumber;
        this.pageSize = event.pageSize
        this.LoadReciept();
        break;
      case 'totalElements':
        this.totalElements = event.totalElements;
        break;
    }
  }

  onPaging(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  this.LoadReciept();
  }

  search() {
    this.pageNumber = 0;
    this.LoadReciept();
  }

  clear() {
    this.filterForm.reset();
    this.extraFilterParams = {};
    this.LoadReciept();
  }

  add() {
    this.router.navigate(['/basic-accounts/receipt/add']);
    this.LoadReciept();
  }
  editReceipt(element) {
    this.router.navigate(['/basic-accounts/receipt/edit', element.id]);
  
 }
  delete(element) {
    const title = "Delete Receipt  Details";
    const message = "Are you sure you want to delete this Receipt  Details: " + element.paymentNo + "?";
    const dialogRef = this.alertService.showConfirmationDialog(title, message)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === 'confirmed') {
        this.receiptService.deleteReceipt(element.id).subscribe({
          next: result => {
            this.alertService.showAlert("Receipt  Details deleted successfully", true);
            this.LoadReciept();
          },
          error: error => {
            this.alertService.showAlert("Error deleting Receipt  Details", false);
          }
        });
      }
    });
  }
  loadActions() {
    let actions= [];
    if(this.receiptPermissionService.canEdit){
      actions.push({ key: 'edit', value: 'Edit', icon: 'mat_solid:edit', color: 'primary' })
    }
    if(this.receiptPermissionService.canDelete){
      actions.push({ key: 'delete', value: 'Delete', icon: 'mat_solid:delete', color: 'warn' });
    }
    return this.actions = actions;
  }

  shouldShowActions = (row: any): boolean => {
    return row.paymentType !== 'against_bill';
  }
}
