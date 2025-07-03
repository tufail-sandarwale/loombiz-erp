import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-udf-details',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './udf-details.component.html',
  styleUrl: './udf-details.component.scss'
})
export class UdfDetailsComponent {

}
