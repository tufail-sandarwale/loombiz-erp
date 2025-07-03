import { mapToCanActivate, Routes } from '@angular/router';
// import { SettingGeneralPermissionGuard } from 'app/core/auth/guards/setting-general.guards';
// import { SettingMastersPermissionGuard } from 'app/core/auth/guards/setting-masters.guards';
// import { SettingPOSPermissionGuard } from 'app/core/auth/guards/setting-pos.guards';



export default [
  {
    path: 'general',
    // canActivate: mapToCanActivate([SettingGeneralPermissionGuard]),
    loadChildren: () => import('app/modules/settings/general/general-routing.module')
  },
  
 
  {
    path: 'sale-despatch',
    loadChildren: () => import('app/modules/settings/sale-despatch/sale-despatch-routing.module')
  },
  {
    path: 'accounts',
    loadChildren: () => import('app/modules/settings/accounts/accounts-routing.module')
  },
  {
    path: 'procurement',
    loadChildren: () => import('app/modules/settings/procurement/procurement-routing.module')
  },
  {
    path: 'ho-store',
    loadChildren: () => import('app/modules/settings/ho-store/ho-store-routing.module')
  },
  {
    path: 'ho-franchise',
    loadChildren: () => import('app/modules/settings/ho-franchise/ho-franchise-routing.module')
  },
  {
    path: 'crm-sale-promotion',
    loadChildren: () => import('app/modules/settings/crm-sale-promotion/crm-sale-promotion-routing.module')
  },
  {
    path: 'discount-scheme',
    loadChildren: () => import('app/modules/settings/discount-scheme/discount-scheme-routing.module')
  },
  {
    path: 'utilities',
    loadChildren: () => import('app/modules/settings/utilities/utilities-routing.module')
  },
  {
    path: 'reports',
    loadChildren: () => import('app/modules/settings/reports/reports-routing.module')
  },
  {
    path: 'integrations',
    loadChildren: () => import('app/modules/settings/integrations/integrations-routing.module')
  },
  {
    path: 'notification',
    loadChildren: () => import('app/modules/settings/notification/notification-routing.module')
  },
  {
    path: 'logs',
    loadChildren: () => import('app/modules/settings/logs/logs-routing.module')
  },
  {
    path: 'inventory',
    loadChildren: () => import('app/modules/settings/inventory/inventory-routing.module')
  }

] as Routes;