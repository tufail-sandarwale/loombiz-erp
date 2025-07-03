import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { AlertsService } from 'app/core/services/alerts.service';

interface Field {
  value: string;
  required: any;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  validators?: Validators[];
  options?: { key: string; value: string }[];
  selected?: string; // Optional, for default selected value
}

interface DialogData {
  summaryData: any[];
  denominations: any[];
  type: 'Cash Handover' | 'Cash Handover Summary';
  fields: Field[];
  title: string;
  record?: any;
  showParentGroupDetails?: boolean; // Optional property to show tax details
}

@Component({
  selector: 'app-cash-hand-over-dialog',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule],
  templateUrl: './cash-hand-over-dialog.component.html',
  styleUrl: './cash-hand-over-dialog.component.scss'
})

export class CashHandOverDialogComponent  implements OnInit {
  // @Input() fields: any[] = [];
  // @Input() summaryData: any[] = [];
  // @Input() denominations: any[] = [];
  // @Input() denominationsArray: any;
  // @Input() cashHandOverForm: FormGroup;
  totalAmount = 0;
@Output() action = new EventEmitter<any>();
dialogForm: FormGroup;
  title: string;
  isEditMode: boolean;
  fields: Field[];
   
summaryData: any[] = [];
denominations: any[] = [];
 
 constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CashHandOverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alertService: AlertsService
  ) {}

 ngOnInit(): void {
  const group: any = {};
  this.fields = this.data.fields || [];
  this.summaryData = this.data.summaryData || [];
  this.denominations = this.data.denominations || [];

  this.fields.forEach(field => {
    group[field.name] = [
      { value: field.value || '', disabled: false },
      field.required ? Validators.required : null
    ];
  });
  this.dialogForm = this.fb.group({
    ...group,
    denominationsArray: this.fb.array(this.denominations.map(() =>
      this.fb.group({
        nos: [0 , [Validators.required, Validators.min(0)]],
        amount: [{ value: 0, disabled: true }]
      })
    ))
  });

    this.updateFormattedRange();

  this.setDateRange();

  // Update the range every minute
  this.timer = setInterval(() => {
    this.setDateRange();
  }, 60000); // 1 minute 60000); // 60,000 ms = 1 min
}
getTotalAmount(): number {
  return this.denominationsArray.controls.reduce((total, group) => {
    const amount = group.get('amount')?.value || 0;
    return total + parseFloat(amount);
  }, 0);
}


get denominationsArray(): FormArray {
  return this.dialogForm.get('denominationsArray') as FormArray;
}

updateAmount(i: number): void {
  const denomination = +this.denominations[i].label;
  const nos = +this.denominationsArray.at(i).get('nos')?.value || 0;
  const amount = denomination * nos;
  this.denominationsArray.at(i).get('amount')?.setValue(amount.toFixed(2), { emitEvent: false });
}



 updateTime() {
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - 12 * 60 * 60 * 1000); // 12 hours before

    // this.timeRange = `${this.formatTime(startTime)} - ${this.formatTime(endTime)}`;
  }

  formatTime(date: Date): string {
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }
 
  closeRegister() {
   
    this.dialogRef.close(true);
  }

  onSubmit(): void {
  if (this.dialogForm.invalid) {
    this.dialogForm.markAllAsTouched();
    return;
  }

  const formData = this.dialogForm.value;
  this.dialogRef.close(formData);
}


  onCancel(): void {
    this.dialogRef.close(null);
  }
  preventInvalidKeys(event: KeyboardEvent): void {
  const invalidKeys = ['-', '+', 'e', 'E', '.'];
  if (invalidKeys.includes(event.key)) {
    event.preventDefault();
  }
}
onTextInput(event: Event, index: number): void {
  const input = (event.target as HTMLInputElement);
  let value = input.value.replace(/[^0-9]/g, ''); // Remove all non-digits

  // Optional: prevent leading zeros
  if (value.length > 1 && value.startsWith('0')) {
    value = value.replace(/^0+/, '');
  }

  input.value = value;
  this.denominationsArray.at(index).get('nos')?.setValue(value ? parseInt(value, 10) : '');
  this.updateAmount(index); // Trigger calculation
}


startDate: Date;
endDate: Date;
formattedRange: string = '';
private timer: any;



setDateRange() {
  this.startDate = new Date(); // current time
  this.endDate = new Date(this.startDate.getTime() + 12 * 60 * 60 * 1000); // 12 hours later
  this.updateFormattedRange();
}

updateFormattedRange() {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };

  this.formattedRange = `${this.formatDate(this.startDate, options)} - ${this.formatDate(this.endDate, options)}`;
}

formatDate(date: Date, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-GB', options).format(date).replace(',', '');
}

ngOnDestroy() {
  clearInterval(this.timer);
}


onClose(): void {
  this.dialogRef.close();
  close();
}



 close(){
  console.log('close')
    this.action.emit('close')
  }
}


