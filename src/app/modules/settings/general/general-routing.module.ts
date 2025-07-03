import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { GeneralSettingsComponent } from './general-settings.component';
// import { ContactCategoriesService } from './contact-categories-service/contact-categories.service';




export default [
  {
    path: '',
    component: GeneralSettingsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'roles',
      },
      {
        path: 'roles',
        loadChildren: () => import('app/modules/settings/general/roles/roles-routing.module')
      },
     
    ]
  }

] as Routes;