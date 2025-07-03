import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'app/core/services/alerts.service';
import { TranslocoModule } from '@ngneat/transloco';
import { ClientSideTableViewComponent } from 'app/modules/shared/component/client-side-table-view/client-side-table-view.component';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { AddProductSharedDialogComponent } from 'app/modules/shared/component/dialog-popup/add-product-dialog/add-product-dialog.component';
 import { NotificationService } from './notification.service';
// import { AdditionalChargesListComponent } from './additional-charges-list/additional-charges-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule,TranslocoModule,ClientSideTableViewComponent, SharedMaterialModules, ReactiveFormsModule,
    AddProductSharedDialogComponent,RouterOutlet],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

}
