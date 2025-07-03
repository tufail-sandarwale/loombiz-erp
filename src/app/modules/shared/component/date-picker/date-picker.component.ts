import { Component, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocaleService, NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import * as moment from 'moment';
import { FormsModule } from '@angular/forms';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { FormBuilder, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, NgxDaterangepickerMd,ReactiveFormsModule,SharedMaterialModules,FormsModule,],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [LocaleService],
})
export class DatePickerComponent {
  @Input() selectedDateRange: any = {
    startDate: moment().subtract(7, 'days'),
    endDate: moment()
  };
  @Input() placeholder: string = 'Select Date Range'; // Default placeholder text
  @Output() dateRangeSelected = new EventEmitter<any>(); // Emits selected date

  ranges = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
  };

  get formattedDateRange(): string {
    return this.selectedDateRange.startDate && this.selectedDateRange.endDate
      ? `${this.selectedDateRange.startDate.format('YYYY-MM-DD')} - ${this.selectedDateRange.endDate.format('YYYY-MM-DD')}`
      : '';
  }
  applyDateRange() {
    this.dateRangeSelected.emit(this.selectedDateRange);
  }

  ngModelChange(dateRange) {
    this.dateRangeSelected.emit(dateRange);
  }
}
