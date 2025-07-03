import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TableActionClickEvent } from '../modal/TableActionClickEvent';
import { MatDialog } from '@angular/material/dialog';
import { TableColumnsDialogueComponent } from 'app/dialogues/table-columns-dialogue/table-columns-dialogue.component';

@Injectable({
  providedIn: 'root'
})
export class RvLayoutService {
  
  layoutUrl = `${environment.hostUrl}/layout`;
  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  getTableLayout(tableCode: string): Observable<any> {
    return this.http.get<any>(`${this.layoutUrl}/table/${tableCode}`);
  }

  updateTableLayout(tableCode: string, body): Observable<any> {
    return this.http.put<any>(`${this.layoutUrl}/table/${tableCode}`, body);
  }

  processColumnOrder(tableCode, selectedColumns, event: TableActionClickEvent) {
    let columnsWithOrder = [];
    event.columnOrderKeys.forEach((key, index) => {
      columnsWithOrder.push(selectedColumns.find(c => c.key === key));
    });
    let tableLayout = {
      tableCode: tableCode,
      selectedColumns: columnsWithOrder,
    }
    this.updateTableLayout(tableCode, tableLayout).subscribe({
      next: (result) => {
        console.log("columns order updated");
      }
    });
  }

  changeColumns(tableLayoutResult):any {
    const dialogRef = this.dialog.open(TableColumnsDialogueComponent, {
      width: '50%',
      data: {
        tableColumns: tableLayoutResult.columns,
        selectedColumns: tableLayoutResult.selectedColumns,
        tableCode: tableLayoutResult.tableCode,
        tableName: tableLayoutResult.tableCode
      }
    });
    return dialogRef;
  }
}
