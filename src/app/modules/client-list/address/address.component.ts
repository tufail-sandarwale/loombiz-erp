import { Component,Input } from '@angular/core';
import {  FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormConfigService } from '../form-config.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
     MatButtonModule,
     ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
  providers: [FormConfigService], 
})
export class AddressComponent {

  @Input() formGroup: FormGroup;
  @Input() fields: any[];
  @Input() stepper: MatStepper;

  constructor() { }
  getData() {
    const data = {};
    if (this.formGroup) {
      Object.keys(this.formGroup.controls).forEach(key => {
        data[key] = this.formGroup.get(key).value;
      });
    }
    return data;
  }
  resetStepper() {
    if (this.stepper) {
      this.stepper.reset();
    }
  }
}
