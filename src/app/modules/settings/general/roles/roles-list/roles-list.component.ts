import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { RolesService } from '../roles.service';
import { AlertsService } from 'app/core/services/alerts.service';
// import { SettingGeneralPermissionService } from 'app/core/auth/guards/setting-general.guards';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule, TranslocoModule],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss'
})
export class RolesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ["position", "name", "updatedBy", "updatedDateTime", "numberOfUsers", "actions"];
  dataSource: MatTableDataSource<any>;
  pageSize = 10;
  pageIndex = 10;
  totalElements = 0;
  loading = false;
  filterForm;
  constructor(private router: Router,
    private roleService: RolesService,
    private alertService: AlertsService,
    // public permissionService: SettingGeneralPermissionService
  ) {

  }
  ngOnInit(): void {
    this.loadRoles();
  }

  setFilterPredicate() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.updatedBy.toLowerCase().includes(filter);
    };
  }
  add() {
    // if(this.permissionService.canAdd){
      this.router.navigate(['/settings/general/roles/add']);
      // }
  }

  onPaging(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    // this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe({
      next: result => {
        console.log(result);
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalElements = result.length;
        this.setFilterPredicate();
      }
    })
  }

  edit(element) { 
    // if(this.permissionService.canEdit){
      this.router.navigate(['/settings/general/roles/edit-role/' + element.id]);
     // }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(element) {
    // if(this.permissionService.canDelete){
      const title=  "Delete Role";
      const message = "Are you sure you want to delete this role: " + element.name + "?";
      const dialogRef = this.alertService.showConfirmationDialog(title,message)
      dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === 'confirmed') {
        this.roleService.deleteRole(element.id).subscribe({
          next: result => {
            this.alertService.showAlert("Role deleted successfully", true);
            this.loadRoles();
          },
          error: error => {
            this.alertService.showAlert("Error deleting role", false);
          }
        });
      }
      });
    // }
  }
}
