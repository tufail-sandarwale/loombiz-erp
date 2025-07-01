import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './product-service.service';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule,SharedMaterialModules,SharedFormFmodules,
  ],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent implements OnInit {
  products: any[] = []; // Array to store all products
  selectedProducts: any[] = []; // Array to store selected products for display in table
  newProductName: string = ''; // Variable to store new product name
  filteredProducts: Observable<any[]>; // Observable to store filtered products
  productCtrl = new FormControl(); // FormControl for the product autocomplete

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.filteredProducts = this.productCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterProducts(value))
      );
  }

  loadProducts() {
    // Load products from ProductService
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }

  private _filterProducts(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.products.filter(product => product.productName.toLowerCase().includes(filterValue));
  }

  addSelectedProduct() {
    const selectedProduct = this.productCtrl.value;
    if (selectedProduct) {
      this.selectedProducts.push(selectedProduct);
      this.newProductName = '';
      this.productCtrl.setValue('');
    }
  }

  deleteSelectedProduct(index: number) {
    // Delete the selected product from the array of selected products
    this.selectedProducts.splice(index, 1);
  }
}