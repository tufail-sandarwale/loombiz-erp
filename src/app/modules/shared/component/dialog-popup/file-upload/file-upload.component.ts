import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { SharedFormFmodules } from 'app/modules/shared/modules/shared-form-modules';
import { RvDisplayPricePipe } from 'app/core/pipe/rv-display-price.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import { ProductService } from 'app/modules/masters/product/product.service';
import { AlertsService } from 'app/core/services/alerts.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules,SharedFormFmodules,TranslocoModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  selectedFile: File | null = null;

  constructor(private dialogRef: MatDialogRef<FileUploadComponent>,
    private productService: ProductService,
    private alertService: AlertsService
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload() {
    if (this.selectedFile) {
      this.dialogRef.close(this.selectedFile);
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  downloadDemoFile() {
    this.productService.getProductTemplate('').subscribe({
      next: (result) => {
        this.alertService.showAlert('File downloaded', true);
        const url = window.URL.createObjectURL(result);
        const a = document.createElement('a');
        a.href = url;
        a.download = `products_template.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        this.alertService.showAlert("Product Template downloaded successfully", true);
      }
    })
  }
}
