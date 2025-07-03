import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import ExportData from 'highcharts/modules/export-data';
import * as Highcharts from 'highcharts';
import { Chart, ChartModule } from 'angular-highcharts';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
//import Exporting from 'highcharts/modules/exporting';
ExportData(Highcharts)
NoDataToDisplay(Highcharts);
//Exporting(Highcharts);
@Component({
  selector: 'app-dyna-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './dyna-chart.component.html',
  styleUrl: './dyna-chart.component.scss'
})
export class DynaChartComponent implements OnInit, OnChanges {
  @Input() options;
  Highcharts: typeof Highcharts = Highcharts;
  chart: Chart;
  chartOptions: Highcharts.Options;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChart();
  }

  loadChart() {
    this.options.chart['width'] = null;
    this.chart = new Chart(this.options);
  }
}
