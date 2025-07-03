import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isNumber',
  standalone: true
})
export class IsNumberPipe implements PipeTransform {
  transform(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
}
