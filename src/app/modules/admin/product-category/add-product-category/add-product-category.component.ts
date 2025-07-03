import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'app/core/modal/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { FormBuilder, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { ProductCategoryService } from '../product-category.service';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component'; // Adjust the path as necessary
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'app/core/services/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product-category',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule,TranslocoModule,
    AddProductDialogComponent
  ],

  templateUrl: './add-product-category.component.html',
  styleUrl: './add-product-category.component.scss'
})
export class AddProductCategoryComponent implements OnInit {
  productDataSource = new MatTableDataSource<any>([]);
  categoryDataSource = new MatTableDataSource<any>([]);

  displayedColumns: string[] = ['id', 'name', 'description']; // Adjust based on your columns
  productDisplayedColumns: string[] = ['id', 'productName'];
  categoryDisplayedColumns: string[] = ['id', 'categoryName'];
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
    private productCategoryService: ProductCategoryService,
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog,
    private alertService: AlertsService,
    private router: Router,) {

  }

  ngOnInit(): void {
    this.loadProductTypes();
    this.loadProducCategory();
    this.productDataSource.paginator = this.productPaginator;
    this.categoryDataSource.paginator = this.categoryPaginator;
  }
 
  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px',
      data: {
        type: 'product',
        title: 'Add Product Type',
        fields: [
                { name: 'productName', label: 'Product Type', type: 'input' }
              ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Product form submitted:', result);
        // Handle the product addition logic here
        this.saveProductType(result);
      }
    });
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px',
      data: {
        type: 'category',
        title: 'Add Product Category',
        fields: [
          { name: 'categoryName', label: 'Product Category', type: 'input' }
        
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveCategoryType(result);
      }
    });
  }

  saveProductType(formData: { productName: string }): void {
    // Call the service method to save the product
    this.productCategoryService.addProduct({ name: formData.productName }).subscribe({
      next: (response) => {
         this.alertService.showAlert('Product type saved successfully', true)
         this.loadProductTypes();
        
      },
      error: (error) => {
        console.error('Error saving product:', error);
        // Handle error (e.g., display an error message)
      }
    });
  }

  saveCategoryType(formData: { categoryName: string }): void {
    // Call the service method to save the product
   
    this.productCategoryService.addCategory({ name: formData.categoryName }).subscribe({
      next: (response) => {
        this.alertService.showAlert('Product type saved successfully', true)
         this.loadProducCategory();
      },
      error: (error) => {
        console.error('Error saving product:', error);
        // Handle error (e.g., display an error message)
      }
    });
  }

  private loadProductTypes(): void {
    // Load products from your API
    this.productCategoryService.getProducts().subscribe( {
      next: result => {
        console.log('products result',  result);
        this.productDataSource.data = result;
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

  private loadProducCategory(): void {
    // Load categories from your API
    this.productCategoryService.getCategories().subscribe({
      next: result => {
        console.log('category result',  result);
        console.log('category result',  result.content);
       this.categoryDataSource.data = result;
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
    this.loadProductTypes();
  }

  search(){
    this.loadProductTypes();
  }

  clear(){
    this.filterForm.reset();
  }

  add(){
    
  }
}
