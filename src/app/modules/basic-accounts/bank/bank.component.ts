import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-bank',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.scss'
})
export class BankComponent {

}
