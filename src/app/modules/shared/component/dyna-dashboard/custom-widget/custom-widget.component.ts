import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RvDisplayPricePipe } from 'app/core/pipe/rv-display-price.pipe';

@Component({
  selector: 'app-custom-widget',
  standalone: true,
  imports: [CommonModule, RvDisplayPricePipe],
  templateUrl: './custom-widget.component.html',
  styleUrl: './custom-widget.component.scss'
})
export class CustomWidgetComponent implements OnInit{
  @Input() dw: any;
  constructor() { }

  ngOnInit(): void {
  }

}
