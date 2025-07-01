import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'app/modules/product/product.service';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedFormFmodules } from '../../modules/shared-form-modules';
import { SharedMaterialModules } from '../../modules/shared-material-modules';
import { RvAutoCompleteComponent } from '../rv-auto-complete/rv-auto-complete.component';

@Component({
  selector: 'app-product-udf-fields',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, TranslocoModule, RvAutoCompleteComponent],
  templateUrl: './product-udf-fields.component.html',
  styleUrl: './product-udf-fields.component.scss'
})
export class ProductUdfFieldsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  udfFields = [];

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.loadUDFFields();
  }

  loadUDFFields() {
    this.productService.getAllProductUDF().subscribe({
      next: result => {
        result = result.filter(item => item.showField);
        result.sort((a, b) => a.sequence - b.sequence);
        result.map(udf => udf.formElement = this.getFormElement(udf))
        this.udfFields = result;
      },
      error: error => {

      }
    })
  }

  changeUDF(udfId, event) {

  }

  getOptions(udf) {
    if (udf.parentRelatedUdfValues) {

    } else {
      return udf.optionsValues.map(item => ({ key: item, value: item }))
    }
  }

  getFormElement(udf) {
    return {
      name: udf.code,
      label: udf.name,
      options: udf.optionsValues.map(item => ({ key: item, value: item }))
    }
  }

  udfSelected(udf, selectedValue) {

  }
}
