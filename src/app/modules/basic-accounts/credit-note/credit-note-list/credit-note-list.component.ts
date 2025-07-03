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
import { RvDisplayPricePipe } from 'app/core/pipe/rv-display-price.pipe';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { CreditNoteService } from '../credit-note.service';
import { BankPermissionService } from 'app/core/auth/guards/bank.guards';

@Component({
  selector: 'app-credit-note-list',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule, TranslocoModule, AddProductSharedDialogComponent, RvDisplayPricePipe],
  templateUrl: './credit-note-list.component.html',
  styleUrl: './credit-note-list.component.scss'
})
export class CreditNoteListComponent {

  bankColumnsDataSource = new MatTableDataSource<any>([]);
  bankNameDataSource = new MatTableDataSource<any>([]);

  bankColumns: string[] = ['id', 'voucherNo','creditNoteDate','fromAccount','toAccount','amount',
  'description','actions'];
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
    private creditNoteService: CreditNoteService,
    private formBuilder: UntypedFormBuilder,
    private alertService: AlertsService,
    private dialogService: MatDialog,
    private router: Router,
  public bankPermissionService: BankPermissionService) {

  }

  ngOnInit(): void {
   
    this.loadCreditNote();
    this.bankColumnsDataSource.paginator = this.bankPaginator;
    this.bankNameDataSource.paginator = this.bankPaginator;
  }
  saveBank(formData: {itemName: string }): void {
 
    this.creditNoteService.addCreditNote({ name: formData.itemName }).subscribe({
      next: (response) => {
         this.alertService.showAlert('Credit Note Details saved successfully', true)
         this.loadCreditNote();
        
      },
      error: (error) => {
        console.error('Error saving Credit Note Details:', error);
        // Handle error (e.g., display an error message)
      }
    });
  }
  
  private loadCreditNote(): void {
    // Load Tax Rules from your API
    this.creditNoteService.getCreditNote().subscribe({
      next: result => {
        console.log(result);
       this.bankNameDataSource.data = result.content;
       this.totalElements = result.totalItems;


       // this.setFilterPredicate();
         this.loading = false;
    },
    error: error => {
      console.error('Error loading  Credit Note Details:', error);
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

  
  addCreditNote() {
    this.router.navigate(['/basic-accounts/credit-note/add']);
    
  }

 
  editCreditNote(element) {
    this.router.navigate(['/basic-accounts/credit-note/edit', element.id]);
  
 }
//  viewBank(element): void {
//  // console.log('Navigating to Credit Note view with ID:', element);  // For debugging
//   if (element && element.id) {
//     this.router.navigate(['/basic-accounts/bank/view', element.id]);
//   } else {
//     console.error('Invalid Credit Note element or missing ID');
//   }
// }

 delete(element) {
  const title = "Delete Credit Note Details";
  const message = "Are you sure you want to delete this Credit Note Details: " + element.bankName + "?";
  const dialogRef = this.alertService.showConfirmationDialog(title, message)
  dialogRef.afterClosed().subscribe((result) => {
    console.log(result);
    if (result === 'confirmed') {
      this.creditNoteService.deleteCreditNote(element.id).subscribe({
        next: result => {
          this.alertService.showAlert("Credit Note Details deleted successfully", true);
          this.loadCreditNote();
        },
        error: error => {
          this.alertService.showAlert("Error deleting Credit Note Details", false);
        }
      });
    }
  });
}

}
