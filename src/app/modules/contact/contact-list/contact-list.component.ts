import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';
import { CustomerService } from '../customer.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { TranslocoModule } from '@ngneat/transloco';
import { Route, Router } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AlertsService } from 'app/core/services/alerts.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';

interface ServiceResponse {
  data: any[]; // Assuming each item in the data array has any type
  totalPages: number;
  currentPage: number;
}

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, 
    SharedMaterialModules, 
    ReactiveFormsModule,
     TranslocoModule,
     MatRadioModule,
     FormsModule],

  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  contactType: string[] = ['customer', 'supplier', 'transport'];
  selectedOption:string;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobileNo', 'actions'];
 // displayedColumns: string[] = ['id', 'contactId', 'actions'];
  dataSource: MatTableDataSource<any>;
   pageSize = 5;
  pageIndex = 0;
  clientId  = "clientId";
  sortOder = "asc"
  loading = false;
  totalElements = 0;
  data: any[]; // Assuming each item in the data array has any type
  selectedFormat: string | null = null;

  constructor(private router: Router,
    private confirmationDialogueService: FuseConfirmationService,
    private alertService: AlertsService,
    private customerService: CustomerService,
    private contactService: ContactService) {

  }
  ngOnInit(): void {
    this.selectedOption = 'customer'; // Initialize selected option to 'customer'
    this.loadCustomers(); 
  }


  clear() {
  }
  search() {

  }
  add() {
    this.router.navigate(['/contact/add']);
  }

  edit(element) {
    this.router.navigate(['/contact/edit', element.id]);
  }

  onPaging(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadCustomers();
  }
 
loadCustomers() {
  //  this.loading = true;
    this.contactService.getContactsByType(this.pageIndex, this.pageSize, this.clientId, this.sortOder, this.selectedOption).subscribe({
      next: result => {
        console.log("this.selectedOption : " , this.selectedOption );
        console.log('result',  result["data"]);
        console.log('totalItems',  result["totalItems"]);
        console.log('totalPages',  result["totalPages"]);

       //console.log('result', result["data"].map(contact => contact.contactType).filter(type => type  === this.selectedOption));
       //console.log('result', result["data"].map(contact => contact.contactType));

       const filteredData = result["data"].filter(contact => contact.contactType === this.selectedOption && contact.firstName); 
       //console.log('result filteredData', filteredData);
       
       this.dataSource = new MatTableDataSource<any>(filteredData);
           
          this.totalElements = result["totalPages"];

          this.setFilterPredicate();
           this.loading = false;
      },
      error: error => {
        console.error('Error loading customers:', error);
        this.loading = false;
      }
    })
  }

  



  onOptionChange() {
   // this.selectedOption = option;
    this.loadCustomers(); // Reload data based on the selected option
  }
  
  setFilterPredicate() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.firstName.toLowerCase().includes(filter) ||
        data.lastName.toLowerCase().includes(filter) ||
        data.mobileNo?.toLowerCase().includes(filter) ||
        data.addressDetails?.map(item => item.value).includes(filter);
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(element) {
    
    let config: FuseConfirmationConfig = {
      "title": "Delete Contact",
      "message": `Are you sure you want to delete this Contact: ${element.id} ${element.firstName} ${element.lastName} ?`,
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation-triangle",
        "color": "warn"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Delete",
          "color": "warn"
        },
        "cancel": {
          "show": true,
          "label": "Cancel"
        }
      },
      "dismissible": true
    }
    const dialogRef = this.confirmationDialogueService.open(config);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === 'confirmed') {
        this.contactService.deleteContact(element.id).subscribe({
          next: result => {
            this.alertService.showAlert("Contact deleted successfully", true);
            this.loadCustomers();
          },
          error: error => {
            this.alertService.showAlert("Error deleting Contact", false);
          }
        });
      }
    });
  }
  onFormatSelected(event: any) {
    const format = event.value;
    if (format) {
      this.download(format);
    }
  }
  download(format: string) {
    if (!format) {
      this.alertService.showAlert("Please select a format for downloading", false);
      return;
    }
    this.contactService.downloadContacts(this.pageIndex, this.pageSize, this.clientId, this.sortOder, this.selectedOption, format).subscribe({
      next: (blob: Blob) => {
        console.log('Download successful:', blob);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contacts_${this.selectedOption}.${format}`; // Change file extension if needed
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
  
        this.alertService.showAlert("Contacts downloaded successfully", true);
      },
      error: error => {
        console.error('Error downloading contacts:', error);
        this.alertService.showAlert("Error downloading contacts", false);
      }
    });
  }
  

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
     //   case 'firstName':
       //   return compare(a.firstName.toLowerCase(), b.firstName.toLowerCase(), isAsc);
     //   case 'lastName':
      //    return compare(a.lastName.toLowerCase(), b.lastName.toLowerCase(), isAsc);
      //  case 'email':
       //   return compare(a.email.toLowerCase(), b.email.toLowerCase(), isAsc);
       // case 'updatedBy':
         // return compare(a.updatedBy.toLowerCase(), b.updatedBy.toLowerCase(), isAsc);
       // case 'updatedDateTime':
         // return compare(a.updatedDateTime, b.updatedDateTime, isAsc);
        default:
          return 0;
      }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
