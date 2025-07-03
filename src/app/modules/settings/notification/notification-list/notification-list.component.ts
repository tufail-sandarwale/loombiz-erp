import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
  // import { notifications } from 'app/mock-api/common/notifications/data';
import { AlertsService } from 'app/core/services/alerts.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { map,tap } from 'rxjs/operators';
import { Content } from '@ngneat/transloco/lib/template-handler';
import { NotificationDialogComponent } from 'app/modules/shared/component/notification-dialog/notification-dialog.component';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule, TranslocoModule],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss',
  providers: [DatePipe]
})
export class NotificationListComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tableData: Observable<any>;
  parentGroupList: any[] = [];
  displayedColumns: string[] = ["position", "notificationEvents","module", "sender","receiver", "whatsapp","sms","email","template","action"];
  dataSource: MatTableDataSource<any>;
  pageSize = 10;
  pageIndex = 0;
  totalElements = 0;
  loading = false;
  filterForm;
  constructor(
     private router: Router,
     private notificationService: NotificationService,
     private dialog: MatDialog,
     private date: DatePipe,
     private alertService: AlertsService,
   
   ) {}

   ngOnInit(): void {
       this.loadNotificationData();
     
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
       this.loadNotificationData();
     }
   
     loadNotificationData() {
       this.notificationService.getNotificationData().subscribe({
         next: result => {
           // console.log("Account group data", result);
           this.dataSource = new MatTableDataSource(result);
           this.setFilterPredicate();
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
         }
       });
     }
   
     applyFilter(event: Event) {
       const filterValue = (event.target as HTMLInputElement).value;
       this.dataSource.filter = filterValue.trim().toLowerCase();
       if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
       }
     }
   
   
   
     openTemplateDialog(type: string): void {
      let title = '';

      switch (type) {
        case 'sms': title = 'SMS'; break;
        case 'whatsapp': title = ' WhatsApp'; break;
        case 'email': title = 'Email '; break;
      }
    
       const dialogRef = this.dialog.open(NotificationDialogComponent, {
         width: '300px',
         height: '500px',
         data: { type, title,fields: [] }
       });
   
       dialogRef.afterClosed().subscribe(result => {
         if (result) {
          
         }
       });
   }


   updateStatus(element: any, field: string, newValue: boolean) {
    if (!element || !element.id) {
      console.error('Invalid element or missing ID:', element);
      return;
    }
  
    const originalValue = element[field]; //  Store original value before updating
    element[field] = newValue; // Temporarily update UI
  
    const updateData = { id: element.id, [field]: newValue };
  
    this.notificationService.updateStatus(element.id, updateData).subscribe({
      next: () => {
        this.alertService.showAlert(`${field.replace('is', '')} setting updated successfully`, true);
      },
      error: (error) => {
        console.error(`Error updating ${field}:`, error);
        this.alertService.showAlert(`Failed to update ${field.replace('is', '')} setting`, false);
  
        element[field] = originalValue; // Revert to original value if update fails
      }
    });
  }
  fetchDropdownOptions(): Observable<any> {
    return this.notificationService.getNotificationData().pipe(
      // tap(response => console.log("🔹 Raw API Response:", response)), 
  
      map((response: any[]) => {
        if (!Array.isArray(response) || response.length === 0) {
          return { whatsAppTemplates: [], smsTemplates: [], emailTemplates: [] };
        }
  
        // Find the object that contains the template fields
        const templateData = response.find(item => item.whatsappTemplate || item.smsTemplate || item.emailTemplate);
        if (!templateData) {
          return { whatsAppTemplates: [], smsTemplates: [], emailTemplates: [] };
        }
  
        return {
          whatsAppTemplates: templateData.whatsappTemplate
            ? [{ key: templateData.whatsappTemplate, value: templateData.whatsappTemplate }]
            : [],
          smsTemplates: templateData.smsTemplate
            ? [{ key: templateData.smsTemplate, value: templateData.smsTemplate }]
            : [],
          emailTemplates: templateData.emailTemplate
            ? [{ key: templateData.emailTemplate, value: templateData.emailTemplate }]
            : []
        };
      }),
  
      // tap(mappedResponse => console.log("✅ Mapped Dropdown Options:", mappedResponse)) // Debugging Step
    );
  }
  
  


  openAddEditDialog(element?: any): void {
    const isEditMode = !!element; // Determine if it's edit mode
  
    this.fetchDropdownOptions().subscribe((dropdownData) => {
      console.log("Dropdown Data Received:", dropdownData); // Debugging Step
    
      const dialogRef = this.dialog.open(NotificationDialogComponent, {
        width: '400px',
        data: {
          type: 'Template',
          title: isEditMode ? 'Edit Template' : 'Add Template',
          fields: [
            { 
              name: 'whatsAppTemplate',
              label: 'WhatsApp',
              type: 'select',
              options: dropdownData.whatsAppTemplates,
              selected: element?.whatsAppTemplate || ''
            },
            {
              name: 'smsTemplate',
              label: 'SMS',
              type: 'select',
              options: dropdownData.smsTemplates,
              selected: element?.smsTemplate || ''
            },
            {
              name: 'emailTemplate',
              label: 'Email',
              type: 'select',
              options: dropdownData.emailTemplates,
              selected: element?.emailTemplate || ''
            }
          ],
          record: element
        }
      });
      console.log("🔹 Passing Fields to Dialog:", dialogRef.componentInstance.data.fields);
    });
    
    
  
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     if (isEditMode) {
    //       // Update the existing record
    //       const updatedData = {
    //         id: element.id,
    //         ...result
    //       };
  
    //       this.notificationService.updateTemplate(element.id, updatedData).subscribe({
    //         next: (response) => {
    //           this.alertService.showAlert('Template updated successfully', true);
    //           this.loadNotificationData();  // Refresh the table after update
    //         },
    //         error: (error) => {
    //           console.error('Error updating Template:', error);
    //           this.alertService.showAlert('Error updating Template', false);
    //         }
    //       });
    //     }
    //   }
    // });
  }  
  
    
   
}
