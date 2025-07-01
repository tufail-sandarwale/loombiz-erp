import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private snackBar: MatSnackBar,
    private confirmationDialogueService: FuseConfirmationService,
  ) { }

  showAlert(message, success: boolean) {
    this.snackBar.open(message, 'X', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: success ? ["alert-success"] : ["alert-error"],
      duration: 5000,
    });
  }

  showConfirmationDialog(title: string, message: string): MatDialogRef<FuseConfirmationDialogComponent> {
    let config: FuseConfirmationConfig = {
      "title": title ? title : "Confirm",
      "message": message ? message : "Are you sure you want to delete?",
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation-triangle",
        "color": "warn"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Delete",
          "color": "warn"
        },
        "cancel": {
          "show": true,
          "label": "Cancel"
        }
      },
      "dismissible": true
    }
    return this.confirmationDialogueService.open(config);
  }
}
