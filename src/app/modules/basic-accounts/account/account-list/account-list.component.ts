import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { AlertsService } from 'app/core/services/alerts.service';
import { Observable } from 'rxjs';
import { AddProductSharedDialogComponent } from 'app/modules/shared/component/dialog-popup/add-product-dialog/add-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Content } from '@ngneat/transloco/lib/template-handler';
import { AccountSharedDialogComponent } from 'app/modules/shared/component/dialog-popup/account-dialog/account-dialog.component';
import { AccountPermissionService } from 'app/core/auth/guards/Account.guards';

@Component({  
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule, TranslocoModule, AddProductSharedDialogComponent],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss',
  providers: [DatePipe]
})
export class AccountListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tableData: Observable<any>;
  accountGroupList: any[] = [];
  displayedColumns: string[] = ["position","accountName", "groupName","groupNature", "accountType","createdOn", "createdBy","location","actions"];
  dataSource: MatTableDataSource<any>;
  pageSize = 10;
  pageIndex = 0;
  totalElements = 0;
  loading = false;
  filterForm;
  accountGroupOptions;
  exportTypes = [
    { key: 'pdf', value: 'PDF', icon: 'picture_as_pdf' },
    { key: 'xlsx', value: 'Excel', icon: 'table_view' }
  ];
  constructor(
      private router: Router,
      private accountService: AccountService,
      private dialog: MatDialog,
      private date: DatePipe,
      private alertService: AlertsService,
      public accountPermissionService: AccountPermissionService
    ) {}
  
    ngOnInit(): void {
      this.loadAccount();
    this.loadAccountGroup();
    
    }
    export(type) {
      console.log(type);
      let filters = this.filterNonNullValues();
      filters['page'] = 0;
      filters['size'] = this.totalElements;
      this.accountService.download(filters).subscribe({
        next: (result) => {
          this.alertService.showAlert('File downloaded', true);
          const url = window.URL.createObjectURL(result);
          const a = document.createElement('a');
          a.href = url;
          a.download = `accountList.${type}`; // Change file extension if needed
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
  
          this.alertService.showAlert("Account Details downloaded successfully", true);
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
      // this.loadAccount();
    }
  
    loadAccount() {
      this.accountService.getAccount().subscribe({
        next: result => {
          //console.log("Account details data", result);
          this.dataSource = new MatTableDataSource(result);
          this.setFilterPredicate();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    }
    loadAccountGroup() {
      this.accountService.getAccountGroup().subscribe({
        next: (result) => {
          //console.log("Account Group details data", result);
          // Map the response to dropdown options
          this.accountGroupList = result.map((accountGroup) => ({
            key: accountGroup.id, // Use unique ID as the key
            value: accountGroup.groupName, // Display name for dropdown
          }));
        },
        error: (err) => {
          console.error('Error loading account groups:', err);
        },
      });
    }
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    delete(element) {
      const title = "Delete Account Details";
      const message = "Are you sure you want to delete this Account Details: " + element.accountName + "?";
      const dialogRef = this.alertService.showConfirmationDialog(title, message)
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        if (result === 'confirmed') {
          this.accountService.deleteAccount(element.id).subscribe({
            next: result => {
              this.alertService.showAlert("Account Details deleted successfully", true);
              this.loadAccount();
            },
            error: error => {
              this.alertService.showAlert("Error deleting Account Details", false);
            }
          });
        }
      });
    }
  

    openAddEditDialog(element?: any): void {
      const isEditMode = !!element;
    
      const accountGroupOptions = this.accountGroupList;
    
      const selectedAccountGroup = isEditMode && element?.accountGroup ? element.accountGroup.id : null;
    
      const dialogRef = this.dialog.open(AccountSharedDialogComponent, {
        width: '400px',
        data: {
          type: 'auto-complete',
          title: isEditMode ? 'Edit Account' : 'Add Account',
          fields: [
            {
              name: 'accountName',
              label: 'Account Name',
              type: 'input',
              selected: element?.accountName,
            },
            {
              name: 'accountGroup',
              label: 'Account Group',
              type: 'select',
              options: accountGroupOptions,
              selected: selectedAccountGroup,
            }
            ,
            !isEditMode && {
              name: 'openingBalance',
              label: 'Opening Balance',
              type: 'group',
              fields: [
                {
                  name: 'debit',
                  placeholder: 'Debit',
                  type: 'input',
                  selected: element?.openingBalance?.debit || null,
                },
                {
                  name: 'credit',
                  placeholder: 'Credit',
                  type: 'input',
                  selected: element?.openingBalance?.credit || null,
                },
              ],
            },
          ],
          record: element,
        },
      });
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const formattedResult = {
            accountName: result.accountName,
            openingBalance: result.openingBalance 
            ? result.openingBalance.credit > 0 
              ? result.openingBalance.credit 
              : result.openingBalance.debit 
            : 0,
            accountGroup: result.accountGroup ? { id: result.accountGroup } : undefined,
          };
  console.log("accountdetails",formattedResult);
  
          if (isEditMode) {
            this.accountService.updateAccount(element.id, formattedResult).subscribe({
              next: () => {
                this.alertService.showAlert('Account updated successfully', true);
                this.loadAccount();
              },
              error: (error) => {
                console.error('Error updating Account:', error);
                this.alertService.showAlert('Error updating Account', false);
              },
            });
          } else {
            this.accountService.addAccount(formattedResult).subscribe({
              next: () => {
                this.alertService.showAlert('Account added successfully', true);
                this.loadAccount();
              },
              error: (error) => {
                console.error('Error adding Account:', error);
                this.alertService.showAlert('Error adding Account', false);
              },
            });
          }
        }
      });
    }
    
  



}
