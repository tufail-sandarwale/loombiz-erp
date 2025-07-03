import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'app/core/modal/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { FormBuilder, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'app/core/services/alerts.service';
import { Router } from '@angular/router';
import { AddProductSharedDialogComponent } from 'app/modules/shared/component/dialog-popup/add-product-dialog/add-product-dialog.component';
import { ProductSubCategoryItemService } from '../product-sub-category-item.service';
@Component({
  selector: 'app-add-product-category',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule,TranslocoModule,
    AddProductSharedDialogComponent
  ],

  templateUrl: './add-product-category.component.html',
  styleUrl: './add-product-category.component.scss'
})
export class AddProductSubCategoryComponent  implements OnInit {
  productSubCategoryDataSource = new MatTableDataSource<any>([]);
  itemNameDataSource = new MatTableDataSource<any>([]);

  displayedColumns: string[] = ['id', 'name', 'description']; // Adjust based on your columns
  productSubCategoryColumns: string[] = ['id', 'productSubCategoryName'];
  itemColumns: string[] = ['id', 'itemName'];
  pageSize = 10;
  totalElements = 0;
  loading = false;
  dataSource: MatTableDataSource<Product>;
  pageIndex = 10;
  filterForm;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('productPaginator', { static: true }) productPaginator: MatPaginator;
  @ViewChild('categoryPaginator', { static: true }) categoryPaginator: MatPaginator;
  skipLableForFilter = ["id"];
  constructor(
    private productSubCategoryItemService: ProductSubCategoryItemService,
    private formBuilder: UntypedFormBuilder,
    private alertService: AlertsService,
    private dialogService: MatDialog,
    private router: Router,) {

  }

  ngOnInit(): void {
    this.loadProductSubCategories();
    this.loadItemNames();
    this.productSubCategoryDataSource.paginator = this.productPaginator;
    this.itemNameDataSource.paginator = this.categoryPaginator;
  }
 
 
  openAddProductSubCategoryDialog(): void {
    const dialogRef = this.dialogService.open(AddProductSharedDialogComponent, {
      width: '400px',
      data: {
        type: 'productSubCategory',
        title: 'Add Product Sub Category',
        fields: [
              { name: 'productSubCategoryName', label: 'Product Sub Category', type: 'input' }
              ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Product Sub Category form submitted:', result);
        // Handle the product addition logic here
        this.saveProductSubCategory(result);
      }
    });
  }

  openAddItemNameDialog(): void {
    const dialogRef = this.dialogService.open(AddProductSharedDialogComponent, {
      width: '400px',
      data: {
        type: 'Item Name',
        title: 'Add Item Name ',
        fields: [
          { name: 'itemName', label: 'Item Name', type: 'input' }
        
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveItemName(result);
      }
    });
  }

  saveProductSubCategory(formData: { productSubCategoryName: string }): void {
    // Call the service method to save the product
    this.productSubCategoryItemService.addProductSubCategory({ name: formData.productSubCategoryName }).subscribe({
      next: (response) => {
         this.alertService.showAlert('Product Sub Category saved successfully', true)
         this.loadProductSubCategories();
        
      },
      error: (error) => {
        console.error('Error saving product:', error);
        // Handle error (e.g., display an error message)
      }
    });
  }

 
  private loadProductSubCategories(): void {
    this.productSubCategoryItemService.getProductSubCategories().subscribe( {
      next: result => {
        console.log('products SubCategories result',  result);
        this.productSubCategoryDataSource.data = result;
        this.totalElements = result.totalItems;

       // this.setFilterPredicate();
         this.loading = false;
    },
    error: error => {
      console.error('Error loading products:', error);
      this.loading = false;
    }
  })
      
  
  }
  saveItemName(formData: {itemName: string }): void {
    // Call the service method to save the product
    this.productSubCategoryItemService.addItemName({ name: formData.itemName }).subscribe({
      next: (response) => {
         this.alertService.showAlert('Item name saved successfully', true)
         this.loadItemNames();
        
      },
      error: (error) => {
        console.error('Error saving Item name:', error);
        // Handle error (e.g., display an error message)
      }
    });
  }

  private loadItemNames(): void {
    // Load categories from your API
    this.productSubCategoryItemService.getItemNames().subscribe({
      next: result => {
       this.itemNameDataSource.data = result;
       this.totalElements = result.totalItems;

       // this.setFilterPredicate();
         this.loading = false;
    },
    error: error => {
      console.error('Error loading categories:', error);
      this.loading = false;
    }
  })
  }

  onPaging(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadProductSubCategories();
  }

  search(){
    this.loadProductSubCategories();
  }

  clear(){
    this.filterForm.reset();
  }

  add(){
    
  }
}
