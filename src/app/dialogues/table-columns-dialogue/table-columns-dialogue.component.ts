import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { RvLayoutService } from 'app/core/services/rv-layout.service';

@Component({
  selector: 'app-table-columns-dialogue',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules],
  templateUrl: './table-columns-dialogue.component.html',
  styleUrl: './table-columns-dialogue.component.scss'
})
export class TableColumnsDialogueComponent {
  tableCode;
  tableName;
  originalColumns;
  tableColumns;
  selectedColumns;
  constructor(
    public dialogRef: MatDialogRef<TableColumnsDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutService: RvLayoutService
  ) {
    this.tableCode = this.data.tableCode;
    this.tableName = this.data.tableName;
    this.tableColumns = this.data.tableColumns;
    this.originalColumns = this.data.tableColumns;
    this.selectedColumns = this.data.selectedColumns;
    this.tableColumns.forEach(element => {
      element['selected'] = this.isSelected(element);
    });
  }

  isSelected(column): boolean {
    return this.selectedColumns.map(item => item.key).includes(column.key);
  }

  selectChange(column, event) {
    if (column.selected! = event.selected) {
      column.selected = event.selected;
    }
  }
  save() {
    let tableLayout = {
      tableCode: this.tableCode,
      selectedColumns: this.tableColumns.filter(item => item.selected),
    }
    this.layoutService.updateTableLayout(this.tableCode, tableLayout).subscribe({
      next: result => {
        this.dialogRef.close(tableLayout.selectedColumns);
      },
      error: error => {
        this.dialogRef.close(null);
      }
    });
  }
}
