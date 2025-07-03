import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AbstractControl, FormControl,FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { isNumber,size } from 'lodash';
import { AlertsService } from 'app/core/services/alerts.service';
import { forkJoin, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FuseCardComponent } from '@fuse/components/card';
import * as moment from 'moment';
import { LocaleService, NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { RvAutoCompleteComponent } from 'app/modules/shared/component/rv-auto-complete/rv-auto-complete.component';
import { PosCalculationService } from 'app/modules/pos/sale/sale-transaction/pos-calculation.service';
import { PosService } from 'app/modules/pos/sale/pos.service';
import { UdfFieldsShowService } from 'app/modules/pos/sale/udf-fields-show.service';
import { UdfService } from 'app/core/services/udf.service';
import { RVConstants } from 'app/core/rv-constants';
import { RvDisplayPricePipe } from 'app/core/pipe/rv-display-price.pipe';

@Component({
  selector: 'app-product-barcode-printing',
  standalone: true,
  imports: [CommonModule,SharedFormFmodules, SharedMaterialModules, ReactiveFormsModule, TranslocoModule,FuseCardComponent,RvAutoCompleteComponent,RvDisplayPricePipe],
  templateUrl: './product-barcode-printing.component.html',
  styleUrl: './product-barcode-printing.component.scss'
})
export class ProductBarcodePrintingComponent {

@ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  barcodeForm: FormGroup;
  tableData: Observable<any>;
  parentGroupList: any[] = [];
  displayedColumns: string[] = ["itemCode", "productName","qty", "mrp", "sellingPrice","action"];
  pageSize = 10;
  pageIndex = 0;
  totalElements = 0;
  variantList = [];
  posGridDataSource = new MatTableDataSource<any>([]);
  customers: any[] = [];
  employees: any[] = [];
  payment: any[] = [];
  billDiscount = 0;
  productVariantFormElement;
  loadingData = false;
  gridFields;
  posGridColumns = [];
  loading = false;
  filterForm;
  printTypes = [
    { key: '1UPS', value: '1UPS' },
    { key: '2UPS', value: '2UPS' },
    { key: '3UPS', value: '3UPS' },
    { key: '4UPS', value: '4UPS' },
    { key: 'A4', value: 'A4' },
    { key: 'A5', value: 'A5' },
  ];
  selectedPrintType: string = ''; // Default selected value
  dateFormat = [
    { key: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
    { key: 'MM,YYYY', value: 'MM,YYYY' },
  ];
  selectedDateFormat: string = ''; // Default selected value
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private posCalculationService: PosCalculationService,
    private dialog: MatDialog,
    private alertService: AlertsService,
    private posService: PosService,
     public posUDFFieldsShowHideService: UdfFieldsShowService,
     private udfService: UdfService,
  ) { 
     this.createBarcodeForm();
    this.createFromElements();
  }

  ngOnInit(): void {
  this.posGridDataSource = new MatTableDataSource();
  this.getAllData();
  }
createBarcodeForm() {
  this.barcodeForm = this.fb.group({
      barcodeSize: [null],
      printType: [null],
      dateFormat: [null],
      productVariant: [null],
     
  });
}
  variantSelected(val) {
    const v = this.variantList.find(item => item.id == val);

    let data = this.posGridDataSource.data;
    const existedVariant = data.find(item => item.barcode == v.barCode);
    if (existedVariant) {
      existedVariant.qty += 1;
      // this.posCalculationService.calculateAll(existedVariant);
      
    } else {
      let variant = this.getGridRow(v)
     
      // this.posCalculationService.calculateAll(variant);
      data.push(variant);
    }
    this.posGridDataSource.data = data;
  }
  getGridRow(v: any): any {
    this.billDiscount = 0;
    // let selectedCustomer = this.customers.find(item => item.id == this.barcodeForm.get('customer').value);
  return {
      barcode: v.barCode,
      shortName: v.displayName,
      qty: 1,
      varientId: v.id,
      sellingPrice: v.sellingPrice,
      netSellingPrice: v.sellingPrice,
      mrp: v.mrp,
     
    };

  }

  createFromElements() {
    this.productVariantFormElement = {
      name: 'productVariant',
      placeholder: 'Product Name',
      options: []
    }
  }
  
  processVariantData(data) {
    this.variantList = data;
    let options = data.map(item => ({ key: item.id, value: item.displayName }))
    let searchKeys = data.map(item => ({ key: item.id, value: item.searchKey }))
    this.productVariantFormElement.options = options;
    this.productVariantFormElement.searchKeys = searchKeys;
  }


   getAllData() {
        this.loadingData = true;
        const dataGrid = this.udfService.getUDFByGroup(RVConstants.udfGroup.posGrid)
        const variantList = this.posService.loadAllProductVariants();
        forkJoin({ variantList: variantList, grid: dataGrid }).subscribe({
          next: result => {
            console.log("product variant list", result.variantList);
            console.log("grid data", result.grid);
            this.processVariantData(result.variantList);
            this.processUDFFields(result.grid)
            this.posGridDataSource.paginator = this.paginator;
            this.posGridDataSource.sort = this.sort;
            this.totalElements=result.grid.length;
            this.loadingData = false;
          },
          error: error => {
            this.alertService.showAlert('Error while loading data, please refresh...', false);
          }
        });
      }

    processUDFFields(grid) {
      this.gridFields = grid;
      this.posUDFFieldsShowHideService.posGridFields = grid;
    }

    remove(index) {
      if (index !== -1) {
        this.posGridDataSource.data.splice(index, 1);
        this.posGridDataSource._updateChangeSubscription();
      }
    }

  onPaging(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    
  }
}