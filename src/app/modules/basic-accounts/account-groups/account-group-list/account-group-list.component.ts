import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AccountGroupService } from '../account-group.service';
import { AlertsService } from 'app/core/services/alerts.service';
import { Observable } from 'rxjs';
import { AddProductSharedDialogComponent } from 'app/modules/shared/component/dialog-popup/add-product-dialog/add-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Content } from '@ngneat/transloco/lib/template-handler';
import { AccountGroupSharedDialogComponent } from 'app/modules/shared/component/dialog-popup/account-group-dialog/account-group-dialog.component';
import { accountGroupPermissionService } from 'app/core/auth/guards/accountGroup.guards';

@Component({
  selector: 'app-account-group-list',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule, TranslocoModule, AddProductSharedDialogComponent],
  templateUrl: './account-group-list.component.html',
  styleUrl: './account-group-list.component.scss',
  providers: [DatePipe]
})
export class AccountGroupListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tableData: Observable<any>;
  parentGroupList: any[] = [];
  displayedColumns: string[] = ["position", "groupName","groupNature", "parentGroup","createdOn", "createdBy", "actions"];
  dataSource: MatTableDataSource<any>;
  pageSize = 10;
  pageIndex = 0;
  totalElements = 0;
  loading = false;
  filterForm;
  exportTypes = [
    { key: 'pdf', value: 'PDF', icon: 'picture_as_pdf' },
    { key: 'xlsx', value: 'Excel', icon: 'table_view' }
  ];
  constructor(
    private router: Router,
    private accountGroupService: AccountGroupService,
    private dialog: MatDialog,
    private date: DatePipe,
    private alertService: AlertsService,
    public accountGroupPermissionService: accountGroupPermissionService
  ) {}

  ngOnInit(): void {
    this.loadAccountGroups();
    this.loadParentGroup();
  }
  export(type) {
    console.log(type);
    let filters = this.filterNonNullValues();
    filters['page'] = 0;
    filters['size'] = this.totalElements;
    this.accountGroupService.download(filters).subscribe({
      next: (result) => {
        this.alertService.showAlert('File downloaded', true);
        const url = window.URL.createObjectURL(result);
        const a = document.createElement('a');
        a.href = url;
        a.download = `accountGroup.${type}`; // Change file extension if needed
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        this.alertService.showAlert("Account Group downloaded successfully", true);
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
    // this.loadAccountGroups();
  }

  loadAccountGroups() {
    this.accountGroupService.getAccountGroup().subscribe({
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


  loadParentGroup() {
    this.accountGroupService.getParentGroup().subscribe({
      next: (parentGroup: any) => {
        // console.log('parentGroup', parentGroup);
        this.parentGroupList = parentGroup;
      },
      error: error => {
        this.alertService.showAlert(error.error.message, false);
      }
    });
  }

  openAddEditDialog(element?: any): void {
    const isEditMode = !!element;
  

    // Prepare parent group options
    const parentGroupOptions = this.parentGroupList.map(parent => ({
      key: parent.id,
      value: parent.parentGroupName +'('+parent.groupNature+')',
      groupUnder: parent.groupUnder,
      groupLevel: parent.groupLevel,
      groupNature: parent.groupNature
    }));

    // Set the selected parent group value if in edit mode
    const selectedParentGroup = isEditMode && element?.parentGroup ? element.parentGroup.id : null;

    

    const dialogRef = this.dialog.open(AccountGroupSharedDialogComponent, {
      width: '400px',
      data: {
        showParentGroupDetails: true, 
        type: 'auto-complete',
        title: isEditMode ? 'Edit Account Group' : 'Add Account Group',
        fields: [
          { 
            name: 'groupName',
            label: 'Group Name', 
            type: 'input', 
            selected: element?.groupName
          },
          {
            name: 'parentGroup',
            label: 'Parent Group',
            type: 'select',
             options: parentGroupOptions,
          selected: selectedParentGroup // Use parent group for selection
          }
        ],
        record: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log('Dialog result:', result);

        // Find the selected parent group option based on the result
         const selectedParentGroup = parentGroupOptions.find(group => group.key === result.parentGroup);
        const formattedResult = {
          ...result,
          parentGroup: selectedParentGroup ? { 
          id: selectedParentGroup.key, 
          //   name: selectedParentGroup.value, 
        
          } : undefined
        };

        if (isEditMode) {
          // If edit mode, update the account group
          this.accountGroupService.updateAccountGroup(element.id, formattedResult).subscribe({
            next: () => {
              this.alertService.showAlert('Account Group updated successfully', true);
              this.loadAccountGroups();
            },
            error: (error) => {
              console.error('Error updating Account Group:', error);
              this.alertService.showAlert('Error updating Account Group', false);
            }
          });
        } else {
          // If not edit mode, add a new account group
          this.accountGroupService.addAccountGroup(formattedResult).subscribe({
            next: () => {
              this.alertService.showAlert('Account Group added successfully', true);
              this.loadAccountGroups();
            },
            error: (error) => {
              console.error('Error adding Account Group:', error);
              this.alertService.showAlert('Error adding Account Group', false);
            }
          });
        }
      }
    });
}

 

 

}
