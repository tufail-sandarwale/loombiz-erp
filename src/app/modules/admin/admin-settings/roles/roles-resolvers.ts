import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { PermissionService } from 'app/core/services/permission.service';
import { catchError, throwError } from 'rxjs';
import { RolesService } from './roles.service';
export const permissionsResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const permissionService = inject(PermissionService);
    return permissionService.getPermissions().pipe(
        // Error here means the requested course is not available
        catchError((error) => {
            // Log the error
            console.error(error);
            // Throw an error
            return throwError(error);
        }),
    );
};

export const roleByIdResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const roleService = inject(RolesService);
    const roleId = route.paramMap.get('id');
    return roleService.getRole(roleId).pipe(
        // Error here means the requested course is not available
        catchError((error) => {
            // Log the error
            console.error(error);
            // Throw an error
            return throwError(error);
        }),
    );
};