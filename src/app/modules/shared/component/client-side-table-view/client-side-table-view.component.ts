import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModules } from '../../modules/shared-material-modules';
import { Observable } from 'rxjs';
import { TableColumns } from 'app/core/modal/TableColumns';
import { TableActions } from 'app/core/modal/TableActions';
import { TableActionClickEvent } from 'app/core/modal/TableActionClickEvent';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TranslocoModule } from '@ngneat/transloco';
import { RvChipsWithoutFormComponent } from '../rv-chips-without-form/rv-chips-without-form.component';
import { RvDisplayPricePipe } from 'app/core/pipe/rv-display-price.pipe';
import { IsNumberPipe } from 'app/core/pipe/is-number.pipe';

@Component({
  selector: 'app-client-side-table-view',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, TranslocoModule, RvChipsWithoutFormComponent, RvDisplayPricePipe, IsNumberPipe],
  templateUrl: './client-side-table-view.component.html',
  styleUrl: './client-side-table-view.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClientSideTableViewComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() tableData!: Observable<any>;
  @Input() tableColumns: TableColumns[];
  @Input() tableCode: string = "";
  @Input() actions: TableActions[] = [];

  @Output() actionClickedEvent: EventEmitter<TableActionClickEvent> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = null;
  columnKeys;
  columnNames;
  pageNumber = 0;
  pageSize = 10;
  tableLoaded = false;
  ngOnInit(): void {
    this.loadTable();
    console.log("actions", this.actions);

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadTable();
  }

  ngAfterViewInit() {
    if (this.paginator)
      this.dataSource.paginator = this.paginator;
  }

  loadTable() {
    if (this.tableData && this.tableColumns) {
      if (this.tableColumns) {
        this.columnKeys = this.tableColumns.map(col => col.key);
        this.columnNames = this.tableColumns.map(col => col.value);
      }
      this.tableData.subscribe({
        next: data => {
          data.map(d => d['inlineEditClick'] = false)
          data.map((item, index) => item['position'] = index + 1);
          this.dataSource = data ? new MatTableDataSource(data) : new MatTableDataSource([]);
          if (this.paginator)
            this.dataSource.paginator = this.paginator;
          if (this.sort)
            this.dataSource.sort = this.sort;
          this.tableLoaded = true;
        }
      });
    }
  }

  sortChange(event) {

  }

  buttonAction(key, element) {
    let event: TableActionClickEvent = {
      buttonKey: key,
      element: element,
      type: "buttonAction"
    }
    this.actionClickedEvent.emit(event);
  }

  editClick(event, element) {
    element.inlineEditClick = !element.inlineEditClick;
    event.stopPropagation()
  }
  getColumnType(colKey) {
    return this.tableColumns.find(item => item.key == colKey).columnType;
  }

  isEditable(colKey) {
    return this.tableColumns.find(item => item.key == colKey).inlineEditable;
  }

  tagsChanged(event, element) {
    console.log(event, element);
    element['options'] = event;
  }

  editSave(element) {
    element.inlineEditClick = !element.inlineEditClick;
    let event: TableActionClickEvent = {
      element: element,
      type: "saveUpdate"
    }
    this.actionClickedEvent.emit(event);
  }
}
