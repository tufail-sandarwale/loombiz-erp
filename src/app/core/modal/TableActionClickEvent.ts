export interface TableActionClickEvent {
    type: string;
    buttonKey?: string;
    columnKey?: string;
    element?: any;
    pageSize?: number;
    pageNumber?: number;
    columnOrderKeys?: string[];
    sortColumn?: string;
    totalElements?: number;
}
