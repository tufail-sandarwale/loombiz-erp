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

import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { BankService } from '../bank.service';
import { BankPermissionService } from 'app/core/auth/guards/bank.guards';

@Component({
  selector: 'app-bank-list',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule, TranslocoModule, AddProductSharedDialogComponent],
  templateUrl: './bank-list.component.html',
  styleUrl: './bank-list.component.scss'
})
export class BankListComponent {
 
  bankColumnsDataSource = new MatTableDataSource<any>([]);
  bankNameDataSource = new MatTableDataSource<any>([]);

  bankColumns: string[] = ['id', 'bankName',  'branchName','accountHolderName','accountNo','createdBy',
  'createdDate','actions'];
  pageSize = 10;
  totalElements = 0;
  loading = false; 
  dataSource: MatTableDataSource<Product>;
  pageIndex = 10;
  filterForm;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  taxPaginator
 
  @ViewChild('bankPaginator', { static: true }) bankPaginator: MatPaginator;
  @ViewChild('taxRulesPaginator', { static: true }) taxRulesPaginator: MatPaginator;
  skipLableForFilter = ["id"];
  constructor(
    private bankService: BankService,
    private formBuilder: UntypedFormBuilder,
    private alertService: AlertsService,
    private dialogService: MatDialog,
    private router: Router,
  public bankPermissionService: BankPermissionService) {

  }

  ngOnInit(): void {
   
    this.loadBank();
    this.bankColumnsDataSource.paginator = this.bankPaginator;
    this.bankNameDataSource.paginator = this.bankPaginator;
  }
  saveBank(formData: {itemName: string }): void {
 
    this.bankService.addBank({ name: formData.itemName }).subscribe({
      next: (response) => {
         this.alertService.showAlert('Bank Details saved successfully', true)
         this.loadBank();
        
      },
      error: (error) => {
        console.error('Error saving Bank Details:', error);
        // Handle error (e.g., display an error message)
      }
    });
  }
  
  private loadBank(): void {
    // Load Tax Rules from your API
    this.bankService.getBank().subscribe({
      next: result => {
       this.bankNameDataSource.data = result.content;
       this.totalElements = result.totalItems;


       // this.setFilterPredicate();
         this.loading = false;
    },
    error: error => {
      console.error('Error loading  Bank Details:', error);
      this.loading = false;
    }
  })
  }

  onPaging(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  
  }



  clear(){
    this.filterForm.reset();
  }

  
  addBank(){
    this.router.navigate(['/basic-accounts/bank/add']);
    
  }

 
  editBank(element) {
    this.router.navigate(['/basic-accounts/bank/edit', element.id]);
  
 }
 viewBank(element): void {
 // console.log('Navigating to bank view with ID:', element);  // For debugging
  if (element && element.id) {
    this.router.navigate(['/basic-accounts/bank/view', element.id]);
  } else {
    console.error('Invalid bank element or missing ID');
  }
}

 delete(element) {
  const title = "Delete Bank Details";
  const message = "Are you sure you want to delete this Bank Details: " + element.bankName + "?";
  const dialogRef = this.alertService.showConfirmationDialog(title, message)
  dialogRef.afterClosed().subscribe((result) => {
    console.log(result);
    if (result === 'confirmed') {
      this.bankService.deleteBank(element.id).subscribe({
        next: result => {
          this.alertService.showAlert("Bank Details deleted successfully", true);
          this.loadBank();
        },
        error: error => {
          this.alertService.showAlert("Error deleting Bank Details", false);
        }
      });
    }
  });
}

}
