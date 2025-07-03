import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { ClientSideTableViewComponent } from 'app/modules/shared/component/client-side-table-view/client-side-table-view.component';
import { InventryService } from '../inventory.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'app/core/services/alerts.service';
import { RVConstants } from 'app/core/rv-constants';
import { TableColumns } from 'app/core/modal/TableColumns';

@Component({
  selector: 'app-pricing-attribute-setting',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, ReactiveFormsModule, TranslocoModule, ClientSideTableViewComponent],
  templateUrl: './pricing-attribute-setting.component.html',
  styleUrl: './pricing-attribute-setting.component.scss'
})
export class PricingAttributeSettingComponent implements OnInit {
  settingsForm: FormGroup = this.fb.group({});
  settingList: any[] = []; // Store settings for labels

  constructor(private fb: FormBuilder, private inventryService: InventryService) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  // Load settings from API and set the form values
  loadSettings() {
    this.inventryService.getDefaultProductSettings('productPricing').subscribe(
      (settings) => {
        const formGroup = {};

        // Store settings for use in the template (e.g., for labels)
        this.settingList = settings;

        // Dynamically create form controls
        settings.forEach((setting: any) => {
          formGroup[setting.code] = [setting.defaultValue || '']; // Set defaultValue or empty string
        });

        // Set the form controls dynamically
        this.settingsForm = this.fb.group(formGroup);
      },
      (error) => {
        console.error('Error loading settings:', error);
      }
    );
  }

  // Save the updated default values
  saveSettings() {
    const updatedSettings = Object.keys(this.settingsForm.value).map((key) => ({
      code: key,
      defaultValue: this.settingsForm.value[key],
    }));

    this.inventryService.updateProductSettings(updatedSettings).subscribe(
      (response) => {
        console.log('Settings saved successfully:', response);
      },
      (error) => {
        console.error('Error saving settings:', error);
      }
    );
  }
}
