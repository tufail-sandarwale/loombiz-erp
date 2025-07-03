import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { PaymentTermsService } from 'app/modules/settings/general/payment-terms/payment-terms.service';
import { TranslocoModule } from '@ngneat/transloco';
import { HotkeyModule } from 'angular2-hotkeys';
import { RvDisplayPricePipe } from 'app/core/pipe/rv-display-price.pipe';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { RvAutoCompleteComponent } from '../../rv-auto-complete/rv-auto-complete.component';

interface PaymentTerm {
  id: string;
  value: string;
}

@Component({
  selector: 'app-sales-trx-payment-terms',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, TranslocoModule, RvAutoCompleteComponent, HotkeyModule, RvDisplayPricePipe],
  templateUrl: './sales-trx-payment-terms.component.html'
})
export class SalesTrxPaymentTermsComponent implements OnInit {
  paymentTermsForm: FormGroup;
  paymentTerms;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SalesTrxPaymentTermsComponent>,
    private paymentTermsService: PaymentTermsService
  ) {}

  ngOnInit() {
    this.paymentTermsForm = this.fb.group({
      paymentTerm: ['', Validators.required],
      dueDate: [{ value: '', readonly: true }],
      reminder: ['no', Validators.required]
    });
    this.loadPaymentTerms();
    // Update due date when payment term changes
    this.paymentTermsForm.get('paymentTerm').valueChanges.subscribe(term => {
      if (term) {
        const selectedTerm = this.paymentTerms.find(t => t.id === term);
        if (selectedTerm) {
          const days = parseInt(selectedTerm.paymentTermDay);
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + days);
          this.paymentTermsForm.patchValue({ dueDate }, { emitEvent: false });
        }
      }
    });
  }

  loadPaymentTerms() {
    this.paymentTermsService.getAllPaymentTerms().subscribe((res: any) => {
      this.paymentTerms = res;
    })
  }

  onProcessToPrint() {
    if (this.paymentTermsForm.valid) {
      this.dialogRef.close(this.paymentTermsForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
