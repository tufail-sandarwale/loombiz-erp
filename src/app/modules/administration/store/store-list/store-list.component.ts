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
import { ClientSideTableViewComponent } from 'app/modules/shared/component/client-side-table-view/client-side-table-view.component';

import { StoreService } from '../store.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule,TranslocoModule,
    AddProductSharedDialogComponent,ClientSideTableViewComponent
  ],
  templateUrl: './store-add.component.html',
  styleUrl: './store-list.component.scss'
})
export class StoreListComponent implements OnInit {
  storeColumnsDataSource = new MatTableDataSource<any>([]);
   
  //storeColumns: string[] = ['id', 'taxName','sGST','cGST','actions'];
  storeColumns: string[] = ['id', 'name',  'description','businessType','gstNumber','contact','email', 'actions' ];
  pageSize = 10;
  totalElements = 0;
  loading = false; 
  dataSource: MatTableDataSource<Product>;
  pageIndex = 10;
  filterForm;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('storePaginator', { static: true }) storePaginator: MatPaginator;
  skipLableForFilter = ["id"];
  constructor(
    
    private storeService: StoreService,
    private formBuilder: UntypedFormBuilder,
    private alertService: AlertsService,
    private dialogService: MatDialog,
    private router: Router,) {

  }

  ngOnInit(): void {
   this.loadStoreList();
   this.loadStoreListData();
    this.storeColumnsDataSource.paginator = this.storePaginator;
  }
 

  private loadStoreList(): void {
    this.storeService.getBranchList().subscribe( {
      next: result => {
        console.log("result" , result);
        
         this.storeColumnsDataSource.data = result;
        this.totalElements = result.totalItems;

       // this.setFilterPredicate();
         this.loading = false;
    },
    error: error => {
      console.error('Error Load Store:', error);
      this.loading = false;
    }
  })
      
  }
  private loadStoreListData(): void {
    // Load Store from your API
    this.tableData =  this.storeService.getBranchList();  
  }
  

 

  onPaging(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadStoreList();
  }

  search(){
    this.loadStoreList();
  }

  clear(){
    this.filterForm.reset();
  }

  
  addStore(){
    this.router.navigate(['/administration/store/add-store']);
  }

 
  editStore(element) {
    this.router.navigate(['/administration/store/edit-store', element.id]);
 }

  
 actions = [
  { "key": "edit", "value": "Edit", "icon": "mat_solid:edit", "color": "primary" },
  { "key": "delete", "value": "Delete", "icon": "mat_solid:delete", "color": "warn" },
]
tableColumns = [
  { "key": "position", "value": "SR NO." },
  { "key": "name", "value": "Name" },
  { "key": "description", "value": "Description" },  
  { "key": "businessType", "value": "Business Type" },  
  { "key": "gstNumber", "value": "GST Number" },
  { "key": "contact", "value": "Contact" },
  { "key": "actions", "value": "Actions" },
]
tableData: Observable<any>;




tableAction(event) {
  if (event.type == 'buttonAction') {   
    if(event.buttonKey == 'edit') {
      this.editStore(event.element);
    }
    else if(event.buttonKey == 'delete') {
      //this.deleteStore(event.element);
    }
      
  }
}
}
