import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
  private rolesPermission: string[] = []
  private branchModules: string[] = []
  set permission(rolesPermission: string[]) {
    this.rolesPermission = rolesPermission;
  }

  get permission(): string[] {
    return this.rolesPermission;
  }

  set modules(branchModules: string[]) {
    this.branchModules = branchModules;
  }

  get modules(): string[] {
    return this.branchModules;
  }
}
