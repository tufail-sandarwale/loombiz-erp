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
    private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this. loadInitialData();
    this.productDataSource.paginator = this.productPaginator;
    this.categoryDataSource.paginator = this.categoryPaginator;
  }
  loadInitialData(): void {
    // Static initial data for products
    const staticProducts = [
      { id: 1, productName: 'Product 1' },
      { id: 2, productName: 'Product 2' },
      { id: 3, productName: 'Product 3' }
    ];

    // Static initial data for categories
    const staticCategories = [
      { id: 1, categoryName: 'Category 1' },
      { id: 2, categoryName: 'Category 2' },
      { id: 3, categoryName: 'Category 3' }
    ];
    this.productDataSource.data = staticProducts;
    this.categoryDataSource.data = staticCategories;
  }
  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px',
      data: {
        type: 'product',
        title: 'Add Product',
        fields: [
          { name: 'productName', label: 'Product Name', type: 'input' }
          //{ name: 'productDescription', label: 'Product Description', type: 'textarea' }
          // Add more fields if necessary
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Product form submitted:', result);
        // Handle the product addition logic here
      }
    });
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px',
      data: {
        type: 'category',
        title: 'Add Category',
        fields: [
          { name: 'categoryName', label: 'Category Name', type: 'input' }
          //{ name: 'categoryDescription', label: 'Category Description', type: 'textarea' }
          // Add more fields if necessary
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Category form submitted:', result);
        // Handle the category addition logic here
      }
    });
  }

  private saveProduct(productData: any): void {
    // this.productCategoryService.addProduct(productData).subscribe(response => {
    //   this.productDataSource.data = [...this.productDataSource.data, response];
    // });
    const newProduct = {
      id: this.productDataSource.data.length + 1, // Simulate auto-increment ID
      ...productData
    };
    this.productDataSource.data = [...this.productDataSource.data, newProduct];
    this.productDataSource.paginator = this.productPaginator;
  }

  private saveCategory(categoryData: any): void {
    // this.productCategoryService.addCategory(categoryData).subscribe(response => {
    //   this.categoryDataSource.data = [...this.categoryDataSource.data, response];
    // });
    const newCategory = {
      id: this.categoryDataSource.data.length + 1, // Simulate auto-increment ID
      ...categoryData
    };

    this.categoryDataSource.data = [...this.categoryDataSource.data, newCategory];
    this.categoryDataSource.paginator = this.categoryPaginator;
  }

  private loadProducts(): void {
    // Load products from your API
    this.productCategoryService.getProducts().subscribe(data => {
      this.productDataSource.data = data;
    });
  }

  private loadCategories(): void {
    // Load categories from your API
    this.productCategoryService.getCategories().subscribe(data => {
      this.categoryDataSource.data = data;
    });
  }

  onPaging(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadProducts();
  }

  search(){
    this.loadProducts();
  }

  clear(){
    this.filterForm.reset();
  }

  add(){
    
  }
}
