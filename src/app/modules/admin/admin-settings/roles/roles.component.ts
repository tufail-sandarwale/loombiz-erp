import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './roles.component.html',
})
export class RolesComponent {

}
