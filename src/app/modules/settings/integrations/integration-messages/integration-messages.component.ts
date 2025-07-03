import { Component,OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationViewComponent } from '../integration-view/integration-view.component';
import { Observable } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from 'app/modules/admin/admin-settings/roles/roles.service';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertsService } from 'app/core/services/alerts.service';
import { IntegrationMessagesDialogComponent } from 'app/modules/shared/component/dialog-popup/integration-messages-dialog/integration-messages-dialog.component';
import { IntegrationService } from '../integration.service';

@Component({
  selector: 'app-integration-messages',
  standalone: true,
  imports: [CommonModule,IntegrationViewComponent, SharedMaterialModules, SharedFormFmodules, TranslocoModule,MatButtonToggleModule,IntegrationMessagesDialogComponent],
  templateUrl: './integration-messages.component.html',
  styleUrl: './integration-messages.component.scss'
})
export class IntegrationMessagesComponent {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    tableData: Observable<any>;
    parentGroupList: any[] = [];
    notificationTypeList;
    displayedColumns: string[] = ["position", "templateName","message", "event","route","actions"];
    whatsappDisplayedColumns: string[] = ["position","event", "templateName","actions"]
    dataSource: MatTableDataSource<any>;
    pageSize = 10;
    pageIndex = 0;
    totalElements = 0;
    loading = false;
    filterForm;
    constructor(
         private router: Router,
         private dialog: MatDialog,
         private alertService: AlertsService,
        private integrationService: IntegrationService,
       ) {}
    
       ngOnInit(): void {
        this.dataSource = new MatTableDataSource([]);
          this.loadwhatsAppProvider();
         }
        
  selectedMessageType: string = 'whatsapp'; // Default selected view

  selectedMessageTab: string = 'whatsapp';
  smsTemplates = ['SMS Just', 'Text Local', 'Reminder'];
  selectedSmsTemplate = '';
  whatsappTemplate = ['Meta']
  selectedWhatsappProvider = '';

  // Sms Dialoge
 
   smsOpenAddEditDialog(element?: any): void {
        const isEditMode = !!element;
      
        // const accountGroupOptions = this.accountGroupList;
      
        // const selectedAccountGroup = isEditMode && element?.accountGroup ? element.accountGroup.id : null;
      
        const dialogRef = this.dialog.open(IntegrationMessagesDialogComponent, {
          width: '600px',
          data: {
            type: 'auto-complete',
            title: isEditMode ? 'Edit SMS Template' : 'New SMS Template',
            fields: [
              {
                name: 'event',
                label: 'Select Event',
                type: 'select',
                // options: accountGroupOptions,
                // selected: selectedAccountGroup,
              }
              ,
              {
                name: 'smsTemplate',
                label: 'SMS Template Name',
                type: 'input',
                selected: element?.smsTemplate,
              },
              {
                name: 'templatID',
                label: 'DLT Template ID',
                type: 'input',
                selected: element?.templatID,
              },
              {
                name: 'senderID',
                label: 'Sender ID',
                type: 'input',
                selected: element?.senderID,
              },
              {
              name: 'remarks',
              label: 'Text Message',
              type: 'textarea',
              selected: element?.remarks || '',
         
            }
          
            ],
            record: element,
          },
        });
      
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
        
    
    
            // if (isEditMode) {
            //   this.accountService.updateAccount(element.id, formattedResult).subscribe({
            //     next: () => {
            //       this.alertService.showAlert('Account updated successfully', true);
            //       this.loadAccount();
            //     },
            //     error: (error) => {
            //       console.error('Error updating Account:', error);
            //       this.alertService.showAlert('Error updating Account', false);
            //     },
            //   });
            // } else {
            //   this.accountService.addAccount(formattedResult).subscribe({
            //     next: () => {
            //       this.alertService.showAlert('Account added successfully', true);
            //       this.loadAccount();
            //     },
            //     error: (error) => {
            //       console.error('Error adding Account:', error);
            //       this.alertService.showAlert('Error adding Account', false);
            //     },
            //   });
            // }
          }
        });
      }
//sms Dialge End

// WhatsApp Dialoge
whatsappOpenAddEditDialog(element?: any): void {
  const isEditMode = !!element;

  // const accountGroupOptions = this.accountGroupList;

  // const selectedAccountGroup = isEditMode && element?.accountGroup ? element.accountGroup.id : null;

  const dialogRef = this.dialog.open(IntegrationMessagesDialogComponent, {
    width: '600px',
    data: {
      type: 'auto-complete',
      title: isEditMode ? 'Edit WhatsApp Provider' : 'New WhatsApp Provider',
      fields: [
        {
          name: 'notificationType',
          label: 'Select Provider',
          type: 'select',
          options: [
                  { key: 1, value: 'Meta' }
                 
                  ],
           selected: element?.notificationType?.id,
        }
        ,
        {
          name: 'phoneNumber',
          label: 'Template Name',
          type: 'input',
          selected: element?.phoneNumber,
        },
        {
          name: 'accountId',
          label: 'Account ID',
          type: 'input',
          selected: element?.accountId,
        },
        {
          name: 'authKey',
          label: 'Auth Token',
          type: 'input',
          selected: element?.authKey,
        },
        {
          name: 'apiUrl',
          label: 'Api Url',
          type: 'input',
          selected: element?.apiUrl,
        },
      ],
      record: element,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('result',result);
    if (result) {


const formattedResult = {
  ...result,
 
  notificationType: {
    id: result.notificationType
  }
};

if (isEditMode) {
  this.integrationService.updatewhatsAppProvider(element.id, formattedResult).subscribe({
    next: () => {
      this.alertService.showAlert('Whats App Provider updated successfully', true);
      this.loadwhatsAppProvider();
    },
    error: (error) => {
      console.error('Error updating Whats App Provider:', error);
      this.alertService.showAlert('Error updating Whats App Provider', false);
    },
  });
} else {
  this.integrationService.addwhatsAppProvider(formattedResult).subscribe({
    next: () => {
      this.alertService.showAlert('Whats App Provider added successfully', true);
      this.loadwhatsAppProvider();
    },
    error: (error) => {
      console.error('Error adding Whats App Provider:', error);
      this.alertService.showAlert('Error adding Whats App Provider', false);
    },
  });
}
    }
  });
}
//WhatsApp Dialge End
onMessageTabChange(tab: string): void {
  this.selectedMessageTab = tab;
  
}

onPaging(event) {
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.loadwhatsAppProvider();
}
loadwhatsAppProvider() {
  this.integrationService.getwhatsAppProvider().subscribe({
    next: result => {
      console.log("Integration details data", result);
      this.dataSource = new MatTableDataSource(result.content);
      // this.setFilterPredicate();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  });
}
delete(element) {
      const title = "Delete WhatsApp Provider";
      const message = "Are you sure you want to delete Provider: " + element.notificationType + "?";
      const dialogRef = this.alertService.showConfirmationDialog(title, message)
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        if (result === 'confirmed') {
          this.integrationService.deletewhatsAppProvider(element.id).subscribe({
            next: result => {
              this.alertService.showAlert("Account Details deleted successfully", true);
              this.loadwhatsAppProvider();
            },
            error: error => {
              this.alertService.showAlert("Error deleting Account Details", false);
            }
          });
        }
      });
    }
}
