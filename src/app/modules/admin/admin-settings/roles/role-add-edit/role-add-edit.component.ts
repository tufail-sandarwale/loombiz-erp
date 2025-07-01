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
  roleForm: FormGroup;
  permissions: any[];
  permissionsMap = permissionsData;
  currentRole: any;
  editMode: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RolesService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertsService) {
    this.createRoleForm();
    this.currentRole = this.route.snapshot.data['role'];
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id && this.currentRole) {
        this.editMode = true;
        this.patchFormValues();
      }
    });

  }

  ngOnInit(): void {
  }

  createRoleForm() {
    const groupControls = this.permissionsMap.reduce((acc, group) => {
      group.types.forEach(type => {
        type.permissions.forEach(permission => {
          acc[permission.code] = new FormControl(permission.checked);
        });
      });
      return acc;
    }, {});
    this.roleForm = this.formBuilder.group({
      name: ['', Validators.required],
      ...groupControls
    });
  }

  patchFormValues() {
    this.roleForm.patchValue({
      name: this.currentRole.name,
    });

    this.permissionsMap.forEach(group => {
      group.types.forEach(type => {
        type.permissions.forEach(permission => {
          this.roleForm.get(permission.code).setValue(this.currentRole.permissions.map(p => p.code).includes(permission.code));
        });
      });
    });
  }

  onSubmit() {
    console.log(this.roleForm.value);
    if (this.roleForm.valid) {
      let role = {
        id: this.currentRole?.id,
        name: this.getFormControlValue('name'),
        permissions: this.getPermissionCodesFromForm()
      }
      if (!this.editMode) {
        this.roleService.addRole(role).subscribe({
          next: (next) => {
            console.log(next);
            this.alertService.showAlert('Role created successfully', true);
            this.router.navigate(['/setting/roles']);
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
            this.router.navigate(['/setting/roles']);
          },
          error: (error) => {
            console.log(error);
            this.alertService.showAlert('Role update failed', false);
          }
        });
      }
    }
  }

  getFormControlValue(controlName: string) {
    return this.roleForm.get(controlName).value;
  }

  getPermissionCodesFromForm() {
    let checkedCodes = [];
    this.getAllPermissionCodes().forEach(element => {
      if (this.getFormControlValue(element)) {
        checkedCodes.push({ code: element });
      }
    });
    return checkedCodes;
  }

  getAllPermissionCodes(): any[] {
    const allPermissionCodes: string[] = permissionsData.reduce((acc: string[], group) => {
      group.types.forEach((type) => {
        type.permissions.forEach((permission) => {
          acc.push(permission.code);
        });
      });
      return acc;
    }, []);
    return allPermissionCodes;
  }


  cancel() {
    this.router.navigate(['/setting/roles']);
  }
}
