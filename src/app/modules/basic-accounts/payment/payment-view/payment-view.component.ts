import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'app/core/user/user.service';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../payment.service';
import { RolesService } from 'app/modules/admin/admin-settings/roles/roles.service';
import { TranslocoModule } from '@ngneat/transloco';
import { QuillEditorComponent } from 'ngx-quill';


@Component({
  selector: 'app-payment-view',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, SharedFormFmodules, TranslocoModule, QuillEditorComponent],
  templateUrl: './payment-view.component.html',
  styleUrl: './payment-view.component.scss'
})
export class PaymentViewComponent {
  
  currentSupplier;
  sessionUser;
  constructor(
    private route: ActivatedRoute,
    private roleService: RolesService,
    private supplierProductService: PaymentService,
    private userSerive: UserService,
   
  ) {
    this.userSerive.user$.subscribe({
      next: user => {
        this.sessionUser = user;
        this.currentSupplier = this.route.snapshot.data['product'];
       console.log(this.route.snapshot.data,   this.sessionUser);
        },
      error: error => {

      }
    })
  }

  ngOnInit(): void {

  }

}
