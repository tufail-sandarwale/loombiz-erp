import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SharedMaterialModules } from '../../modules/shared-material-modules';
import { FuseCardComponent } from '@fuse/components/card';
import { LocaleService, NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import * as moment from 'moment';
import { SharedFormFmodules } from '../../modules/shared-form-modules';
import { DashboardService } from 'app/modules/dashboard/dashboard.service';
import { DynaChartComponent } from '../dyna-chart/dyna-chart.component';
import { MatDialog } from '@angular/material/dialog';
import { WidgetParamsDialogComponent } from '../dialog-popup/widget-params-dialog/widget-params-dialog.component';
import { CustomWidgetComponent } from './custom-widget/custom-widget.component';
import { color } from 'highcharts';

@Component({
  selector: 'app-dyna-dashboard',
  standalone: true,
  imports: [CommonModule, SharedFormFmodules, SharedMaterialModules, FuseCardComponent, NgxDaterangepickerMd, DynaChartComponent, CustomWidgetComponent],
  templateUrl: './dyna-dashboard.component.html',
  styleUrl: './dyna-dashboard.component.scss',
  providers: [LocaleService],
})
export class DynaDashboardComponent implements OnInit, OnChanges {
  dashboard;
  selectedDateRange: { startDate: moment.Moment, endDate: moment.Moment };
  startDate=null;
  endDate=null;
  alwaysShowCalendars: boolean;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService, private dialog: MatDialog) {
    this.selectedDateRange = { startDate: moment().startOf('month'), endDate: moment().endOf('month') };
    this.startDate = this.selectedDateRange.startDate;
    this.endDate = this.selectedDateRange.endDate;
  }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('dashboardCode');
    console.log(code);
    this.dashboard = this.route.snapshot.data['dashboard'];
    this.processDashboard();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }

  processDashboard() {
    this.dashboard['groupedWidgets'] = [];
    let currentGroup = [];
    this.dashboard.dashboardWidget.forEach(dw => {
      this.loadWidgetData(dw);
      if (dw.showInNewLine && currentGroup.length > 0) {
        this.dashboard.groupedWidgets.push(currentGroup);
        currentGroup = [];
      }
      currentGroup.push(dw);

    })
    if (currentGroup.length > 0) {
      this.dashboard.groupedWidgets.push(currentGroup);
    }
    console.log('Grouped Widgets:', this.dashboard.groupedWidgets);
  }

  loadWidgetData(dw) {
    if (dw.widget.widgetType == 'CHART') {
      this.loadChart(dw);
    } else if (dw.widget.widgetType == 'TABLE') {

    } else {
      this.loadChartData(dw, null);
    }
  }

  loadChart(dw) {
    this.dashboardService.getChartOptions(dw.widget.chartType).subscribe((res: any) => {
      let options = res.options;
      this.loadChartData(dw, options);
    })
  }

  loadChartData(dw, options) {
    if (dw.widget.api) {
      let requestParamsBody = this.getRequestParamsBody(dw.widget.widgetParameters);
      this.dashboardService.getChartData(dw.widget.api, requestParamsBody).subscribe({
        next: (res: any) => {
          this.processChart(res, dw, options);
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {

    }
  }

  processChart(data, dw, options) {
    if (dw.widget.widgetType == 'CUSTOM') {
      dw['data'] = data;
    } else {
      this.createSeries(data, dw, options);
    }
  }

  createSeries(data, dw, options) {
    switch (dw.widget.code) {
      case 'sales_trends_by_interval': {
        this.createSeriesForSalesTrendsByInterval(data, dw, options);
        break;
      }
    }
  }

  createSeriesForSalesTrendsByInterval(data, dw, options) {
    if (!data.find(item => item.value > 0)) {
      options.series = [];
      dw['chartOptions'] = options;
    } else {
      let category = data.map(item => item.name);
      let seriesData = data.map(item => ({ 'name': item.name, 'y': item.value, 'color': '#2973B2' }));
      let series = [
        {
          name: 'Sales',
          colorByPoint: true,
          data: seriesData
        }];
      options.yAxis.title.text = 'Total Sales';
      options.xAxis.categories = category;
      options.series = series;
      dw['chartOptions'] = options;
    }
  }

  getRequestParamsBody(params: any[]) {
    const startDate = this.selectedDateRange.startDate.format('YYYY-MM-DD');
    const endDate = this.selectedDateRange.endDate.format('YYYY-MM-DD');
    let requestParams = {
      startDate: startDate,
      endDate: endDate
    };
    params.forEach(p => {
      requestParams[p.code] = p.value;
    })
    return requestParams;
  }

  getWidthClass(numColumns: string): string {
    const widthMap: { [key: string]: string } = {
      "10%": "w-1/12",
      "20%": "w-2/12",
      "25%": "w-3/12",
      "30%": "w-4/12",
      "40%": "w-5/12",
      "50%": "w-6/12",
      "60%": "w-7/12",
      "70%": "w-8/12",
      "75%": "w-9/12",
      "80%": "w-10/12",
      "90%": "w-11/12",
      "100%": "w-full"
    };

    return widthMap[numColumns] || "w-full"; // Default to full width if not mapped
  }

  openParamsDialog(dw: any) {
    const dialogRef = this.dialog.open(WidgetParamsDialogComponent, {
      width: '500px',
      data: {
        parameters: dw.widget.widgetParameters
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        dw.widget.widgetParameters = result;
        localStorage.setItem(this.dashboard.code, JSON.stringify(this.dashboard));
        this.loadWidgetData(dw);
      }
    });
  }

  applyDateRange() {
    this.startDate = this.selectedDateRange.startDate;
    this.endDate = this.selectedDateRange.endDate;
    this.processDashboard();
  }
}
