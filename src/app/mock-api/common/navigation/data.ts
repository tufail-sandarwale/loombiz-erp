/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'home',
        title: 'Home',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/home',
    },
    {
        id: 'employee',
        title: 'Employee',
        type: 'basic',
        icon: 'heroicons_outline:users',
        link: '/masters/employee',
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'collapsable',
        icon: 'heroicons_solid:window',
        children: [
            {
                id: 'emp-performance',
                title: 'EMP Sale Performance',
                type: 'basic',
                icon: 'heroicons_solid:arrow-trending-up',
                link: '/dashboard/emp-performance',
            },
            {
                id: 'sales-dashboard',
                title: 'Sales Dashboard',
                type: 'basic',
                icon: 'mat_solid:point_of_sale',
                link: '/dashboard/sales-dashboard',
            },
        ]
    },
      
    // {
    //     id: 'masters',
    //     title: 'Masters',
    //     type: 'collapsable',
    //     icon: 'mat_solid:inventory_2',
    //     // roleSecurity: 'MASTERS',
    //     // moduleSecurity: 'MENU_MASTERS',
    //     children: [
    //         {
    //             id: 'employee',
    //             title: 'Employee Master',
    //             type: 'basic',
    //             icon: 'heroicons_outline:users',
    //             link: '/masters/employee',
    //             // moduleSecurity: 'SUBMENU_EMPLOYEE_MASTER'
    //         }, 

    //     ]
    // },
    
    
    {
        id: 'reports',
        title: 'Reports',
        type: 'collapsable',
        icon: 'heroicons_solid:document-check',
        children: [
            {
                id: 'accounts-report',
                title: 'Accounts',
                type: 'basic',
                icon: 'heroicons_solid:user-circle',
                link: '/reports/accounts-report',
                // roleSecurity: 'ACCOUNTS_SETINGS',
            },
            // {
            //     id: 'masters-report',
            //     title: 'Masters',
            //     type: 'basic',
            //     icon: 'mat_solid:inventory_2',
            //     link: '/reports/masters-report',
            //     // roleSecurity: 'MASTERS_SETINGS',
            // }, {
            //     id: 'pos-report',
            //     title: 'POS(Retails)',
            //     type: 'basic',
            //     icon: 'mat_solid:point_of_sale',
            //     link: '/reports/pos-report',
            //     // roleSecurity: 'POS_SETINGS',
            // },
            // {
            //     id: 'sale-despatch-report',
            //     title: 'Sale & Despatch(B2B)',
            //     type: 'basic',
            //     icon: 'heroicons_solid:arrows-right-left',
            //     link: '/reports/sale-despatch-report',
            //     // roleSecurity: 'SALE_DESPATCH_SETINGS',
            // },
            
            // {
            //     id: 'procurement-report',
            //     title: 'Procurement',
            //     type: 'basic',
            //     icon: 'heroicons_solid:shopping-cart',
            //     link: '/reports/procurement-report',
            //     // roleSecurity: 'PROCUREMENT_SETINGS',
            // },
            // {
            //     id: 'ho-store-report',
            //     title: 'HO & Store',
            //     type: 'basic',
            //     icon: 'heroicons_solid:home-modern',
            //     link: '/reports/ho-store-report',
            //     // roleSecurity: 'HO_STORE_SETINGS',
            // },
            // {
            //     id: 'ho-franchise-report',
            //     title: 'HO & Franchise',
            //     type: 'basic',
            //     icon: 'heroicons_solid:square-3-stack-3d',
            //     link: '/reports/ho-franchise-report',
            //     // roleSecurity: 'HO_FRANCHISE__SETINGS',
            // },
            // {
            //     id: 'crm-sale-promotion-report',
            //     title: 'CRM & Sale Promotion',
            //     type: 'basic',
            //     icon: 'heroicons_solid:megaphone',
            //     link: '/reports/crm-sale-promotion-report',
            //     // roleSecurity: 'CRM_SALE_PROMOTION_SETINGS',
            // },
            // {
            //     id: 'discount-scheme-report',
            //     title: 'Discount Scheme',
            //     type: 'basic',
            //     icon: 'heroicons_solid:receipt-percent',
            //     link: '/reports/discount-scheme-report',
            //     // roleSecurity: 'DISCOUNT_SCHEME_SETINGS',
            // },
            
        ]
    },

    {
        id: 'setting',
        title: 'Setting',
        type: 'collapsable',
        icon: 'mat_outline:settings',
        children: [
            {
                id: 'role',
                title: 'Role',
                type: 'basic',
                icon: 'mat_outline:settings_accessibility',
                link: '/settings/general/roles',
                // roleSecurity: 'GENERAL_SETINGS',
            },
            // {
            //     id: 'general',
            //     title: 'General',
            //     type: 'basic',
            //     icon: 'mat_outline:settings_accessibility',
            //     link: '/settings/general',
            //     // roleSecurity: 'GENERAL_SETINGS',
            // },
            //  {
            //     id: 'masters',
            //     title: 'Masters',
            //     type: 'basic',
            //     icon: 'heroicons_solid:building-storefront',
            //     link: '/settings/masters',
            //     // roleSecurity: 'MASTERS_SETINGS',
            // },
            // {
            //     id: 'pos',
            //     title: 'POS(Retails)',
            //     type: 'basic',
            //     icon: 'mat_solid:point_of_sale',
            //     link: '/settings/pos',
            //     // roleSecurity: 'POS_SETINGS',
            // },
            // {
            //     id: 'inventory-setting',
            //     title: 'Inventory',
            //     type: 'basic',
            //     icon: 'mat_solid:point_of_sale',
            //     link: '/settings/inventory',
            //     // roleSecurity: 'INVENTORY_SETINGS',
            // },
            // {
            //     id: 'sale-despatch',
            //     title: 'Sale & Despatch(B2B)',
            //     type: 'basic',
            //     icon: 'heroicons_solid:arrows-right-left',
            //     link: '/settings/sale-despatch',
            //     // roleSecurity: 'SALE_DESPATCH_SETINGS',
            // },
            // {
            //     id: 'accounts',
            //     title: 'Accounts',
            //     type: 'basic',
            //     icon: 'heroicons_solid:user-circle',
            //     link: '/settings/accounts',
            //     // roleSecurity: 'ACCOUNTS_SETINGS',
            // },
            // {
            //     id: 'procurement',
            //     title: 'Procurement',
            //     type: 'basic',
            //     icon: 'heroicons_solid:shopping-cart',
            //     link: '/settings/procurement',
            //     // roleSecurity: 'PROCUREMENT_SETINGS',
            // },
            // {
            //     id: 'ho-store',
            //     title: 'HO & Store',
            //     type: 'basic',
            //     icon: 'heroicons_solid:home-modern',
            //     link: '/settings/ho-store',
            //     // roleSecurity: 'HO_STORE_SETINGS',
            // },
            // {
            //     id: 'ho-franchise',
            //     title: 'HO & Franchise',
            //     type: 'basic',
            //     icon: 'heroicons_solid:square-3-stack-3d',
            //     link: '/settings/ho-franchise',
            //     // roleSecurity: 'HO_FRANCHISE__SETINGS',
            // },
            // {
            //     id: 'crm-sale-promotion',
            //     title: 'CRM & Sale Promotion',
            //     type: 'basic',
            //     icon: 'heroicons_solid:megaphone',
            //     link: '/settings/crm-sale-promotion',
            //     // roleSecurity: 'CRM_SALE_PROMOTION_SETINGS',
            // },
            // {
            //     id: 'discount-scheme',
            //     title: 'Discount Scheme',
            //     type: 'basic',
            //     icon: 'heroicons_solid:receipt-percent',
            //     link: '/settings/discount-scheme',
            //     // roleSecurity: 'DISCOUNT_SCHEME_SETINGS',
            // },
            // {
            //     id: 'utilities',
            //     title: 'Utilities',
            //     type: 'basic',
            //     icon: 'heroicons_solid:squares-2x2',
            //     link: '/settings/utilities',
            //     // roleSecurity: 'UTILITIES_SETINGS',
            // },
            // {
            //     id: 'reports-settings',
            //     title: 'Reports',
            //     type: 'basic',
            //     icon: 'heroicons_solid:document-check',
            //     link: '/settings/reports',
            //     // roleSecurity: 'REPORTS_SETINGS',
            // },
            // {
            //     id: 'integrations',
            //     title: 'Integrations',
            //     type: 'basic',
            //     icon: 'heroicons_solid:cog',
            //     link: '/settings/integrations',
            //     // roleSecurity: 'INTEGRATIONS_SETINGS',
            // },
            // {
            //     id: 'notification',
            //     title: 'Notification',
            //     type: 'basic',
            //     icon: 'heroicons_solid:bell-alert',
            //     link: '/settings/notification',
            //     // roleSecurity: 'NOTIFICATION_SETINGS',
            // }
            // ,
            // {
            //     id: 'logs',
            //     title: 'Logs',
            //     type: 'basic',
            //     icon: 'heroicons_solid:document-chart-bar',
            //     link: '/settings/logs',
            //     // roleSecurity: 'LOGS_SETINGS',
            // }
        ]
    },
   

];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'home',
        title: 'Home',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/home'
    },
    {
        id: 'pos',
        title: 'POS(Retail)',
        type: 'collapsable',
        icon: 'mat_solid:point_of_sale',
        // roleSecurity: 'POS',
        children: [
            // {
            //     id: 'employee',
            //     title: 'Employee Master',
            //     type: 'basic',
            //     icon: 'heroicons_outline:users',
            //     link: '/pos/employee'
            // }, {
            //     id: 'contact',
            //     title: 'Customer Master',
            //     type: 'basic',
            //     icon: 'mat_solid:contact_phone',
            //     link: '/pos/contact'
            // },
            {
                id: 'sale',
                title: 'Sale',
                type: 'basic',
                icon: 'heroicons_outline:tag',
                link: '/pos/sale'
            }, {
                id: 'credit-notes',
                title: 'Credit Notes',
                type: 'basic',
                icon: 'heroicons_outline:credit-card',
                link: '/pos/credit-notes'
            }, {
                id: 'advance-booking',
                title: 'Advance Booking',
                type: 'basic',
                icon: 'heroicons_outline:computer-desktop',
                link: '/pos/advance-booking'
            }, {
                id: 'quotation',
                title: 'Quotation',
                type: 'basic',
                icon: 'heroicons_outline:queue-list',
                link: '/pos/quotation'
            },
            {
                id: 'sale-order',
                title: 'Sale Order',
                type: 'basic',
                icon: 'heroicons_outline:shopping-bag',
                link: '/pos/sale-order'
            },
            {
                id: 'alteration',
                title: 'Alteration',
                type: 'basic',
                icon: 'heroicons_outline:scissors',
                link: '/pos/alteration'
            },
            {
                id: 'tailoring',
                title: 'Tailoring',
                type: 'basic',
                icon: 'heroicons_outline:rectangle-group',
                link: '/pos/tailoring'
            },
            {
                id: 'sales-register',
                title: 'Sales Register / Daybook',
                type: 'basic',
                icon: 'heroicons_outline:book-open',
                link: '/pos/sales-register'
            },
            {
                id: 'cash-handover-utility',
                title: 'Cash Handover Utility',
                type: 'basic',
                icon: 'heroicons_outline:banknotes',
                link: '/pos/cash-handover-utility'
            }
        ]
    },
    {
        id: 'masters',
        title: 'Masters',
        type: 'collapsable',
        icon: 'mat_solid:inventory_2',
        // roleSecurity: 'MASTERS',
        children: [
            {
                id: 'employee',
                title: 'Employee Master',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/masters/employee'
            }, {
                id: 'contact',
                title: 'Customer Master',
                type: 'basic',
                icon: 'mat_solid:contact_phone',
                link: '/masters/contact'
            },
            {
                id: 'supplier',
                title: 'Supplier Master',
                type: 'basic',
                icon: 'heroicons_outline:swatch',
                link: '/masters/supplier-master'
            },
            {
                id: 'transport',
                title: 'Transport Master',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/masters/transport-master'
            },
            {
                id: 'service-center',
                title: 'Service Center Master',
                type: 'basic',
                icon: 'heroicons_outline:wrench-screwdriver',
                link: '/masters/service-center'
            }, {
                id: 'unit-of-measurment',
                title: 'Unit Of Measurment (UOM)',
                type: 'basic',
                icon: 'mat_outline:ad_units',
                link: '/masters/unit-of-measurment'
            }, {
                id: 'product',
                title: 'Product Master',
                type: 'basic',
                icon: 'heroicons_solid:archive-box-arrow-down',
                link: '/masters/product',
                // roleSecurity: 'PRODUCTS',
            },
            {
                id: 'product-attributes',
                title: 'Product Attributes',
                type: 'basic',
                icon: 'heroicons_outline:squares-plus',
                link: '/masters/product-attributes'
            }, {
                id: 'product-variants',
                title: 'Product Variants',
                type: 'basic',
                icon: 'mat_outline:category',
                link: '/masters/product-variants'
            },

        ]
    },
    {
        id: 'basic-accounts',
        title: 'Basic Accounts',
        type: 'collapsable',
        icon: 'mat_solid:account_balance',
        children: [
            {
                id: 'account-groups',
                title: 'Account Groups',
                type: 'basic',
                icon: 'heroicons_solid:user-group',
                link: '/basic-accounts/account-groups',
                // roleSecurity: 'ACCOUNT-GROUPS_BASIC-ACCOUNTS',
            }, 
            {
                id: 'account',
                title: 'Account',
                type: 'basic',
                icon: 'heroicons_solid:user-circle',
                link: '/basic-accounts/account',
                // roleSecurity: 'ACCOUNT_BASIC-ACCOUNTS',
            },
            {
                id: 'bank',
                title: 'Bank',
                type: 'basic',
                icon: 'heroicons_solid:banknotes',
                link: '/basic-accounts/bank',
                // roleSecurity: 'BANK_BASIC-ACCOUNTS',
            },
            {
                id: 'ledgers',
                title: 'Ledgers',
                type: 'basic',
                icon: 'heroicons_solid:newspaper',
                link: '/basic-accounts/ledgers',
                // roleSecurity: 'LEDGERS_BASIC-ACCOUNTS',
            },
            {
                id: 'payment',
                title: 'Payment',
                type: 'basic',
                icon: 'mat_solid:payment',
                link: '/basic-accounts/payment',
                // roleSecurity: 'PAYMENT_BASIC-ACCOUNTS',
            },
            {
                id: 'receipt',
                title: 'Receipt',
                type: 'basic',
                icon: 'mat_solid:receipt',
                link: '/basic-accounts/receipt',
                // roleSecurity: 'RECEIPT_BASIC-ACCOUNTS',
            },
            // {
            //     id: 'credit-note',
            //     title: 'Credit Note',
            //     type: 'basic',
            //     icon: 'heroicons_solid:credit-card',
            //     link: '/basic-accounts/credit-note',
            //     //moduleSecurity: 'SUBMENU_CREDIT_NOTE'
            // },
            // {
            //     id: 'debit-note',
            //     title: 'Debit Note',
            //     type: 'basic',
            //     icon: 'heroicons_solid:folder-minus',
            //     link: '/basic-accounts/debit-note',
            //     //moduleSecurity: 'SUBMENU_DEBIT_NOTE'
            // },
            {
                id: 'contra',
                title: 'Contra',
                type: 'basic',
                icon: 'heroicons_solid:squares-plus',
                link: '/basic-accounts/contra',
                // roleSecurity: 'CONTRA_BASIC-ACCOUNTS',
            },
            {
                id: 'jounal-voucher',
                title: 'Jounal-Voucher',
                type: 'basic',
                icon: 'heroicons_solid:clipboard-document-list',
                link: '/basic-accounts/jounal-voucher',
                // roleSecurity: 'JOUNAL-VOUCHER_BASIC-ACCOUNTS',
            },
            {
                id: 'expense',
                title: 'Expense',
                type: 'basic',
                icon: 'heroicons_solid:currency-rupee',
                link: '/basic-accounts/expense',
                // roleSecurity: 'EXPENSE_BASIC-ACCOUNTS',
            },
            {
                id: 'petty-cash-book',
                title: 'Petty Cash Book',
                type: 'basic',
                icon: 'mat_solid:book',
                link: '/basic-accounts/petty-cash-book',
                // roleSecurity: 'PETTY-CASH-BOOK_BASIC-ACCOUNTS',
            },
        ]
    },
    {
        id: 'discount-scheme-menu',
        title: 'Discount Scheme',
        type: 'collapsable',
        icon: 'heroicons_solid:receipt-percent',
        children: [
            {
                id: 'price-modification',
                title: 'Price Modification',
                type: 'basic',
                icon: 'heroicons_solid:arrow-trending-up',
                link: '/discount-scheme/price-modification',
                // roleSecurity: 'PRICE-MODIFICATION_DISCOUNT-SCHEME',
            }, {
                id: 'discount-scheme-1',
                title: 'Discount-Scheme-1',
                type: 'basic',
                icon: 'heroicons_solid:arrows-right-left',
                link: '/discount-scheme/discount-scheme-1',
                // roleSecurity: 'DISCOUNT-SCHEME-1_DISCOUNT-SCHEME',
            },
            {
                id: 'discount-scheme-2',
                title: 'Discount-Scheme-2',
                type: 'basic',
                icon: 'heroicons_solid:arrows-right-left',
                link: '/discount-scheme/discount-scheme-2',
                // roleSecurity: 'DISCOUNT-SCHEME-2_DISCOUNT-SCHEME',
            },
            {
                id: 'discount-scheme-3',
                title: 'Discount-Scheme-3',
                type: 'basic',
                icon: 'heroicons_solid:arrows-right-left',
                link: '/discount-scheme/discount-scheme-3',
                // roleSecurity: 'DISCOUNT-SCHEME-3_DISCOUNT-SCHEME',
            },
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'collapsable',
        icon: 'heroicons_solid:document-check',
        children: [
            
            {
                id: 'masters-report',
                title: 'Masters',
                type: 'basic',
                icon: 'mat_solid:inventory_2',
                link: '/reports/masters-report',
                // roleSecurity: 'MASTERS_SETINGS',
            }, {
                id: 'pos-report',
                title: 'POS(Retails)',
                type: 'basic',
                icon: 'mat_solid:point_of_sale',
                link: '/reports/pos-report',
                // roleSecurity: 'POS_SETINGS',
            },
            {
                id: 'sale-despatch-report',
                title: 'Sale & Despatch(B2B)',
                type: 'basic',
                icon: 'heroicons_solid:arrows-right-left',
                link: '/reports/sale-despatch-report',
                // roleSecurity: 'SALE_DESPATCH_SETINGS',
            },
            {
                id: 'accounts-report',
                title: 'Accounts',
                type: 'basic',
                icon: 'heroicons_solid:user-circle',
                link: '/reports/accounts-report',
                // roleSecurity: 'ACCOUNTS_SETINGS',
            },
            {
                id: 'procurement-report',
                title: 'Procurement',
                type: 'basic',
                icon: 'heroicons_solid:shopping-cart',
                link: '/reports/procurement-report',
                // roleSecurity: 'PROCUREMENT_SETINGS',
            },
            {
                id: 'ho-store-report',
                title: 'HO & Store',
                type: 'basic',
                icon: 'heroicons_solid:home-modern',
                link: '/reports/ho-store-report',
                // roleSecurity: 'HO_STORE_SETINGS',
            },
            {
                id: 'ho-franchise-report',
                title: 'HO & Franchise',
                type: 'basic',
                icon: 'heroicons_solid:square-3-stack-3d',
                link: '/reports/ho-franchise-report',
                // roleSecurity: 'HO_FRANCHISE__SETINGS',
            },
            {
                id: 'crm-sale-promotion-report',
                title: 'CRM & Sale Promotion',
                type: 'basic',
                icon: 'heroicons_solid:megaphone',
                link: '/reports/crm-sale-promotion-report',
                // roleSecurity: 'CRM_SALE_PROMOTION_SETINGS',
            },
            {
                id: 'discount-scheme-report',
                title: 'Discount Scheme',
                type: 'basic',
                icon: 'heroicons_solid:receipt-percent',
                link: '/reports/discount-scheme-report',
                // roleSecurity: 'DISCOUNT_SCHEME_SETINGS',
            },
            
        ]
    },
    {
        id: 'setting',
        title: 'Setting',
        type: 'collapsable',
        icon: 'mat_outline:settings',
        children: [
            {
                id: 'general',
                title: 'General',
                type: 'basic',
                icon: 'mat_outline:settings_accessibility',
                link: '/settings/general',
                // roleSecurity: 'GENERAL_SETINGS',
            }, {
                id: 'masters',
                title: 'Masters',
                type: 'basic',
                icon: 'heroicons_solid:building-storefront',
                link: '/settings/masters',
                // roleSecurity: 'MASTERS_SETINGS',
            }, {
                id: 'pos',
                title: 'POS(Retails)',
                type: 'basic',
                icon: 'heroicons_solid:building-storefront',
                link: '/settings/pos',
                // roleSecurity: 'POS_SETINGS',
            },
            {
                id: 'sale-despatch',
                title: 'Sale & Despatch(B2B)',
                type: 'basic',
                icon: 'heroicons_solid:arrows-right-left',
                link: '/settings/sale-despatch',
                // roleSecurity: 'SALE_DESPATCH_SETINGS',
            },
            {
                id: 'accounts',
                title: 'Accounts',
                type: 'basic',
                icon: 'heroicons_solid:user-circle',
                link: '/settings/accounts',
                // roleSecurity: 'ACCOUNTS_SETINGS',
            },
            {
                id: 'procurement',
                title: 'Procurement',
                type: 'basic',
                icon: 'heroicons_solid:shopping-cart',
                link: '/settings/procurement',
                // roleSecurity: 'PROCUREMENT_SETINGS',
            },
            {
                id: 'ho-store',
                title: 'HO & Store',
                type: 'basic',
                icon: 'heroicons_solid:home-modern',
                link: '/settings/ho-store',
                // roleSecurity: 'HO_STORE_SETINGS',
            },
            {
                id: 'ho-franchise',
                title: 'HO & Franchise',
                type: 'basic',
                icon: 'heroicons_solid:square-3-stack-3d',
                link: '/settings/ho-franchise',
                // roleSecurity: 'HO_FRANCHISE__SETINGS',
            },
            {
                id: 'crm-sale-promotion',
                title: 'CRM & Sale Promotion',
                type: 'basic',
                icon: 'heroicons_solid:megaphone',
                link: '/settings/crm-sale-promotion',
                // roleSecurity: 'CRM_SALE_PROMOTION_SETINGS',
            },
            {
                id: 'discount-scheme',
                title: 'Discount Scheme',
                type: 'basic',
                icon: 'heroicons_solid:receipt-percent',
                link: '/settings/discount-scheme',
                // roleSecurity: 'DISCOUNT_SCHEME_SETINGS',
            },
            {
                id: 'utilities',
                title: 'Utilities',
                type: 'basic',
                icon: 'heroicons_solid:squares-2x2',
                link: '/settings/utilities',
                // roleSecurity: 'UTILITIES_SETINGS',
            },
            {
                id: 'reports-settings',
                title: 'Reports',
                type: 'basic',
                icon: 'heroicons_solid:document-check',
                link: '/settings/reports',
                // roleSecurity: 'REPORTS_SETINGS',
            },
            {
                id: 'integrations',
                title: 'Integrations',
                type: 'basic',
                icon: 'heroicons_solid:cog',
                link: '/settings/integrations',
                // roleSecurity: 'INTEGRATIONS_SETINGS',
            },
            {
                id: 'notification',
                title: 'Notification',
                type: 'basic',
                icon: 'heroicons_solid:bell-alert',
                link: '/settings/notification',
                // roleSecurity: 'NOTIFICATION_SETINGS',
            }
            ,
            {
                id: 'logs',
                title: 'Logs',
                type: 'basic',
                icon: 'heroicons_solid:document-chart-bar',
                link: '/settings/logs',
                // roleSecurity: 'LOGS_SETINGS',
            }
        ]
    },
    {
        id: 'uitilies',
        title: 'Utilities',
        type: 'collapsable',
        icon: 'mat_solid:point_of_sale',
        children: [
            {
                id: 'databackup',
                title: 'Data Backup ',
                type: 'basic',
                icon: 'heroicons_outline:point_of_sale',
                link: '/utilities/data-backup'
            },
            {
                id: 'datasync',
                title: 'Data Sync ',
                type: 'basic',
                icon: 'heroicons_outline:arrow-path',
                link: '/utilities/data-sync'
            },
            {
                id: 'changepassword',
                title: 'Change Password ',
                type: 'basic',
                icon: 'heroicons_outline:finger-print',
                link: '/utilities/change-password'
            },
            {
                id: 'dayend',
                title: 'Day End / Settelment ',
                type: 'basic',
                icon: 'heroicons_outline:briefcase',
                link: '/utilities/day-end'
            },
            {
                id: 'yearendprocessing',
                title: 'Year End Processing',
                type: 'basic',
                icon: 'heroicons_outline:calendar',
                link: '/utilities/year-end-processing'
            },
            {
                id: 'stockchecking',
                title: 'Stock Checking / Audit',
                type: 'basic',
                icon: 'heroicons_outline:document-check',
                link: '/utilities/stock-checking'
            },
            {
                id: 'chequeprinting',
                title: 'Cheque Printing Utility',
                type: 'basic',
                icon: 'heroicons_outline:printer',
                link: '/utilities/cheque-printing'
            },
            {
                id: 'productbarcodeprinting',
                title: 'Product Barcode Printing',
                type: 'basic',
                icon: 'heroicons_outline:qr-code',
                link: '/utilities/product-barcode-printing'
            },
        ]
    },
    {
        id: 'administration',
        title: 'Administration (Retail View)',
        type: 'collapsable',
        icon: 'mat_solid:admin_panel_settings',
        children: [
            {
                id: 'firm',
                title: 'Company / Firm setup',
                type: 'basic',
                icon: 'heroicons_solid:arrows-pointing-out',
                link: '/administration/firm'
            },
            {
                id: 'store',
                title: 'Store / Franchaise Setup',
                type: 'basic',
                icon: 'mat_outline:local_convenience_store',
                link: '/administration/store'
            },
            {
                id: 'warehouse',
                title: 'Godown / Warehouse Setup',
                type: 'basic',
                icon: 'heroicons_solid:rectangle-stack',
                link: '/administration/warehouse'
            },
            {
                id: 'currency',
                title: 'Currency',
                type: 'basic',
                icon: 'heroicons_solid:currency-rupee',
                link: '/administration/currency'
            },
            {
                id: 'languages',
                title: 'Languages',
                type: 'basic',
                icon: 'heroicons_solid:language',
                link: '/administration/languages'
            }
        ]
    },

];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'home',
        title: 'Home',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/home'
    },
    {
        id: 'pos',
        title: 'POS(Retail)',
        type: 'collapsable',
        icon: 'mat_solid:point_of_sale',
        // roleSecurity: 'POS',
        children: [
            // {
            //     id: 'employee',
            //     title: 'Employee Master',
            //     type: 'basic',
            //     icon: 'heroicons_outline:users',
            //     link: '/pos/employee'
            // }, {
            //     id: 'contact',
            //     title: 'Customer Master',
            //     type: 'basic',
            //     icon: 'mat_solid:contact_phone',
            //     link: '/pos/contact'
            // },
            {
                id: 'sale',
                title: 'Sale',
                type: 'basic',
                icon: 'heroicons_outline:tag',
                link: '/pos/sale'
            }, {
                id: 'credit-notes',
                title: 'Credit Notes',
                type: 'basic',
                icon: 'heroicons_outline:credit-card',
                link: '/pos/credit-notes'
            }, {
                id: 'advance-booking',
                title: 'Advance Booking',
                type: 'basic',
                icon: 'heroicons_outline:computer-desktop',
                link: '/pos/advance-booking'
            }, {
                id: 'quotation',
                title: 'Quotation',
                type: 'basic',
                icon: 'heroicons_outline:queue-list',
                link: '/pos/quotation'
            },
            {
                id: 'sale-order',
                title: 'Sale Order',
                type: 'basic',
                icon: 'heroicons_outline:shopping-bag',
                link: '/pos/sale-order'
            },
            {
                id: 'alteration',
                title: 'Alteration',
                type: 'basic',
                icon: 'heroicons_outline:scissors',
                link: '/pos/alteration'
            },
            {
                id: 'tailoring',
                title: 'Tailoring',
                type: 'basic',
                icon: 'heroicons_outline:rectangle-group',
                link: '/pos/tailoring'
            },
            {
                id: 'sales-register',
                title: 'Sales Register / Daybook',
                type: 'basic',
                icon: 'heroicons_outline:book-open',
                link: '/pos/sales-register'
            },
            {
                id: 'cash-handover-utility',
                title: 'Cash Handover Utility',
                type: 'basic',
                icon: 'heroicons_outline:banknotes',
                link: '/pos/cash-handover-utility'
            }
        ]
    },
    {
        id: 'masters',
        title: 'Masters',
        type: 'collapsable',
        icon: 'mat_solid:inventory_2',
        // roleSecurity: 'MASTERS',
        children: [
            {
                id: 'employee',
                title: 'Employee Master',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/masters/employee'
            }, {
                id: 'contact',
                title: 'Customer Master',
                type: 'basic',
                icon: 'mat_solid:contact_phone',
                link: '/masters/contact'
            },
            {
                id: 'supplier',
                title: 'Supplier Master',
                type: 'basic',
                icon: 'heroicons_outline:swatch',
                link: '/masters/supplier-master'
            },
            {
                id: 'transport',
                title: 'Transport Master',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/masters/transport-master'
            },
            {
                id: 'service-center',
                title: 'Service Center Master',
                type: 'basic',
                icon: 'heroicons_outline:wrench-screwdriver',
                link: '/masters/service-center'
            },
            {
                id: 'unit-of-measurment',
                title: 'Unit Of Measurment (UOM)',
                type: 'basic',
                icon: 'mat_outline:ad_units',
                link: '/masters/unit-of-measurment'
            }, {
                id: 'product',
                title: 'Product Master',
                type: 'basic',
                icon: 'heroicons_solid:archive-box-arrow-down',
                link: '/masters/product',
                // roleSecurity: 'PRODUCTS',
            },
            {
                id: 'product-attributes',
                title: 'Product Attributes',
                type: 'basic',
                icon: 'heroicons_outline:squares-plus',
                link: '/masters/product-attributes'
            }, {
                id: 'product-variants',
                title: 'Product Variants',
                type: 'basic',
                icon: 'mat_outline:category',
                link: '/masters/product-variants'
            },

        ]
    },
    {
        id: 'basic-accounts',
        title: 'Basic Accounts',
        type: 'collapsable',
        icon: 'mat_solid:account_balance',
        children: [
            {
                id: 'account-groups',
                title: 'Account Groups',
                type: 'basic',
                icon: 'heroicons_solid:user-group',
                link: '/basic-accounts/account-groups',
                // roleSecurity: 'ACCOUNT-GROUPS_BASIC-ACCOUNTS',
            }, 
            {
                id: 'account',
                title: 'Account',
                type: 'basic',
                icon: 'heroicons_solid:user-circle',
                link: '/basic-accounts/account',
                // roleSecurity: 'ACCOUNT_BASIC-ACCOUNTS',
            },
            {
                id: 'bank',
                title: 'Bank',
                type: 'basic',
                icon: 'heroicons_solid:banknotes',
                link: '/basic-accounts/bank',
                // roleSecurity: 'BANK_BASIC-ACCOUNTS',
            },
            {
                id: 'ledgers',
                title: 'Ledgers',
                type: 'basic',
                icon: 'heroicons_solid:newspaper',
                link: '/basic-accounts/ledgers',
                // roleSecurity: 'LEDGERS_BASIC-ACCOUNTS',
            },
            {
                id: 'payment',
                title: 'Payment',
                type: 'basic',
                icon: 'mat_solid:payment',
                link: '/basic-accounts/payment',
                // roleSecurity: 'PAYMENT_BASIC-ACCOUNTS',
            },
            {
                id: 'receipt',
                title: 'Receipt',
                type: 'basic',
                icon: 'mat_solid:receipt',
                link: '/basic-accounts/receipt',
                // roleSecurity: 'RECEIPT_BASIC-ACCOUNTS',
            },
            // {
            //     id: 'credit-note',
            //     title: 'Credit Note',
            //     type: 'basic',
            //     icon: 'heroicons_solid:credit-card',
            //     link: '/basic-accounts/credit-note',
            //     //moduleSecurity: 'SUBMENU_CREDIT_NOTE'
            // },
            // {
            //     id: 'debit-note',
            //     title: 'Debit Note',
            //     type: 'basic',
            //     icon: 'heroicons_solid:folder-minus',
            //     link: '/basic-accounts/debit-note',
            //     //moduleSecurity: 'SUBMENU_DEBIT_NOTE'
            // },
            {
                id: 'contra',
                title: 'Contra',
                type: 'basic',
                icon: 'heroicons_solid:squares-plus',
                link: '/basic-accounts/contra',
                // roleSecurity: 'CONTRA_BASIC-ACCOUNTS',
            },
            {
                id: 'jounal-voucher',
                title: 'Jounal-Voucher',
                type: 'basic',
                icon: 'heroicons_solid:clipboard-document-list',
                link: '/basic-accounts/jounal-voucher',
                // roleSecurity: 'JOUNAL-VOUCHER_BASIC-ACCOUNTS',
            },
            {
                id: 'expense',
                title: 'Expense',
                type: 'basic',
                icon: 'heroicons_solid:currency-rupee',
                link: '/basic-accounts/expense',
                // roleSecurity: 'EXPENSE_BASIC-ACCOUNTS',
            },
            {
                id: 'petty-cash-book',
                title: 'Petty Cash Book',
                type: 'basic',
                icon: 'mat_solid:book',
                link: '/basic-accounts/petty-cash-book',
                // roleSecurity: 'PETTY-CASH-BOOK_BASIC-ACCOUNTS',
            },
        ]
    },
    {
        id: 'discount-scheme-menu',
        title: 'Discount Scheme',
        type: 'collapsable',
        icon: 'heroicons_solid:receipt-percent',
        children: [
            {
                id: 'price-modification',
                title: 'Price Modification',
                type: 'basic',
                icon: 'heroicons_solid:arrow-trending-up',
                link: '/discount-scheme/price-modification',
                // roleSecurity: 'PRICE-MODIFICATION_DISCOUNT-SCHEME',
            }, {
                id: 'discount-scheme-1',
                title: 'Discount-Scheme-1',
                type: 'basic',
                icon: 'heroicons_solid:arrows-right-left',
                link: '/discount-scheme/discount-scheme-1',
                // roleSecurity: 'DISCOUNT-SCHEME-1_DISCOUNT-SCHEME',
            },
            {
                id: 'discount-scheme-2',
                title: 'Discount-Scheme-2',
                type: 'basic',
                icon: 'heroicons_solid:arrows-right-left',
                link: '/discount-scheme/discount-scheme-2',
                // roleSecurity: 'DISCOUNT-SCHEME-2_DISCOUNT-SCHEME',
            },
            {
                id: 'discount-scheme-3',
                title: 'Discount-Scheme-3',
                type: 'basic',
                icon: 'heroicons_solid:arrows-right-left',
                link: '/discount-scheme/discount-scheme-3',
                // roleSecurity: 'DISCOUNT-SCHEME-3_DISCOUNT-SCHEME',
            },
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'collapsable',
        icon: 'heroicons_solid:document-check',
        children: [
            
            {
                id: 'masters-report',
                title: 'Masters',
                type: 'basic',
                icon: 'mat_solid:inventory_2',
                link: '/reports/masters-report',
                // roleSecurity: 'MASTERS_SETINGS',
            }, 
            {
                id: 'pos-report',
                title: 'POS(Retails)',
                type: 'basic',
                icon: 'mat_solid:point_of_sale',
                link: '/reports/pos-report',
                // roleSecurity: 'POS_SETINGS',
            },
            {
                id: 'sale-despatch-report',
                title: 'Sale & Despatch(B2B)',
                type: 'basic',
                icon: 'heroicons_solid:arrows-right-left',
                link: '/reports/sale-despatch-report',
                // roleSecurity: 'SALE_DESPATCH_SETINGS',
            },
            {
                id: 'accounts-report',
                title: 'Accounts',
                type: 'basic',
                icon: 'heroicons_solid:user-circle',
                link: '/reports/accounts-report',
                // roleSecurity: 'ACCOUNTS_SETINGS',
            },
            {
                id: 'procurement-report',
                title: 'Procurement',
                type: 'basic',
                icon: 'heroicons_solid:shopping-cart',
                link: '/reports/procurement-report',
                // roleSecurity: 'PROCUREMENT_SETINGS',
            },
            {
                id: 'ho-store-report',
                title: 'HO & Store',
                type: 'basic',
                icon: 'heroicons_solid:home-modern',
                link: '/reports/ho-store-report',
                // roleSecurity: 'HO_STORE_SETINGS',
            },
            {
                id: 'ho-franchise-report',
                title: 'HO & Franchise',
                type: 'basic',
                icon: 'heroicons_solid:square-3-stack-3d',
                link: '/reports/ho-franchise-report',
                // roleSecurity: 'HO_FRANCHISE__SETINGS',
            },
            {
                id: 'crm-sale-promotion-report',
                title: 'CRM & Sale Promotion',
                type: 'basic',
                icon: 'heroicons_solid:megaphone',
                link: '/reports/crm-sale-promotion-report',
                // roleSecurity: 'CRM_SALE_PROMOTION_SETINGS',
            },
            {
                id: 'discount-scheme-report',
                title: 'Discount Scheme',
                type: 'basic',
                icon: 'heroicons_solid:receipt-percent',
                link: '/reports/discount-scheme-report',
                // roleSecurity: 'DISCOUNT_SCHEME_SETINGS',
            },
            
        ]
    },
    {
        id: 'setting',
        title: 'Setting',
        type: 'collapsable',
        icon: 'mat_outline:settings',
        children: [
            {
                id: 'general',
                title: 'General',
                type: 'basic',
                icon: 'mat_outline:settings_accessibility',
                link: '/settings/general',
                // roleSecurity: 'GENERAL_SETINGS',
            }, {
                id: 'masters',
                title: 'Masters',
                type: 'basic',
                icon: 'heroicons_solid:building-storefront',
                link: '/settings/masters',
                // roleSecurity: 'MASTERS_SETINGS',
            }, {
                id: 'pos',
                title: 'POS(Retails)',
                type: 'basic',
                icon: 'heroicons_solid:building-storefront',
                link: '/settings/pos',
                // roleSecurity: 'POS_SETINGS',
            },
            {
                id: 'sale-despatch',
                title: 'Sale & Despatch(B2B)',
                type: 'basic',
                icon: 'heroicons_solid:arrows-right-left',
                link: '/settings/sale-despatch',
                // roleSecurity: 'SALE_DESPATCH_SETINGS',
            },
            {
                id: 'accounts',
                title: 'Accounts',
                type: 'basic',
                icon: 'heroicons_solid:user-circle',
                link: '/settings/accounts',
                // roleSecurity: 'ACCOUNTS_SETINGS',
            },
            {
                id: 'procurement',
                title: 'Procurement',
                type: 'basic',
                icon: 'heroicons_solid:shopping-cart',
                link: '/settings/procurement',
                // roleSecurity: 'PROCUREMENT_SETINGS',
            },
            {
                id: 'ho-store',
                title: 'HO & Store',
                type: 'basic',
                icon: 'heroicons_solid:home-modern',
                link: '/settings/ho-store',
                // roleSecurity: 'HO_STORE_SETINGS',
            },
            {
                id: 'ho-franchise',
                title: 'HO & Franchise',
                type: 'basic',
                icon: 'heroicons_solid:square-3-stack-3d',
                link: '/settings/ho-franchise',
                // roleSecurity: 'HO_FRANCHISE__SETINGS',
            },
            {
                id: 'crm-sale-promotion',
                title: 'CRM & Sale Promotion',
                type: 'basic',
                icon: 'heroicons_solid:megaphone',
                link: '/settings/crm-sale-promotion',
                // roleSecurity: 'CRM_SALE_PROMOTION_SETINGS',
            },
            {
                id: 'discount-scheme',
                title: 'Discount Scheme',
                type: 'basic',
                icon: 'heroicons_solid:receipt-percent',
                link: '/settings/discount-scheme',
                // roleSecurity: 'DISCOUNT_SCHEME_SETINGS',
            },
            {
                id: 'utilities',
                title: 'Utilities',
                type: 'basic',
                icon: 'heroicons_solid:squares-2x2',
                link: '/settings/utilities',
                // roleSecurity: 'UTILITIES_SETINGS',
            },
            {
                id: 'reports-settings',
                title: 'Reports',
                type: 'basic',
                icon: 'heroicons_solid:document-check',
                link: '/settings/reports',
                // roleSecurity: 'REPORTS_SETINGS',
            },
            {
                id: 'integrations',
                title: 'Integrations',
                type: 'basic',
                icon: 'heroicons_solid:cog',
                link: '/settings/integrations',
                // roleSecurity: 'INTEGRATIONS_SETINGS',
            },
            {
                id: 'notification',
                title: 'Notification',
                type: 'basic',
                icon: 'heroicons_solid:bell-alert',
                link: '/settings/notification',
                // roleSecurity: 'NOTIFICATION_SETINGS',
            }
            ,
            {
                id: 'logs',
                title: 'Logs',
                type: 'basic',
                icon: 'heroicons_solid:document-chart-bar',
                link: '/settings/logs',
                // roleSecurity: 'LOGS_SETINGS',
            }
        ]
    },
    {
        id: 'uitilies',
        title: 'Utilities',
        type: 'collapsable',
        icon: 'mat_solid:point_of_sale',
        children: [
            {
                id: 'databackup',
                title: 'Data Backup ',
                type: 'basic',
                icon: 'heroicons_outline:point_of_sale',
                link: '/utilities/data-backup'
            },
            {
                id: 'datasync',
                title: 'Data Sync ',
                type: 'basic',
                icon: 'heroicons_outline:arrow-path',
                link: '/utilities/data-sync'
            },
            {
                id: 'changepassword',
                title: 'Change Password ',
                type: 'basic',
                icon: 'heroicons_outline:finger-print',
                link: '/utilities/change-password'
            },
            {
                id: 'dayend',
                title: 'Day End / Settelment ',
                type: 'basic',
                icon: 'heroicons_outline:briefcase',
                link: '/utilities/day-end'
            },
            {
                id: 'yearendprocessing',
                title: 'Year End Processing',
                type: 'basic',
                icon: 'heroicons_outline:calendar',
                link: '/utilities/year-end-processing'
            },
            {
                id: 'stockchecking',
                title: 'Stock Checking / Audit',
                type: 'basic',
                icon: 'heroicons_outline:document-check',
                link: '/utilities/stock-checking'
            },
            {
                id: 'chequeprinting',
                title: 'Cheque Printing Utility',
                type: 'basic',
                icon: 'heroicons_outline:printer',
                link: '/utilities/cheque-printing'
            },
            {
                id: 'productbarcodeprinting',
                title: 'Product Barcode Printing',
                type: 'basic',
                icon: 'heroicons_outline:qr-code',
                link: '/utilities/product-barcode-printing'
            },
        ]
    },
    {
        id: 'administration',
        title: 'Administration (Retail View)',
        type: 'collapsable',
        icon: 'mat_solid:admin_panel_settings',
        children: [
            {
                id: 'firm',
                title: 'Company / Firm setup',
                type: 'basic',
                icon: 'heroicons_solid:arrows-pointing-out',
                link: '/administration/firm'
            },
            {
                id: 'store',
                title: 'Store / Franchaise Setup',
                type: 'basic',
                icon: 'mat_outline:local_convenience_store',
                link: '/administration/store'
            },
            {
                id: 'warehouse',
                title: 'Godown / Warehouse Setup',
                type: 'basic',
                icon: 'heroicons_solid:rectangle-stack',
                link: '/administration/warehouse'
            },
            {
                id: 'currency',
                title: 'Currency',
                type: 'basic',
                icon: 'heroicons_solid:currency-rupee',
                link: '/administration/currency'
            },
            {
                id: 'languages',
                title: 'Languages',
                type: 'basic',
                icon: 'heroicons_solid:language',
                link: '/administration/languages'
            }
        ]
    },

];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'home',
        title: 'Home',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/home'
    },
    {
        id: 'pos',
        title: 'POS(Retail)',
        type: 'collapsable',
        icon: 'mat_solid:point_of_sale',
        // roleSecurity: 'POS',
        children: [
            // {
            //     id: 'employee',
            //     title: 'Employee Master',
            //     type: 'basic',
            //     icon: 'heroicons_outline:users',
            //     link: '/pos/employee'
            // }, {
            //     id: 'contact',
            //     title: 'Customer Master',
            //     type: 'basic',
            //     icon: 'mat_solid:contact_phone',
            //     link: '/pos/contact'
            // },
            {
                id: 'sale',
                title: 'Sale',
                type: 'basic',
                icon: 'heroicons_outline:tag',
                link: '/pos/sale'
            }, {
                id: 'credit-notes',
                title: 'Credit Notes',
                type: 'basic',
                icon: 'heroicons_outline:credit-card',
                link: '/pos/credit-notes'
            }, {
                id: 'advance-booking',
                title: 'Advance Booking',
                type: 'basic',
                icon: 'heroicons_outline:computer-desktop',
                link: '/pos/advance-booking'
            }, {
                id: 'quotation',
                title: 'Quotation',
                type: 'basic',
                icon: 'heroicons_outline:queue-list',
                link: '/pos/quotation'
            },
            {
                id: 'sale-order',
                title: 'Sale Order',
                type: 'basic',
                icon: 'heroicons_outline:shopping-bag',
                link: '/pos/sale-order'
            },
            {
                id: 'alteration',
                title: 'Alteration',
                type: 'basic',
                icon: 'heroicons_outline:scissors',
                link: '/pos/alteration'
            },
            {
                id: 'tailoring',
                title: 'Tailoring',
                type: 'basic',
                icon: 'heroicons_outline:rectangle-group',
                link: '/pos/tailoring'
            },
            {
                id: 'sales-register',
                title: 'Sales Register / Daybook',
                type: 'basic',
                icon: 'heroicons_outline:book-open',
                link: '/pos/sales-register'
            },
            {
                id: 'cash-handover-utility',
                title: 'Cash Handover Utility',
                type: 'basic',
                icon: 'heroicons_outline:banknotes',
                link: '/pos/cash-handover-utility'
            }
        ]
    },
    {
        id: 'masters',
        title: 'Masters',
        type: 'collapsable',
        icon: 'mat_solid:inventory_2',
        // roleSecurity: 'MASTERS',
        children: [
            {
                id: 'employee',
                title: 'Employee Master',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/masters/employee'
            }, {
                id: 'contact',
                title: 'Customer Master',
                type: 'basic',
                icon: 'mat_solid:contact_phone',
                link: '/masters/contact'
            },
            {
                id: 'supplier',
                title: 'Supplier Master',
                type: 'basic',
                icon: 'heroicons_outline:swatch',
                link: '/masters/supplier-master'
            },
            {
                id: 'transport',
                title: 'Transport Master',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/masters/transport-master'
            },
            {
                id: 'service-center',
                title: 'Service Center Master',
                type: 'basic',
                icon: 'heroicons_outline:wrench-screwdriver',
                link: '/masters/service-center'
            },
            {
                id: 'unit-of-measurment',
                title: 'Unit Of Measurment (UOM)',
                type: 'basic',
                icon: 'mat_outline:ad_units',
                link: '/masters/unit-of-measurment'
            }, {
                id: 'product',
                title: 'Product Master',
                type: 'basic',
                icon: 'heroicons_solid:archive-box-arrow-down',
                link: '/masters/product',
                // roleSecurity: 'PRODUCTS',
            },
            {
                id: 'product-attributes',
                title: 'Product Attributes',
                type: 'basic',
                icon: 'heroicons_outline:squares-plus',
                link: '/masters/product-attributes'
            }, {
                id: 'product-variants',
                title: 'Product Variants',
                type: 'basic',
                icon: 'mat_outline:category',
                link: '/masters/product-variants'
            },

        ]
    },
    {
        id: 'procurement',
        title: 'Procurement',
        type: 'collapsable',
        icon: 'mat_solid:inventory_2',
        // roleSecurity: 'PRODUCTS',
        children: [
            {
                id: 'product',
                title: 'Product Master',
                type: 'basic',
                icon: 'heroicons_solid:archive-box-arrow-down',
                link: '/procurement/product',
                // roleSecurity: 'PRODUCTS',
            },
            {
                id: 'product-attributes',
                title: 'Product Attributes',
                type: 'basic',
                icon: 'heroicons_outline:squares-plus',
                link: '/procurement/product-attributes'
            },
        ]
    },
    {
        id: 'basic-accounts',
        title: 'Basic Accounts',
        type: 'collapsable',
        icon: 'mat_solid:account_balance',
        children: [
            {
                id: 'account-groups',
                title: 'Account Groups',
                type: 'basic',
                icon: 'heroicons_solid:user-group',
                link: '/basic-accounts/account-groups',
                // roleSecurity: 'ACCOUNT-GROUPS_BASIC-ACCOUNTS',
            },
            {
                id: 'account',
                title: 'Account',
                type: 'basic',
                icon: 'heroicons_solid:user-circle',
                link: '/basic-accounts/account',
                // roleSecurity: 'ACCOUNT_BASIC-ACCOUNTS',
            },
             {
                id: 'bank',
                title: 'Bank',
                type: 'basic',
                icon: 'heroicons_solid:banknotes',
                link: '/basic-accounts/bank',
                // roleSecurity: 'BANK_BASIC-ACCOUNTS',
            },
            {
                id: 'ledgers',
                title: 'Ledgers',
                type: 'basic',
                icon: 'heroicons_solid:newspaper',
                link: '/basic-accounts/ledgers',
                // roleSecurity: 'LEDGERS_BASIC-ACCOUNTS',
            },
            {
                id: 'payment',
                title: 'Payment',
                type: 'basic',
                icon: 'mat_solid:payment',
                link: '/basic-accounts/payment',
                // roleSecurity: 'PAYMENT_BASIC-ACCOUNTS',
            },
            {
                id: 'receipt',
                title: 'Receipt',
                type: 'basic',
                icon: 'mat_solid:receipt',
                link: '/basic-accounts/receipt',
                // roleSecurity: 'RECEIPT_BASIC-ACCOUNTS',
            },
            // {
            //     id: 'credit-note',
            //     title: 'Credit Note',
            //     type: 'basic',
            //     icon: 'heroicons_solid:credit-card',
            //     link: '/basic-accounts/credit-note',
            //     //moduleSecurity: 'SUBMENU_CREDIT_NOTE'
            // },
            // {
            //     id: 'debit-note',
            //     title: 'Debit Note',
            //     type: 'basic',
            //     icon: 'heroicons_solid:folder-minus',
            //     link: '/basic-accounts/debit-note',
            //     //moduleSecurity: 'SUBMENU_DEBIT_NOTE'
            // },
            {
                id: 'contra',
                title: 'Contra',
                type: 'basic',
                icon: 'heroicons_solid:squares-plus',
                link: '/basic-accounts/contra',
                // roleSecurity: 'CONTRA_BASIC-ACCOUNTS',
            },
            {
                id: 'jounal-voucher',
                title: 'Jounal-Voucher',
                type: 'basic',
                icon: 'heroicons_solid:clipboard-document-list',
                link: '/basic-accounts/jounal-voucher',
                // roleSecurity: 'JOUNAL-VOUCHER_BASIC-ACCOUNTS',
            },
            {
                id: 'expense',
                title: 'Expense',
                type: 'basic',
                icon: 'heroicons_solid:currency-rupee',
                link: '/basic-accounts/expense',
                // roleSecurity: 'EXPENSE_BASIC-ACCOUNTS',
            },
            {
                id: 'petty-cash-book',
                title: 'Petty Cash Book',
                type: 'basic',
                icon: 'mat_solid:book',
                link: '/basic-accounts/petty-cash-book',
                // roleSecurity: 'PETTY-CASH-BOOK_BASIC-ACCOUNTS',
            },
        ]
    },
    {
        id: 'discount-scheme-menu',
        title: 'Discount Scheme',
        type: 'collapsable',
        icon: 'heroicons_solid:receipt-percent',
        children: [
            {
                id: 'price-modification',
                title: 'Price Modification',
                type: 'basic',
                icon: 'heroicons_solid:arrow-trending-up',
                link: '/discount-scheme/price-modification',
                // roleSecurity: 'PRICE-MODIFICATION_DISCOUNT-SCHEME',
            }, {
                id: 'discount-scheme-1',
                title: 'Discount-Scheme-1',
                type: 'basic',
                icon: 'heroicons_solid:arrows-right-left',
                link: '/discount-scheme/discount-scheme-1',
                // roleSecurity: 'DISCOUNT-SCHEME-1_DISCOUNT-SCHEME',
            },
            {
                id: 'discount-scheme-2',
                title: 'Discount-Scheme-2',
                type: 'basic',
                icon: 'heroicons_solid:arrows-right-left',
                link: '/discount-scheme/discount-scheme-2',
                // roleSecurity: 'DISCOUNT-SCHEME-2_DISCOUNT-SCHEME',
            },
            {
                id: 'discount-scheme-3',
                title: 'Discount-Scheme-3',
                type: 'basic',
                icon: 'heroicons_solid:arrows-right-left',
                link: '/discount-scheme/discount-scheme-3',
                // roleSecurity: 'DISCOUNT-SCHEME-3_DISCOUNT-SCHEME',
            },
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'collapsable',
        icon: 'heroicons_solid:document-check',
        children: [
            {
                id: 'masters-report',
                title: 'Masters',
                type: 'basic',
                icon: 'mat_solid:inventory_2',
                link: '/reports/masters-report',
                // roleSecurity: 'MASTERS_SETINGS',
            }, {
                id: 'pos-report',
                title: 'POS(Retails)',
                type: 'basic',
                icon: 'mat_solid:point_of_sale',
                link: '/reports/pos-report',
                // roleSecurity: 'POS_SETINGS',
            },
            {
                id: 'sale-despatch-report',
                title: 'Sale & Despatch(B2B)',
                type: 'basic',
                icon: 'heroicons_solid:arrows-right-left',
                link: '/reports/sale-despatch-report',
                // roleSecurity: 'SALE_DESPATCH_SETINGS',
            },
            {
                id: 'accounts-report',
                title: 'Accounts',
                type: 'basic',
                icon: 'heroicons_solid:user-circle',
                link: '/reports/accounts-report',
                // roleSecurity: 'ACCOUNTS_SETINGS',
            },
            {
                id: 'procurement-report',
                title: 'Procurement',
                type: 'basic',
                icon: 'heroicons_solid:shopping-cart',
                link: '/reports/procurement-report',
                // roleSecurity: 'PROCUREMENT_SETINGS',
            },
            {
                id: 'ho-store-report',
                title: 'HO & Store',
                type: 'basic',
                icon: 'heroicons_solid:home-modern',
                link: '/reports/ho-store-report',
                // roleSecurity: 'HO_STORE_SETINGS',
            },
            {
                id: 'ho-franchise-report',
                title: 'HO & Franchise',
                type: 'basic',
                icon: 'heroicons_solid:square-3-stack-3d',
                link: '/reports/ho-franchise-report',
                // roleSecurity: 'HO_FRANCHISE__SETINGS',
            },
            {
                id: 'crm-sale-promotion-report',
                title: 'CRM & Sale Promotion',
                type: 'basic',
                icon: 'heroicons_solid:megaphone',
                link: '/reports/crm-sale-promotion-report',
                // roleSecurity: 'CRM_SALE_PROMOTION_SETINGS',
            },
            {
                id: 'discount-scheme-report',
                title: 'Discount Scheme',
                type: 'basic',
                icon: 'heroicons_solid:receipt-percent',
                link: '/reports/discount-scheme-report',
                // roleSecurity: 'DISCOUNT_SCHEME_SETINGS',
            },
            
        ]
    },
    {
        id: 'setting',
        title: 'Setting',
        type: 'collapsable',
        icon: 'mat_outline:settings',
        children: [
            {
                id: 'general',
                title: 'General',
                type: 'basic',
                icon: 'mat_outline:settings_accessibility',
                link: '/settings/general',
                // roleSecurity: 'GENERAL_SETINGS',
            }, {
                id: 'masters',
                title: 'Masters',
                type: 'basic',
                icon: 'heroicons_solid:building-storefront',
                link: '/settings/masters',
                // roleSecurity: 'MASTERS_SETINGS',
            }, {
                id: 'pos',
                title: 'POS(Retails)',
                type: 'basic',
                icon: 'heroicons_solid:building-storefront',
                link: '/settings/pos',
                // roleSecurity: 'POS_SETINGS',
            },
            {
                id: 'sale-despatch',
                title: 'Sale & Despatch(B2B)',
                type: 'basic',
                icon: 'heroicons_solid:arrows-right-left',
                link: '/settings/sale-despatch',
                // roleSecurity: 'SALE_DESPATCH_SETINGS',
            },
            {
                id: 'accounts',
                title: 'Accounts',
                type: 'basic',
                icon: 'heroicons_solid:user-circle',
                link: '/settings/accounts',
                // roleSecurity: 'ACCOUNTS_SETINGS',
            },
            {
                id: 'procurement',
                title: 'Procurement',
                type: 'basic',
                icon: 'heroicons_solid:shopping-cart',
                link: '/settings/procurement',
                // roleSecurity: 'PROCUREMENT_SETINGS',
            },
            {
                id: 'ho-store',
                title: 'HO & Store',
                type: 'basic',
                icon: 'heroicons_solid:home-modern',
                link: '/settings/ho-store',
                // roleSecurity: 'HO_STORE_SETINGS',
            },
            {
                id: 'ho-franchise',
                title: 'HO & Franchise',
                type: 'basic',
                icon: 'heroicons_solid:square-3-stack-3d',
                link: '/settings/ho-franchise',
                // roleSecurity: 'HO_FRANCHISE__SETINGS',
            },
            {
                id: 'crm-sale-promotion',
                title: 'CRM & Sale Promotion',
                type: 'basic',
                icon: 'heroicons_solid:megaphone',
                link: '/settings/crm-sale-promotion',
                // roleSecurity: 'CRM_SALE_PROMOTION_SETINGS',
            },
            {
                id: 'discount-scheme',
                title: 'Discount Scheme',
                type: 'basic',
                icon: 'heroicons_solid:receipt-percent',
                link: '/settings/discount-scheme',
                // roleSecurity: 'DISCOUNT_SCHEME_SETINGS',
            },
            {
                id: 'utilities',
                title: 'Utilities',
                type: 'basic',
                icon: 'heroicons_solid:squares-2x2',
                link: '/settings/utilities',
                // roleSecurity: 'UTILITIES_SETINGS',
            },
            {
                id: 'reports-settings',
                title: 'Reports',
                type: 'basic',
                icon: 'heroicons_solid:document-check',
                link: '/settings/reports',
                // roleSecurity: 'REPORTS_SETINGS',
            },
            {
                id: 'integrations',
                title: 'Integrations',
                type: 'basic',
                icon: 'heroicons_solid:cog',
                link: '/settings/integrations',
                // roleSecurity: 'INTEGRATIONS_SETINGS',
            },
            {
                id: 'notification',
                title: 'Notification',
                type: 'basic',
                icon: 'heroicons_solid:bell-alert',
                link: '/settings/notification',
                // roleSecurity: 'NOTIFICATION_SETINGS',
            }
            ,
            {
                id: 'logs',
                title: 'Logs',
                type: 'basic',
                icon: 'heroicons_solid:document-chart-bar',
                link: '/settings/logs',
                // roleSecurity: 'LOGS_SETINGS',
            }
        ]
    },

    {
        id: 'uitilies',
        title: 'Utilities',
        type: 'collapsable',
        icon: 'mat_solid:point_of_sale',
        children: [
            {
                id: 'databackup',
                title: 'Data Backup ',
                type: 'basic',
                icon: 'heroicons_outline:point_of_sale',
                link: '/utilities/data-backup'
            },
            {
                id: 'datasync',
                title: 'Data Sync ',
                type: 'basic',
                icon: 'heroicons_outline:arrow-path',
                link: '/utilities/data-sync'
            },
            {
                id: 'changepassword',
                title: 'Change Password ',
                type: 'basic',
                icon: 'heroicons_outline:finger-print',
                link: '/utilities/change-password'
            },
            {
                id: 'dayend',
                title: 'Day End / Settelment ',
                type: 'basic',
                icon: 'heroicons_outline:briefcase',
                link: '/utilities/day-end'
            },
            {
                id: 'yearendprocessing',
                title: 'Year End Processing',
                type: 'basic',
                icon: 'heroicons_outline:calendar',
                link: '/utilities/year-end-processing'
            },
            {
                id: 'stockchecking',
                title: 'Stock Checking / Audit',
                type: 'basic',
                icon: 'heroicons_outline:document-check',
                link: '/utilities/stock-checking'
            },
            {
                id: 'chequeprinting',
                title: 'Cheque Printing Utility',
                type: 'basic',
                icon: 'heroicons_outline:printer',
                link: '/utilities/cheque-printing'
            },
            {
                id: 'productbarcodeprinting',
                title: 'Product Barcode Printing',
                type: 'basic',
                icon: 'heroicons_outline:qr-code',
                link: '/utilities/product-barcode-printing'
            },
        ]
    },

    {
        id: 'administration',
        title: 'Administration (Retail View)',
        type: 'collapsable',
        icon: 'mat_solid:point_of_sale',
        children: [
            {
                id: 'firm',
                title: 'Company / Firm setup',
                type: 'basic',
                icon: 'heroicons_outline:point_of_sale',
                link: '/administration/firm'
            },
        ]
    },

];
