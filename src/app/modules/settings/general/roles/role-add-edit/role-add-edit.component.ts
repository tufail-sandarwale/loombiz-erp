import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { ActivatedRoute, Router } from '@angular/router';
import { permissionsData } from '../permission-data';
import { RolesService } from '../roles.service';
import { UserService } from 'app/core/user/user.service';
import { AlertsService } from 'app/core/services/alerts.service';

@Component({
  selector: 'app-role-add-edit',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, TranslocoModule],
  templateUrl: './role-add-edit.component.html',
  styleUrl: './role-add-edit.component.scss'
})
export class RoleAddEditComponent implements OnInit {
  permissions: any[];
  permissionsMap = permissionsData;
  currentRole: any;
  editMode: boolean = false;
  displayedColumns;
  tableData: any[] = [];
  groups;
  roleName;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RolesService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertsService) {
    this.currentRole = this.route.snapshot.data['role'];
    console.log("role", this.currentRole);
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id && this.currentRole) {
        this.editMode = true;
        this.roleName = this.currentRole.name;
      }
    });

  }

  ngOnInit(): void {
    console.log('groupControls', this.permissionsMap);
    this.permissionsMap.forEach(group => {
      const permissionNames = new Set<string>();
      group.types.forEach(type => {
        type.permissions.forEach(permission => permissionNames.add(permission.name));
      });
      group['displayedColumns'] = ['type', ...permissionNames];
    });

    // Prepare grouped data
    this.groups = this.permissionsMap.map(group => ({
      groupName: group.groupName,
      displayedColumns: group['displayedColumns'],
      types: group.types.map(type => {
        const row = { type: type.type };
        type.permissions.forEach(permission => {
          row[permission.name] = this.isChecked(permission);
        });
        return row;
      })
    }));
  }
  isChecked(permission: any) {
    if (!this.currentRole) return false;
    return this.currentRole.permissions.some(p => p.code === permission.code);
  }
  onCancel() {

  }
  onSubmit() {
    if (this.roleName && this.roleCodeValue.length > 0) {
      let role = {
        id: this.currentRole?.id,
        name: this.roleName,
        permissions: this.roleCodeValue
      }
      if (!this.editMode) {
        this.roleService.addRole(role).subscribe({
          next: (next) => {
            console.log(next);
            this.alertService.showAlert('Role created successfully', true);
            this.router.navigate(['/settings/general/roles']);
          },
          error: (error) => {
            console.log(error)
            this.alertService.showAlert('Role creation failed', false);
          }
        });
      } else {
        this.roleService.updateRole(this.currentRole.id, role).subscribe({
          next: (next) => {
            console.log(next);
            this.alertService.showAlert('Role updated successfully', true);
            this.router.navigate(['/settings/general/roles']);
          },
          error: (error) => {
            console.log(error);
            this.alertService.showAlert('Role update failed', false);
          }
        });
      }
    } else {
      this.alertService.showAlert('Please fill all the fields', false);
      return;
    }
  }

  get roleCodeValue() {
    let updatedPermissions: { code: string; active: boolean }[] = [];
    this.groups.forEach(group => {
      group.types.forEach(type => {
        this.permissionsMap.find(g => g.groupName == group.groupName)?.types
          .filter(p => p.type == type.type)
          .map(p => p.permissions)
          .forEach(permission => {
            permission.forEach(p => {
              if (type[p['name']]) {
                updatedPermissions.push({
                  code: p['code'],
                  active: type[p['name']]
                });
              }
            });
          });
      });
    });
    return updatedPermissions;
  }

  cancel() {
    this.router.navigate(['/settings/general/roles']);
  }

}
