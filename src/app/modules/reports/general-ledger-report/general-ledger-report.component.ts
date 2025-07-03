import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AbstractControl, FormControl,FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { GeneralLedgerReportService } from './general-ledger-report.service';
import { AlertsService } from 'app/core/services/alerts.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FuseCardComponent } from '@fuse/components/card';
import * as moment from 'moment';
import { LocaleService, NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { RvDisplayPricePipe } from 'app/core/pipe/rv-display-price.pipe';
import {DatePickerComponent } from 'app/modules/shared/component/date-picker/date-picker.component';
import { RvAutoCompleteComponent } from 'app/modules/shared/component/rv-auto-complete/rv-auto-complete.component';

@Component({
  selector: 'app-general-ledger-report',
  standalone: true,
  imports: [CommonModule,SharedFormFmodules, SharedMaterialModules, ReactiveFormsModule, TranslocoModule,FuseCardComponent, NgxDaterangepickerMd,RvDisplayPricePipe,DatePickerComponent,RvAutoCompleteComponent],
  templateUrl: './general-ledger-report.component.html',
  styleUrl: './general-ledger-report.component.scss',
  providers: [DatePipe,LocaleService]
})
export class GeneralLedgerReportComponent {
@ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ledgerForm: FormGroup;
  tableData: Observable<any>;
  parentGroupList: any[] = [];
  displayedColumns: string[] = ["date", "particulars","voucherType", "voucherNo","description", "debit", "credit","closing"];
  dataSource: MatTableDataSource<any>;
  pageSize = 10;
  pageIndex = 0;
  totalElements = 0;
  exportTypes = [
    { key: 'pdf', value: 'PDF', icon: 'picture_as_pdf' },
    { key: 'xlsx', value: 'Excel', icon: 'table_view' }
  ];
  loading = false;
 filterForm
  accountList;
  accountGroupList;
  accountElement: any; 
  accountGroupElement: any;
  selectedAccount = new FormControl('');
  selectedGroup = new FormControl('');
  selectedDateRange: { startDate: moment.Moment, endDate: moment.Moment };
    startDate=null;
    endDate=null;
    alwaysShowCalendars: boolean;
    ranges: any = {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }
    invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private generalLedgerReportService: GeneralLedgerReportService,
    private dialog: MatDialog,
    private alertService: AlertsService,
    private datePipe: DatePipe
  ) { this.selectedDateRange = { startDate: moment().startOf('month'), endDate: moment().endOf('month') };
      this.startDate = this.selectedDateRange.startDate;
      this.endDate = this.selectedDateRange.endDate;
      this.createFromElements();
      this.createGroupFromElements();}

  ngOnInit(): void {
    
    this.initForm(); // Initialize FormGroup
    this.loadAccountGroup();
    this.loadAccount();
     this.ledgerForm.get('accountName')?.valueChanges.subscribe((selectedAccount ) => {
      console.log(selectedAccount)
       this.fetchLedgerData(selectedAccount);
  });
  this.ledgerForm.get('groupName')?.valueChanges.subscribe(()=>{

  });
    this.dataSource = new MatTableDataSource([]);
  }
  dateRange: any = {}; // Define the property

  onDateSelected(selectedRange: any) {
    console.log('Selected Date Range:', selectedRange);
    this.dateRange = selectedRange;
  }
 
 /** Initialize FormGroup */
 initForm() {
  this.ledgerForm = this.fb.group({
    selectedAccount: ['', Validators.required],
    selectedGroup: [''],
    selectedDateRange: [{ startDate: moment().startOf('month'), endDate: moment().endOf('month') }, Validators.required],
    accountName: [''],
    groupName: ['']

  });
 
}
createFromElements() {
  this.accountElement = {
    name: 'accountName', // should match form control name
    placeholder: 'Account Name',
    type: 'autocomplete', // assuming your rv-auto-complete uses this
    options: [] // populated later
  };
}
createGroupFromElements() {
  this.accountGroupElement = {
    name: 'groupName', // should match form control name
    placeholder: 'Account Group Name',
    type: 'autocomplete', // assuming your rv-auto-complete uses this
    options: [] // populated later
  };
}
  

  
  fetchLedgerData(selectedAccount) {
    console.log("selected acc id", selectedAccount)
    if (!selectedAccount || !this.selectedDateRange.startDate || !this.selectedDateRange.endDate) {
      console.warn('Please select an account and date range');
      return;
    }
   
    const { selectedDateRange } = this.ledgerForm.value;
    const startDate = this.ledgerForm.value.selectedDateRange.startDate.format('DD-MM-YYYY'); 
    const endDate = this.ledgerForm.value.selectedDateRange.endDate.format('DD-MM-YYYY');
    const accountId = selectedAccount
    console.log("Fetching data for:", accountId, startDate, endDate); 
    this.dataSource = null;
    this.loading = true;

    this.generalLedgerReportService.getGeneralLedger(
      accountId, 
      startDate, 
      endDate
    ).subscribe({
      next: (data) => {
        console.log('Ledger data:', data);
        this.dataSource = new MatTableDataSource(data); //  Assign data to MatTableDataSource
        this.dataSource.paginator = this.paginator; //  Enable pagination
        this.dataSource.sort = this.sort; //  Enable sorting
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching ledger data:', error);
        this.dataSource = new MatTableDataSource([]); // Clear table on error
        this.loading = false;
      }
    });
  }

  

 loadAccountGroup() {
    this.generalLedgerReportService.getAccountGroup().subscribe({
      next:(result)  => {
         let options= result.map(accountGroup => ({
          key: accountGroup.id,
          value: accountGroup.groupName || ''
        }));
           options.unshift({
            key: '',
            value: 'Select Account Group'
        });
         console.log('this.accountGroupList', options)
        if (this.accountGroupElement) {
        this.accountGroupElement.options = options;
          if (options.length > 0) {
          this.ledgerForm.get('groupName')?.setValue(options[0].key);
         
        }
      }
      },
      error: err => {
        console.error('Error loading payment terms:', err);
      }
    });
  }


  loadAccount() {
  this.generalLedgerReportService.getAccount().subscribe({
    next: (result) => {
      console.log("result:", result);

      // Map API result to accountList
      let options = result.map(account => ({
        key: account.id,
        value: account.accountName || ''
      }));
      options.unshift({
  key: '',
  value: 'Select Account'
});
    console.log('this.accountList', options)
      // Assign to class property using `this`
      // this.accountElement = {
      //   name: 'selectedAccount',
      //   key: 'account',
      //   type: 'autocomplete',  // type for rv-auto-complete
      //   // label: 'Select Account',
      //   options: this.accountList.map(a => ({
      //     key: a.key,
      //     value: a.value
      //   }))
      // };
      if (this.accountElement) {
        this.accountElement.options = options;
          if (options.length > 0) {
          this.ledgerForm.get('accountName')?.setValue(options[0].key);
         
        }
      }
    },
    
    error: error => {
      this.alertService.showAlert(error.error.message, false);
    }
  });
}



//   getRequestParamsBody(params: any[]) {
//     const startDate = this.selectedDateRange.startDate.format('YYYY-MM-DD');
//     const endDate = this.selectedDateRange.endDate.format('YYYY-MM-DD');
//     let requestParams = {
//       startDate: startDate,
//       endDate: endDate
//     };
//     params.forEach(p => {
//       requestParams[p.code] = p.value;
//     })
//     return requestParams;
//   }
// isInvalidDate = (m: moment.Moment) => {
//     return this.invalidDates.some(d => d.isSame(m, 'day'))
//   }
//   applyDateRange() {
//     this.startDate = this.selectedDateRange.startDate;
//     this.endDate = this.selectedDateRange.endDate;
//     // this.processDashboard();
//   }

  /** Filter function for searching */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Enables filtering
  }
  
  export(type) {
    console.log(type);
    let filters = this.filterNonNullValues();
    filters['page'] = 0;
    filters['size'] = this.totalElements;
    this.generalLedgerReportService.download(filters).subscribe({
      next: (result) => {
        this.alertService.showAlert('File downloaded', true);
        const url = window.URL.createObjectURL(result);
        const a = document.createElement('a');
        a.href = url;
        a.download = `general-Ledger.${type}`; // Change file extension if needed
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        this.alertService.showAlert("general Ledger Report downloaded successfully", true);
      }
    })
  }

  filterNonNullValues(): any {
    const filteredObject: any = {};
    let obj = this.filterForm.value;
    for (const key in obj) {
      if (obj[key] !== null && obj[key] != '' && obj[key].length > 0) {
        filteredObject[key] = obj[key];
      }
    }
    return filteredObject;
  }
  setFilterPredicate() {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      return data.additionalChargeName.toLowerCase().includes(filter) ||
             data.updatedBy.toLowerCase().includes(filter);
    };
  }

  onPaging(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    const {selectedAccount} = this.ledgerForm.value
    this.fetchLedgerData(selectedAccount);
  }



}
