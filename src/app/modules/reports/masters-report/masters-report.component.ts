import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsService } from '../reports.service';
import { result } from 'lodash';
import { error } from 'highcharts';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { FuseCardComponent } from '@fuse/components/card';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-masters-report',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, FuseCardComponent, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './masters-report.component.html',
  styleUrl: './masters-report.component.scss'
})
export class MastersReportComponent implements OnInit {

  groupedReports = [];
  reportTypes = [];
  favReports = [];
  constructor(private reportService: ReportsService, private router: Router,) { }
  ngOnInit(): void {
    this.loadAllReports();
  }

  loadAllReports() {
    this.reportService.allReports().subscribe({
      next: result => {
        this.favReports = result.filter(item => item.fav);
        this.groupedReports = this.groupReportsByType(result);
      },
      error: error => {

      }
    })
  }

  setFav(element) {
    element.fav = !element.fav;
    this.reportService.setFav(element.code, element.fav).subscribe({
      next: result => {
        if (element.fav) {
          this.favReports.push(element);
        } else {
          this.favReports = this.favReports.filter(item => item.code != element.code);
        }
      },
      error: error => {

      }
    })
  }

  groupReportsByType(reports: any[]) {
    return reports.reduce((acc, report) => {
      (acc[report.typeName] = acc[report.typeName] || []).push(report);
      return acc;
    }, {} as { [key: string]: any[] });
  }
  getReportTypeIcon(type: string) {
    switch (type.toLowerCase()) {
      case 'fav':
        return 'favorite';
      case 'inventory':
        return 'inventory_2';
      case 'sales':
        return 'point_of_sale';
      case 'purchase':
        return 'shopping_bag';
      case 'gstreturn':
        return 'payments';
      case 'others':
        return 'description';
      case 'accounts':
        return 'account_balance';
      default:
        return 'mat_solid:home';
    }
  }

  openReport(report: any) {
    this.router.navigate(['/reports/' + report.code, { tableCode: report.code, title: report.title }]);
  }
}
