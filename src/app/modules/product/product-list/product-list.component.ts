import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'app/core/modal/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../product.service';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { FormBuilder, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule, TranslocoModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ["id", "color", "barcode"];
  dataSource: MatTableDataSource<Product>;
  pageSize = 10;
  pageIndex = 10;
  totalElements = 0;
  loading = false;
  filterForm;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  skipLableForFilter = ["id"];
  constructor(
    private productService: ProductService,
    private formBuilder: UntypedFormBuilder,
    private router: Router) {

  }

  ngOnInit(): void {
    this.loadProductColumns();
  }

  loadProductColumns() {
    this.loading = true;
    this.productService.getProductsTableColumn().subscribe(data => {
      if (data && data.length > 0) {
        let columns = data
          .filter(item => item.showLabel) // Filter items where showLabel is true
          .sort((a, b) => a.sequence - b.sequence) // Sort by sequence
          .map(item => item.labelName);
        this.displayedColumns.push(...columns);
        this.createFilterForm();
        this.loadProducts();
      }
    })
  }

  createFilterForm() {
    const ctrl: Record<string, any> = {};
    this.displayedColumns.forEach(item => {
      if (!this.skipLableForFilter.includes(item)) {
        ctrl[item] = [];
      }
    });
    this.filterForm = this.formBuilder.group(ctrl);
  }

  loadProducts() {
    this.productService.getProducts().subscribe(result => {
      this.totalElements = result.totalItems;
      if (result && result.data.length > 0) {
        this.dataSource = new MatTableDataSource(result.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  onPaging(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadProducts();
  }

  search() {
    this.loadProducts();
  }

  clear() {
    this.filterForm.reset();
  }

  add() {
    this.router.navigate(['/products/add']);
  }

  edit(element) {
    this.router.navigate(['/products/edit', element.id]);
  }
}
