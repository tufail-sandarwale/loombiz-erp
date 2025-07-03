import { Routes } from '@angular/router';
import { NotificationComponent } from './notification.component';
import { NotificationListComponent } from './notification-list/notification-list.component';

export default [
  {
    path: '',
    component: NotificationComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: NotificationListComponent
      }
    ]
  }

] as Routes;