import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductSharedDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { DialogData } from './dialog-data'; 

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(data: DialogData): void {
    const dialogRef = this.dialog.open(AddProductSharedDialogComponent, {
      width: '400px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
      }
    });
  }
}
