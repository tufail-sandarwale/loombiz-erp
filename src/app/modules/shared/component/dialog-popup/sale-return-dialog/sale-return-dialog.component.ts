import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RvChipAutoCompleteComponent } from 'app/modules/shared/component/rv-chip-auto-complete/rv-chip-auto-complete.component';
import { RvChipsComponent } from 'app/modules/shared/component/rv-chips/rv-chips.component';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { size, TranslocoModule } from '@ngneat/transloco';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { RvAutoCompleteComponent } from 'app/modules/shared/component/rv-auto-complete/rv-auto-complete.component';
import { RvDisplayPricePipe } from 'app/core/pipe/rv-display-price.pipe';
import { HotkeyModule } from 'angular2-hotkeys';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertsService } from 'app/core/services/alerts.service';
import { elementAt } from 'rxjs';
@Component({
  selector: 'app-sale-return-dialog',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, TranslocoModule, RvAutoCompleteComponent, HotkeyModule, RvDisplayPricePipe],
  templateUrl: './sale-return-dialog.component.html',
  styleUrl: './sale-return-dialog.component.scss'
})
export class SaleReturnDialogComponent implements OnInit {
  columns;
  posGridDataSource = new MatTableDataSource<any>([]);
  variantList = []
  currentProducts = []
  posGridColumns;
  billDiscount;
  currentOrder;
  productVariantFormElement;
  posForm: FormGroup;
  loaded = false;
  constructor(
    public dialogRef: MatDialogRef<SaleReturnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertsService,
    private formBuilder: FormBuilder,
  ) {
    this.currentOrder = this.data.currentOrder;
    this.variantList = this.data.variantList;
    this.currentProducts = this.data.currentOrderVariantList;
    if (this.data.alreadyAddedSaleReturns) {
      this.posGridDataSource = new MatTableDataSource(this.data.alreadyAddedSaleReturns);
    } else {
      this.posGridDataSource = new MatTableDataSource([]);
    }
    let columns = this.data.posGridColumns.filter(item => item.toLowerCase() != 'freeqty');
    columns.splice(columns.indexOf('qty') + 1, 0, 'originalQty');
    this.posGridColumns = columns
    this.createPOSForm();
    this.createFromElements();
    this.loaded = true;
  }
  ngOnInit(): void {

  }

  createPOSForm() {
    this.posForm = this.formBuilder.group({
      transactionType: ['POS_SALE'],
      productVariant: [null],
      customer: [null]
    });
  }
  createFromElements() {
    let options = this.variantList.map(item => ({ key: item.id, value: item.displayName }))
    this.productVariantFormElement = {
      name: 'productVariant',
      placeholder: 'Product Name',
      options: options
    }
  }
  variantSelected(val) {
    const v = this.currentProducts.find(item => item.varientId == val);
    v['position'] = this.posGridDataSource.data.length + 1;
    v['originalQty'] = v.qty;
    let data = this.posGridDataSource.data;
    if (data.find(item => item.varientId == val)) {
      this.alertService.showAlert("Product Already ADDED", false);
    } else {
      data.push(v);
      this.posGridDataSource.data = data;
    }
  }
  submit() {
    if (this.posGridDataSource.data?.length > 0 && !(this.posGridDataSource.data.find(element=>element.qtyInvalid))) {
      let productsToRemove = [];
      this.posGridDataSource.data.forEach(item => {
        let productToRemove = {
          varientId: item.varientId,
          qty: item.qty
        }
        productsToRemove.push(productToRemove);
      })
      this.dialogRef.close(productsToRemove);
    } else {
      this.alertService.showAlert("Please select/check prodcuts to remove", false)
    }
  }

  changeQty(element, val) {
    element.qtyInvalid = false
    if (val > element.originalQty || val <= 0) {
      element.qtyInvalid = true;
    }
  }
}
