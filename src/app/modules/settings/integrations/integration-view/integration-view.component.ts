import { Component, OnInit } from '@angular/core';
import { Router,RouterLink, RouterLinkActive, RouterOutlet,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from 'app/core/user/user.service';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from 'app/modules/admin/admin-settings/roles/roles.service';
import { TranslocoModule } from '@ngneat/transloco';
import { QuillEditorComponent } from 'ngx-quill';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-integration-view',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, TranslocoModule, RouterOutlet, RouterLink, RouterLinkActive,RouterModule],
  templateUrl: './integration-view.component.html',
  styleUrl: './integration-view.component.scss'
})
export class IntegrationViewComponent {
  constructor(private router: Router) {}

  onTabChange(event: MatTabChangeEvent): void {
    const tabLabel = event.tab.textLabel.trim();
  
    if (tabLabel === 'Messages') {
      this.router.navigate(['/settings/integrations/integration-messages']);
    }
  }
  
}
