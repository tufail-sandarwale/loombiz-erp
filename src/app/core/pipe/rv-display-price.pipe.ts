import { Pipe, PipeTransform } from '@angular/core';
import { isNumber } from 'lodash';

@Pipe({
  name: 'rvDisplayPrice',
  standalone: true
})
export class RvDisplayPricePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if(value==null || !isNumber(value)) {
      return value;
    }
    return value.toFixed(2);
  }

}
