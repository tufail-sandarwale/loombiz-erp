import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { QuillEditorComponent } from 'ngx-quill';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from 'app/modules/admin/admin-settings/roles/roles.service';
import { UserService } from 'app/core/user/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { UdfService } from 'app/core/services/udf.service';
import { RVConstants } from 'app/core/rv-constants';
import { ProductService } from 'app/modules/inventory/product/product.service';
import { TaxService } from 'app/core/services/tax.service';
@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, TranslocoModule, QuillEditorComponent],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})
export class ProfileViewComponent implements OnInit {
  user = {
    name: 'John Doe',
    address: '1234 Elm Street',
    state: 'California',
    city: 'Los Angeles',
    mobileNumber: '+1 234 567 890',
    email: 'john.doe@example.com'
  };
  constructor( ) { }
  ngOnInit(): void {  }

  
}
