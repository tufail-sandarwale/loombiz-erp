import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-sub-category-item',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './product-sub-category-item.component.html',
  styleUrl: './product-sub-category-item.component.scss'
})
export class ProductSubCategoryItemComponent {

}
