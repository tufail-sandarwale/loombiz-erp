import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet,RouterModule  } from '@angular/router';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';

@Component({
  selector: 'app-general-settings',
  standalone: true,
  imports: [CommonModule, RouterLink, SharedMaterialModules, RouterOutlet,RouterModule],
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.scss'
})
export class GeneralSettingsComponent {
    constructor(private router: Router) {}

    isExactRoute(route: string): boolean {
      return this.router.url === route;
    }
  
    // Check if the current URL contains a subroute and is not exactly the base route
    isSubRoute(baseRoute: string, subRoutes: string[]): boolean {
      return subRoutes.some(subRoute => this.router.url.includes(subRoute)) && this.router.url !== baseRoute;
    }
}
