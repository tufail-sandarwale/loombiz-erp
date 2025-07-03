import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-inventory-config',
  standalone: true,
  imports: [CommonModule,SharedMaterialModules,RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {

}
