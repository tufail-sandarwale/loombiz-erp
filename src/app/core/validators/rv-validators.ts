import { AbstractControl, ValidatorFn } from "@angular/forms";

export function panValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        const isValid = panRegex.test(control.value);
        return isValid ? null : { 'The Pan No. Is Not A Valid': { value: control.value } };
    };
  }

  export function decimalValidator(control) {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(control.value) ? null : { invalidDecimal: true };
  }