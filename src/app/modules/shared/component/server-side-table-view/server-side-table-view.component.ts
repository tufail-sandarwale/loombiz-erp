import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModules } from '../../modules/shared-material-modules';
import { Observable } from 'rxjs';
import { TableColumns } from 'app/core/modal/TableColumns';
import { TableActions } from 'app/core/modal/TableActions';
import { TableActionClickEvent } from 'app/core/modal/TableActionClickEvent';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { RvDisplayPricePipe } from 'app/core/pipe/rv-display-price.pipe';
import { IsNumberPipe } from 'app/core/pipe/is-number.pipe';

@Component({
  selector: 'app-server-side-table-view',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, CdkDropList, CdkDrag, RvDisplayPricePipe, IsNumberPipe],
  templateUrl: './server-side-table-view.component.html',
  styleUrl: './server-side-table-view.component.scss'
})
export class ServerSideTableViewComponent implements OnInit, OnChanges {
  @Input() tableData!: Observable<any>;
  @Input() tableColumns!: Observable<TableColumns[]>;
  @Input() tableCode: string = "";
  @Input() actions: TableActions[] = [];
  @Input() shouldShowActions: (row: any) => boolean = () => true;

  @Output() actionClickedEvent: EventEmitter<TableActionClickEvent> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>([]);
  columnKeys;
  columnNames;
  pageNumber = 0;
  pageSize = 10;
  tableLoaded = false;
  totalElements: number;
  sortColumns: string[];
  isTableSortable = false;
  allColumns;
  allTotals;
  showTotal = false;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadTable();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadTable();
  }

  loadTable() {
    if (this.tableData && this.tableColumns) {
      this.tableColumns.subscribe({
        next: columns => {
          if (columns) {
            this.allColumns = columns;
            this.columnKeys = columns.map(col => col.key);
            this.columnNames = columns.map(col => col.value);
            this.sortColumns = columns.filter(item => item.sortable).map(col => col.key);
            if (this.sortColumns && this.sortColumns.length > 0) {
              this.isTableSortable = true;
            }
            // if (this.allColumns.filter(item => !item.showTotal).length > 0) {
            //   this.showTotal = true;
            // }
            this.showTotal = this.allColumns.some(item => item.showTotal === true);
          }
          this.tableData.subscribe({
            next: page => {
              if (page) {
                this.sendTotalElementEvent();
                this.dataSource.data = page.content;
                if (this.paginator.pageIndex! = page.pageable.pageNumber) {
                  this.paginator.pageIndex = page.pageable.pageNumber;
                }
                this.totalElements = page.totalElements;
                this.allTotals = page.totals;
              } else {
                this.dataSource.data = [];
              }
              this.tableLoaded = true;
            }
          });
        }
      });
    }
  }

  sendTotalElementEvent() {
    let outEvent: TableActionClickEvent = {
      type: 'totalElements',
      totalElements: this.totalElements,
    }
    this.actionClickedEvent.emit(outEvent);
  }

  onPaging(event) {
    this.onPagingChanges(event.pageIndex, event.pageSize);
  }

  onPagingChanges(pageNumber, pageSize) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    let outEvent: TableActionClickEvent = {
      type: 'page',
      pageNumber: pageNumber,
      pageSize: pageSize,
    }
    this.actionClickedEvent.emit(outEvent);
  }

  onPageSizeChange(event) {
    this.onPagingChanges(this.pageNumber, event.target.value);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnKeys, event.previousIndex, event.currentIndex);
    moveItemInArray(this.columnNames, event.previousIndex, event.currentIndex);
    let outEvent: TableActionClickEvent = {
      type: 'columnOrder',
      columnOrderKeys: this.columnKeys
    }
    this.actionClickedEvent.emit(outEvent);
  }

  sortData(event) {
    if (event.active) {
      let outEvent: TableActionClickEvent = {
        type: 'sort',
        sortColumn: event.active + "," + (event.direction ? event.direction : 'asc'),
      }
      this.actionClickedEvent.emit(outEvent);
    }
  }

  checkIsSortable(key: string): boolean {
    return this.sortColumns.find(item => item == key) != null;
  }

  buttonAction(buttonKey, element) {
    if (!this.shouldShowActions(element)) {
      return;
    }
    let outEvent: TableActionClickEvent = {
      type: 'buttonAction',
      buttonKey: buttonKey,
      element: element
    }
    this.actionClickedEvent.emit(outEvent);
  }

  isColumnLink(colKey): boolean {
    return this.allColumns.find(item => item.key == colKey).link;
  }

  linkAction(columnKey, element) {
    let outEvent: TableActionClickEvent = {
      type: 'link',
      columnKey: columnKey,
      element: element
    }
    this.actionClickedEvent.emit(outEvent);
  }

  getValueByKey(obj, key) {
    let keys = key.split('.');
    let value = obj;
    for (let k of keys) {
      value = value[k];
      if (value === undefined) {
        break; // Exit loop if property not found
      }
    }
    return value;
  }

  getColumnType(colKey) {
    return this.allColumns.find(item => item.key == colKey).columnType;
  }

  showColumnTotal(colKey) {
    if (!this.allColumns) return false;
    return this.allColumns.find(item => item.key == colKey).showTotal;
  }

  calculateFooterValue(colKey: string): number | string {
    if (!this.showColumnTotal(colKey)) return '';
    // return this.dataSource.data.reduce((sum, element) => sum + element[colKey], 0);
    return this.allTotals[colKey];
    
  }
}
