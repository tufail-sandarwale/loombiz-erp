import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-udf-config',
  standalone: true,
  imports: [CommonModule,SharedMaterialModules,RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './udf-config.component.html',
  styleUrl: './udf-config.component.scss'
})
export class UdfConfigComponent {

}
