export const permissionsData = [
    {
        groupName: 'Users/Employee/Contact',
        types: [
            {
                type: 'Users',
                permissions: [
                    {
                        code: 'CREATE_USER',
                        name: 'Create User',
                        checked: false,
                    },
                    {
                        code: 'EDIT_USER',
                        name: 'Edit User',
                        checked: false,
                    },
                    {
                        code: 'DELETE_USER',
                        name: 'Delete User',
                        checked: false,
                    },
                    {
                        code: 'VIEW_USER',
                        name: 'View User',
                        checked: false,
                    }
                ]
            },
            {
                type: 'Employee',
                permissions: [
                    {
                        code: 'CREATE_EMPLOYEE',
                        name: 'Create Employe',
                        checked: false,
                    },
                    {
                        code: 'EDIT_EMPLOYEE',
                        name: 'Edit Employee',
                        checked: false,
                    },
                    {
                        code: 'DELETE_EMPLOYEE',
                        name: 'Delete Employee',
                        checked: false,
                    },
                    {
                        code: 'VIEW_EMPLOYEE',
                        name: 'View Employee',
                        checked: false,
                    }
                ]
            },
            {
                type: 'Contact',
                permissions: [
                    {
                        code: 'CREATE_CONTACT',
                        name: 'Create Contact',
                        checked: false,
                    },
                    {
                        code: 'EDIT_CONTACT',
                        name: 'Edit Contact',
                        checked: false,
                    },
                    {
                        code: 'DELETE_CONTACT',
                        name: 'Delete Contact',
                        checked: false,
                    },
                    {
                        code: 'VIEW_CONTACT',
                        name: 'View Contact',
                        checked: false,
                    }
                ]
            },
            {
                type: 'Role',
                permissions: [
                    {
                        code: 'CREATE_ROLE',
                        name: 'Create Role',
                        checked: false,
                    },
                    {
                        code: 'EDIT_ROLE',
                        name: 'Edit Role',
                        checked: false,
                    },
                    {
                        code: 'DELETE_ROLE',
                        name: 'Delete Role',
                        checked: false,
                    },
                    {
                        code: 'VIEW_ROLE',
                        name: 'View Role',
                        checked: false,
                    }]
            }
        ]
    },
    {
        groupName: 'Inventory',
        types: [
            {
                type: 'Product',
                permissions: [
                    {
                        code: 'CREATE_PRODUCT',
                        name: 'Create Product',
                        checked: false,
                    },
                    {
                        code: 'EDIT_PRODUCT',
                        name: 'Edit Product',
                        checked: false,
                    },
                    {
                        code: 'DELETE_PRODUCT',
                        name: 'Delete Product',
                        checked: false
                    },
                    {
                        code: 'VIEW_PRODUCT',
                        name: 'View Product',
                        checked: false,
                    }
                ]

            }
        ]
    }, {
        groupName: 'POS',
        types: [
            {
                type: 'Sale',
                permissions: [
                    {
                        code: 'POS_SALE_BILL_DISCOUNT_ADD',
                        name: 'Bill Discount Add',
                        checked: false,
                    },
                    {
                        code: 'POS_SALE_BILL_DISCOUNT_VIEW',
                        name: 'Bill Discount View',
                        checked: false,
                    },{
                        code: 'POS_SALE_BUTTON_CASH_AND_PRINT',
                        name: 'Button Cash And Print',
                        checked: false,                        
                    }
                ]
            }],
    }

]