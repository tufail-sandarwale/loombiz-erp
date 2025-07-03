import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'app/core/user/user.service';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { ActivatedRoute } from '@angular/router';
import { BankService } from '../bank.service';
import { RolesService } from 'app/modules/admin/admin-settings/roles/roles.service';
import { TranslocoModule } from '@ngneat/transloco';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-bank-view',
  standalone: true,
  imports: [
    CommonModule,
    SharedMaterialModules,
    SharedFormFmodules,
    TranslocoModule,
    QuillEditorComponent,
  ],
  templateUrl: './bank-view.component.html',
  styleUrls: ['./bank-view.component.scss'],  // Corrected the key to styleUrls
})
export class BankViewComponent implements OnInit {
  currentBank: any; // The bank details resolved from the route
  sessionUser: any; // The current session user

  

  constructor(
    private route: ActivatedRoute,
    private roleService: RolesService,
    private bankService: BankService,
    private userSerive: UserService,
   
  ) {
    this.userSerive.user$.subscribe({
      next: user => {
        this.sessionUser = user;
        this.currentBank = this.route.snapshot.data['bank'];
          console.log('this.currentBank', this.currentBank);
        },
      error: error => {

      }
    })
    
  }
  ngOnInit(): void {

  }
}
