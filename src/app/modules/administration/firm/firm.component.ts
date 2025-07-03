import { Component } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-firm',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './firm.component.html',
  styleUrl: './firm.component.scss'
})
export class FirmComponent {

}
