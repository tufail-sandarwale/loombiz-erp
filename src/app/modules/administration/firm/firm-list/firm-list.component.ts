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
import { FirmService } from '../firm.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-firm-list',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule,TranslocoModule,
    AddProductSharedDialogComponent
  ],
  templateUrl: './firm-list.component.html',
  styleUrl: './firm-list.component.scss'
})
export class FirmListComponent implements OnInit {
  firmColumnsDataSource = new MatTableDataSource<any>([]);
   
  //firmColumns: string[] = ['id', 'taxName','sGST','cGST','actions'];
  firmColumns: string[] = ['id', 'name',  'description','businessType','gstNumber','contact','email', 'actions'];
  pageSize = 10;
  totalElements = 0;
  loading = false; 
  dataSource: MatTableDataSource<Product>;
  pageIndex = 10;
  filterForm;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('firmPaginator', { static: true }) firmPaginator: MatPaginator;
  skipLableForFilter = ["id"];
  constructor(
    private firmService: FirmService,
    private formBuilder: UntypedFormBuilder,
    private alertService: AlertsService,
    private dialogService: MatDialog,
    private router: Router,) {

  }

  ngOnInit(): void {
    this.loadFirmList();
    this.loadFirmListData();
    this.firmColumnsDataSource.paginator = this.firmPaginator;
  }
 
  actions = [
    { "key": "edit", "value": "Edit", "icon": "mat_solid:edit", "color": "primary" },
    { "key": "delete", "value": "Delete", "icon": "mat_solid:delete", "color": "warn" },
    //{ "key": "", "value": "", "icon": "mat_solid:delete", "color": "warn" },
  ]
  tableColumns = [
    { "key": "position", "value": "SR NO." },
    { "key": "name", "value": "Name" },
    { "key": "createdBy", "value": "Created By" },
    { "key": "createdDateTime", "value": "createdDate" },
    { "key": "actions", "value": "Actions" }
   
  ]
  tableData: Observable<any>;
 
//  private loadTaxList(): void {
//     this.taxService.getTaxList().subscribe( {
//       next: result => {
//          this.firmColumnsDataSource.data = result;
//         this.totalElements = result.totalItems;

//        // this.setFilterPredicate();
//          this.loading = false;
//     },
//     error: error => {
//       console.error('Error loading products:', error);
//       this.loading = false;
//     }
//   })
   
//   }

 private loadFirmListData(): void{
  this.tableData =this.firmService.getOrganizationList()
 }
  private loadFirmList(): void {
    this.firmService.getOrganizationList().subscribe( {
      next: result => {
        console.log("result" , result);
        
         this.firmColumnsDataSource.data = result;
        this.totalElements = result.totalItems;

       // this.setFilterPredicate();
         this.loading = false;
    },
    error: error => {
      console.error('Error Load Firm:', error);
      this.loading = false;
    }
  })
      
  
  }
  saveFirm(formData: {name: string }): void {
    // Call the service method to save Tax Rules
    this.firmService.createOrganization({ name: formData.name }).subscribe({
      next: (response) => {
         this.alertService.showAlert('Firm saved successfully', true)
         this.loadFirmList();
        
      },
      error: (error) => {
        console.error('Error saving Firm:', error);
        // Handle error (e.g., display an error message)
      }
    });
  }

 

  onPaging(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadFirmList();
  }

  search(){
    this.loadFirmList();
  }

  clear(){
    this.filterForm.reset();
  }

  
  addFirm(){
    this.router.navigate(['/administration/firm/add-firm']);
  }

 
  editFirm(element) {
    this.router.navigate(['/administration/firm/edit-firm', element.id]);
 }

  
}
