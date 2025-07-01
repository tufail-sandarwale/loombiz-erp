export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    organizationId?: string;
    branchIds?: string;
    authorities?: any[];
    permissions?: any[];
    avatar?: string;
    status?: string;
    preferences?: any;
}
