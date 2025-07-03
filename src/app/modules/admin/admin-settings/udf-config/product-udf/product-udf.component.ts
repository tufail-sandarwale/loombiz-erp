import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { ClientSideTableViewComponent } from 'app/modules/shared/component/client-side-table-view/client-side-table-view.component';
import { elementAt, Observable, of } from 'rxjs';
import { UdfService } from 'app/core/services/udf.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'app/core/services/alerts.service';
import { RVConstants } from 'app/core/rv-constants';
import { TableColumns } from 'app/core/modal/TableColumns';

@Component({
  selector: 'app-product-udf',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule, TranslocoModule, ClientSideTableViewComponent],
  templateUrl: './product-udf.component.html',
  styleUrl: './product-udf.component.scss'
})
export class ProductUdfComponent implements OnInit {
  actions = [
    { "key": "inlineEditSave", "value": "Edit", "icon": "mat_solid:edit", "color": "primary" },
  ]
  tableColumns: TableColumns[] = [
    { "key": "position", "value": "SR NO." },
    { "key": "name", "value": "Name", inlineEditable: true },
    { "key": "showField", "value": "Show/Hide", inlineEditable: true, columnType: 'boolean' },
    { "key": "actions", "value": "Actions" }
  ]
  tableData: Observable<any>;
  expandTagsAttribute = 'options';
  constructor(
    private udfService: UdfService,
    private dialog: MatDialog,
    private alertService: AlertsService) {

  }

  ngOnInit(): void {
    this.loadProducUDF();
  }

  tableAction(event) {
    if (event.type == 'saveUpdate') {
      let element = event.element;
      console.log("save elemnt:", element)
      if(element.options && element.options.length>0){
        element.options = element.options.filter(item=>item && item.trim()!="");
      }
      this.udfService.updateUDF(element.id, element).subscribe({
        next: (response) => {
          this.alertService.showAlert('Product UDF updated successfully', true)
        },
        error: (error) => {
          console.error('Error updating product UDF:', error);
        }
      })
    }
  }

  private loadProducUDF(): void {
    this.udfService.getUDFByGroup(RVConstants.udfGroup.udf).subscribe(result => {
      result.sort((a, b) => a.sequence - b.sequence);
      this.tableData = of(result);
    })
  }
}
