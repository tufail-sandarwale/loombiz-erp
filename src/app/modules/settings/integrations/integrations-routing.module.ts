import { Routes } from '@angular/router';
import { IntegrationsComponent } from './integrations.component';
import { IntegrationViewComponent } from './integration-view/integration-view.component';
import { IntegrationMessagesComponent } from './integration-messages/integration-messages.component';






export default [
  {
    path: '',
    component:IntegrationViewComponent,
    children:[
      {
        path: '', 
        redirectTo: 'integration-messages',
        pathMatch: 'full',
      },
      {
        path: 'integration-messages',
        pathMatch: 'full',
        component: IntegrationMessagesComponent,
      }
    ]
  },
 

] as Routes;