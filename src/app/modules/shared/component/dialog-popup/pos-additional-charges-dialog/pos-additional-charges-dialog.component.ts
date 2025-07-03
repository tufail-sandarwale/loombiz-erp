import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogData } from '../dialog-data';
import { AdditionalChargesService } from 'app/modules/settings/general/additional-charges/additional-charges.service';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { MatTableDataSource } from '@angular/material/table';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { RvAutoCompleteComponent } from '../../rv-auto-complete/rv-auto-complete.component';

@Component({
  selector: 'app-pos-additional-charges-dialog',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, RvAutoCompleteComponent],
  templateUrl: './pos-additional-charges-dialog.component.html',
  styleUrl: './pos-additional-charges-dialog.component.scss'
})
export class PosAdditionalChargesDialogComponent implements OnInit {
  load = false;
  additionalChargesList: any[];
  additionalCharges: { name: string, flatCharges: number, tax: string, cgst: number, sgst: number, rate: number, total: number }[] = [];
  columns = ['position', 'additionalCharge', 'value', 'tax', 'total', 'action'];
  additionChargesDataSource = new MatTableDataSource<any>([]);
  constructor(
    public dialogRef: MatDialogRef<PosAdditionalChargesDialogComponent>,
    private additionalChargesService: AdditionalChargesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.loadAdditionalCharges();
  }

  ngOnInit(): void {

  }

  loadAdditionalCharges() {
    this.additionalChargesService.getAdditionalCharges().subscribe({
      next: result => {
        this.additionalChargesList = result;
        this.load = true;
        this.loadAddedAdditionalCharges();
      }
    })
  }

  loadAddedAdditionalCharges() {
    let data = [];
    Object.assign(data, this.data.additionalCharges);
    let i = 1;
    if (data && data.length > 0) {
      data.forEach(element => {
        element['form'] = this.formBuilder.group({
          name: element.id
        }),
          element['nameElement'] = {
            name: 'name',
            placeholder: 'Additional Charge',
            options: this.additionalChargesList.map(item => ({ key: item.id, value: item.additionalChargeName }))
          }
        element['position'] = i++;
      });
      this.additionChargesDataSource.data = data;
    }

  }

  addAdditionalCharge() {
    let data = this.additionChargesDataSource.data;
    let additionalCharge = {
      position: data.length + 1,
      form: this.formBuilder.group({
        name: [null]
      }),
      nameElement: {
        name: 'name',
        placeholder: 'Additional Charge',
        options: this.additionalChargesList.map(item => ({ key: item.id, value: item.additionalChargeName }))
      },
      name: null,
      flatCharges: 0,
      tax: 0,
      cgst: 0,
      sgst: 0,
      rate: 0,
      total: 0
    }
    data.push(additionalCharge);
    this.additionChargesDataSource.data = data;
  }

  additionalChargeSelected(id: any, element: any) {
    let additionalCharge = this.additionalChargesList.find(item => item.id === id);
    element.name = additionalCharge.additionalChargeName;
    element.flatCharges = Number(additionalCharge.defaultValue);
    element.tax = additionalCharge.tax.name;
    element.cgst = Number(additionalCharge.tax.centerGstRate);
    element.sgst = Number(additionalCharge.tax.stateGstRate);
    element.rate = Number(additionalCharge.tax.rate);
    element.total = element.flatCharges;
    element.id = additionalCharge.id;
  }

  deleteAdditionalCharge(index: number) {
    let data = this.additionChargesDataSource.data;
    data.splice(index, 1);
    this.additionChargesDataSource.data = data;
  }

  applyAdditionalCharges() {
    this.dialogRef.close(this.additionChargesDataSource.data);
  }

  cancelAdditionalCharges() {
    this.dialogRef.close(null);
  }
}
