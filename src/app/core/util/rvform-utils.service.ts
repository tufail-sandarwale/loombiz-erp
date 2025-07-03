import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RVFormUtilsService {
  decimalPlaces: number = 2;
  constructor() { }

  setMaxDecimalPlaces(formControl: FormControl, decimalPlaces: number = this.decimalPlaces): void {
    const value = formControl.value;
    if (value !== null && value!= "" && !isNaN(value)) {
      const formattedValue = parseFloat(value).toFixed(decimalPlaces);
      formControl.setValue(formattedValue, { emitEvent: false });
    }
  }
}
