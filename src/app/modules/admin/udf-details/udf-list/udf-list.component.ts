import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { FormBuilder, ReactiveFormsModule, UntypedFormBuilder,FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { UdfService } from '../udf-service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-udf-list',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule, TranslocoModule,FormsModule],
  templateUrl: './udf-list.component.html',
  styleUrls: ['./udf-list.component.scss']
})
export class UdfListComponent implements OnInit {
  
  udfDisplayedColumns: string[] = ['id', 'name', 'showField', 'action'];
  udfDataSource = new MatTableDataSource<any>([]);
  pageSize = 10;
  totalElements = 0;
  loading = false;
  editElement: any = null;

  constructor(private udfService: UdfService) {}

  ngOnInit(): void {
    this.loadUDFFields();
  }

  private loadUDFFields(): void {
    this.loading = true;
    this.udfService.getUdfFields().subscribe({
      next: result => {
        console.log('UDF Fields result', result);
        this.udfDataSource.data = result;
        this.totalElements = result.totalItems;
        this.loading = false;
      },
      error: error => {
        console.error('Error loading UDF Fields:', error);
        this.loading = false;
      }
    });
  }

  edit(element: any): void {
    this.editElement = { ...element };
    this.udfDisplayedColumns = ['id', 'name', 'showField', 'value', 'action'];
  }

  save(): void {
    if (this.editElement) {
      const index = this.udfDataSource.data.findIndex(item => item.id === this.editElement.id);
      if (index !== -1) {
        this.udfDataSource.data[index] = { ...this.editElement };
        this.udfDataSource._updateChangeSubscription();  // Refresh the data source
        this.cancel();  // Exit edit mode
      }
    }
  }

  cancel(): void {
    this.editElement = null;
    this.udfDisplayedColumns = ['id', 'name', 'showField', 'action'];
  }
}
