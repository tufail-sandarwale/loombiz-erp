import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { TranslocoModule } from '@ngneat/transloco';
import { RvAutoCompleteComponent } from 'app/modules/shared/component/rv-auto-complete/rv-auto-complete.component';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from 'app/modules/admin/admin-settings/roles/roles.service';
import { ProductService } from '../product.service';
import { AlertsService } from 'app/core/services/alerts.service';
import { UserService } from 'app/core/user/user.service';
import { ProductUdfFieldsComponent } from 'app/modules/shared/component/product-udf-fields/product-udf-fields.component';
import { labels } from 'app/mock-api/apps/mailbox/data';
import { RvChipsComponent } from 'app/modules/shared/component/rv-chips/rv-chips.component';

@Component({
  selector: 'app-product-add-edit',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, TranslocoModule, ProductUdfFieldsComponent, RvAutoCompleteComponent, RvChipsComponent],
  templateUrl: './product-add-edit.component.html',
  styleUrl: './product-add-edit.component.scss'
})
export class ProductAddEditComponent implements OnInit {
  productForm: FormGroup;
  editMode = false;
  filteredList: Observable<any[]>;
  roleKeyValues;
  sessionUser;
  currentProduct;
  barcodeAutoGenerate = true;
  productTypeFormElement;
  productCategoryFormElement;
  productUnitFormElement;
  productTagElement;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RolesService,
    private productService: ProductService,
    private router: Router,
    private alertService: AlertsService,
    private userSerive: UserService) {
    this.userSerive.user$.subscribe({
      next: user => {
        this.sessionUser = user;
        this.createProductForm();
        this.currentProduct = this.route.snapshot.data['product'];
        this.route.params.subscribe((params) => {
          const id = params['id'];
          if (id && this.currentProduct) {
            this.editMode = true;
            //this.patchValues();
          }
        });
      },
      error: error => {

      }
    })

  }

  ngOnInit(): void {
    this.loadNextBarCode();
    this.loadProductTypes();
    this.loadProductCategories();
    this.loadProductUnit();
    this.createTagFormElement();
  }
  createTagFormElement() {
    this.productTagElement = {
      name: 'tags',
      label: 'Product Tag',
    }
  }


  loadProductTypes() {
    this.productService.getProductTypes().subscribe({
      next: result => {
        this.productTypeFormElement = {
          name: 'id',
          label: 'Product Type',
          options: result.map(item => ({ key: item.id, value: item.name }))
        }
      }
    })
  }

  loadProductCategories() {
    this.productService.getProductCategories().subscribe({
      next: result => {
        this.productCategoryFormElement = {
          name: 'id',
          label: 'Product Category',
          options: result.map(item => ({ key: item.id, value: item.name }))
        }
      }
    })
  }

  loadProductUnit() {
    this.productService.getProductUnits().subscribe({
      next: result => {
        this.productUnitFormElement = {
          name: 'id',
          label: 'Unit',
          options: result.map(item => ({ key: item.id, value: item.name }))
        }
      }
    })
  }
  loadNextBarCode() {
    this.productService.getNextBarCode().subscribe({
      next: (barcode: any) => {
        this.productForm.patchValue({
          barcode: barcode
        })
      },
      error: error => {
        this.alertService.showAlert(error.error.message, false);
      }
    })
  }
  createProductForm() {
    this.productForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      shortName: [''],
      printName: [''],
      hsnCode: [''],
      description: [''],
      barcodeAutoGenerate: [true],
      barcode: ['', [Validators.required]],
      productType: this.formBuilder.group({
        id: [null],
      }),
      productCategory: this.formBuilder.group({
        id: [null],
      }),
      productUnit: this.formBuilder.group({
        id: [null],
      }),
      udf1: [''],
      udf2: [''],
      udf3: [''],
      udf4: [''],
      udf5: [''],
      udf6: [''],
      udf7: [''],
      productTags: this.formBuilder.group({
        tags: [[]],
      }),
      hasExpiry: [true],
      expiryProductSaleable: [false],
      expiryDate: [''],
      shortDescription: [''],
      purchaseTax: [''],
      salesTax: [''],
      cess: [''],
      quantity: this.formBuilder.group({
        entityType: ['PRODUCT'],
        netWeight: [''],
        stockLimit: ['',],
        poQuantity: [''],
        masterQuantity: [''],
      }),
      //calculateExpiry: [''],

      // purchasePrice: this.formBuilder.group({
      //   value: [null],
      // }),
      // landingCost: this.formBuilder.group({
      //   value: [null],
      // }),
      // mrp: this.formBuilder.group({
      //   value: [null],
      // }),
      // sellingDiscount: this.formBuilder.group({
      //   value: [null],
      // }),
      // sellingPrice: this.formBuilder.group({
      //   value: [null],
      // }),
      // sellingMargin: this.formBuilder.group({
      //   value: [null],
      // }),
      // retailerDiscount: this.formBuilder.group({
      //   value: [null],
      // }),
      // retailerPrice: this.formBuilder.group({
      //   value: [null],
      // }),
      // retailerMargin: this.formBuilder.group({
      //   value: [null],
      // }),
      // wholesaleDiscount: this.formBuilder.group({
      //   value: [null],
      // }),
      // wholesalePrice: this.formBuilder.group({
      //   value: [null],
      // }),
      // wholesaleMargin: this.formBuilder.group({
      //   value: [null],
      // }),
      // minimumQuantity: this.formBuilder.group({
      //   value: [null],
      // }),
      // openingQuantity: this.formBuilder.group({
      //   value: [null],
      // }),
      // membershipMargin: this.formBuilder.group({
      //   value: [null],
      // })
    });
  }

  onSubmit() {
    console.log(this.productForm.value);
  }
}
