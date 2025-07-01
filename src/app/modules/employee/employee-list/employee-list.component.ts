import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { TranslocoModule } from '@ngneat/transloco';
import { Route, Router } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AlertsService } from 'app/core/services/alerts.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../employee.service';
import { MatSort, Sort } from '@angular/material/sort';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule, TranslocoModule],
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ["position", "firstName", "lastName", "email", "updatedBy", "updatedDateTime", "actions"];
  dataSource: MatTableDataSource<any>;
  pageSize = 10;
  pageIndex = 10;
  loading = false;
  totalElements = 0;
  currentUserPermissions: any[]
  constructor(private router: Router,
    private confirmationDialogueService: FuseConfirmationService,
    private alertService: AlertsService,
    private employeeService: EmployeeService,
    private userService: UserService) {

  }
  ngOnInit(): void {
    this.userService.user$.subscribe({
      next: user => this.currentUserPermissions = user.permissions
    });
    this.loadUsers();
  }


  clear() {
  }
  search() {

  }
  add() {
    this.router.navigate(['/employee/add']);
  }

  edit(element) {
    this.router.navigate(['/employee/edit', element.id]);
  }

  onPaging(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadUsers();
  }

  loadUsers() {
    this.employeeService.getUsers().subscribe({
      next: result => {
        console.log(result);
        this.dataSource = new MatTableDataSource(result);
        this.totalElements = result.length;
        this.setFilterPredicate();
      }
    })
  }

  setFilterPredicate() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.username?.toLowerCase().includes(filter) ||
        data.firstName.toLowerCase().includes(filter) ||
        data.lastName.toLowerCase().includes(filter) ||
        data.phoneNumber?.toLowerCase().includes(filter) ||
        data.customFields?.map(item => item.value).includes(filter);
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
    alert(element)
    const title = "Delete Employee";
    const message = "Are you sure you want to delete this employee: " + element.firstName + " " + element.lastName + "?";
    const dialogRef = this.alertService.showConfirmationDialog(title, message)
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === 'confirmed') {
        this.employeeService.deleteUser(element.id).subscribe({
          next: result => {
            this.alertService.showAlert("Employee deleted successfully", true);
            this.loadUsers();
          },
          error: error => {
            this.alertService.showAlert("Error deleting role", false);
          }
        });
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
        case 'firstName':
          return compare(a.firstName.toLowerCase(), b.firstName.toLowerCase(), isAsc);
        case 'lastName':
          return compare(a.lastName.toLowerCase(), b.lastName.toLowerCase(), isAsc);
        case 'email':
          return compare(a.email.toLowerCase(), b.email.toLowerCase(), isAsc);
        case 'updatedBy':
          return compare(a.updatedBy.toLowerCase(), b.updatedBy.toLowerCase(), isAsc);
        case 'updatedDateTime':
          return compare(a.updatedDateTime, b.updatedDateTime, isAsc);
        default:
          return 0;
      }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }

  isNotBranchAdmin(user) {
    if (user.roles && user.roles.map(r => r.permissions)[0]) {
      return !(user.roles.map(r => r.permissions)[0].map(p => p.code).includes("ADMIN"));
    } else {
      return true;
    }
  }
}
