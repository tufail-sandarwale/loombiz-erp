import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolarChartComponent } from 'app/modules/shared/component/high-charts/polar-chart/polar-chart.component';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';

@Component({
  selector: 'app-employee-sale-performace',
  standalone: true,
  imports: [CommonModule, SharedMaterialModules, PolarChartComponent],
  templateUrl: './employee-sale-performace.component.html',
  styleUrl: './employee-sale-performace.component.scss'
})
export class EmployeeSalePerformaceComponent implements OnInit {
  data = [];
  scoreData = [];
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.data = [[
      { "x": 1, "y": 1, "z": 20, "t": 1 },
      { "x": 2, "y": 1, "z": 45, "t": 1 },
      { "x": 3, "y": 1, "z": 12, "t": 1 },
      { "x": 4, "y": 1, "z": 37, "t": 1 },
      { "x": 5, "y": 1, "z": 42, "t": 1 },
      { "x": 8, "y": 1, "z": 57, "t": 1 },
      { "x": 9, "y": 1, "z": 86, "t": 1 },
      { "x": 10, "y": 1, "z": 92, "t": 1 },
      { "x": 11, "y": 1, "z": 49, "t": 1 },
      { "x": 12, "y": 1, "z": 42, "t": 1 },
      { "x": 15, "y": 1, "z": 48, "t": 1 },
      { "x": 16, "y": 1, "z": 97, "t": 1 },
      { "x": 17, "y": 1, "z": 87, "t": 1 },
      { "x": 18, "y": 1, "z": 92, "t": 1 },
      { "x": 19, "y": 1, "z": 83, "t": 1 },
      { "x": 22, "y": 1, "z": 35, "t": 1 },
      { "x": 23, "y": 1, "z": 21, "t": 1 },
      { "x": 24, "y": 1, "z": 45, "t": 1 },
      { "x": 25, "y": 1, "z": 96, "t": 1 },
      { "x": 26, "y": 1, "z": 82, "t": 1 }], [
      { "x": 1, "y": 2, "z": 73, "t": 2 },
      { "x": 2, "y": 2, "z": 92, "t": 2 },
      { "x": 3, "y": 2, "z": 41, "t": 2 },
      { "x": 4, "y": 2, "z": 33, "t": 2 },
      { "x": 5, "y": 2, "z": 63, "t": 2 },
      { "x": 8, "y": 2, "z": 20, "t": 2 },
      { "x": 9, "y": 2, "z": 27, "t": 2 },
      { "x": 10, "y": 2, "z": 25, "t": 2 },
      { "x": 11, "y": 2, "z": 12, "t": 2 },
      { "x": 12, "y": 2, "z": 75, "t": 2 },
      { "x": 15, "y": 2, "z": 84, "t": 2 },
      { "x": 16, "y": 2, "z": 71, "t": 2 },
      { "x": 17, "y": 2, "z": 94, "t": 2 },
      { "x": 18, "y": 2, "z": 79, "t": 2 },
      { "x": 19, "y": 2, "z": 53, "t": 2 },
      { "x": 22, "y": 2, "z": 94, "t": 2 },
      { "x": 23, "y": 2, "z": 63, "t": 2 },
      { "x": 24, "y": 2, "z": 67, "t": 2 },
      { "x": 25, "y": 2, "z": 86, "t": 2 },
      { "x": 26, "y": 2, "z": 27, "t": 2 }], [
      { "x": 1, "y": 3, "z": 20, "t": 3 },
      { "x": 2, "y": 3, "z": 53, "t": 3 },
      { "x": 3, "y": 3, "z": 83, "t": 3 },
      { "x": 4, "y": 3, "z": 11, "t": 3 },
      { "x": 5, "y": 3, "z": 2, "t": 3 },
      { "x": 8, "y": 3, "z": 71, "t": 3 },
      { "x": 9, "y": 3, "z": 28, "t": 3 },
      { "x": 10, "y": 3, "z": 84, "t": 3 },
      { "x": 11, "y": 3, "z": 65, "t": 3 },
      { "x": 12, "y": 3, "z": 3, "t": 3 },
      { "x": 15, "y": 3, "z": 60, "t": 3 },
      { "x": 16, "y": 3, "z": 49, "t": 3 },
      { "x": 17, "y": 3, "z": 96, "t": 3 },
      { "x": 18, "y": 3, "z": 46, "t": 3 },
      { "x": 19, "y": 3, "z": 33, "t": 3 },
      { "x": 22, "y": 3, "z": 28, "t": 3 },
      { "x": 23, "y": 3, "z": 28, "t": 3 },
      { "x": 24, "y": 3, "z": 46, "t": 3 },
      { "x": 25, "y": 3, "z": 57, "t": 3 },
      { "x": 26, "y": 3, "z": 66, "t": 3 }
    ], [
      { "x": 1, "low": 0, "high": 113, "week": 1, "avg": 37, "highscore": 73, "topEarner": "Musaddique" },
      { "x": 2, "low": 0, "high": 190, "week": 1, "avg": 63, "highscore": 92, "topEarner": "Musaddique" },
      { "x": 3, "low": 0, "high": 136, "week": 1, "avg": 45, "highscore": 83, "topEarner": "Zeeshan" },
      { "x": 4, "low": 0, "high": 81, "week": 1, "avg": 27, "highscore": 37, "topEarner": "Tufail" },
      { "x": 5, "low": 0, "high": 107, "week": 1, "avg": 35, "highscore": 63, "topEarner": "Musaddique" },
      { "x": 8, "low": 0, "high": 148, "week": 2, "avg": 49, "highscore": 71, "topEarner": "Zeeshan" },
      { "x": 9, "low": 0, "high": 141, "week": 2, "avg": 47, "highscore": 86, "topEarner": "Tufail" },
      { "x": 10, "low": 0, "high": 201, "week": 2, "avg": 67, "highscore": 92, "topEarner": "Tufail" },
      { "x": 11, "low": 0, "high": 126, "week": 2, "avg": 42, "highscore": 65, "topEarner": "Zeeshan" },
      { "x": 12, "low": 0, "high": 120, "week": 2, "avg": 40, "highscore": 75, "topEarner": "Musaddique" },
      { "x": 15, "low": 0, "high": 192, "week": 3, "avg": 64, "highscore": 84, "topEarner": "Musaddique" },
      { "x": 16, "low": 0, "high": 217, "week": 3, "avg": 72, "highscore": 97, "topEarner": "Tufail" },
      { "x": 17, "low": 0, "high": 277, "week": 3, "avg": 92, "highscore": 96, "topEarner": "Zeeshan" },
      { "x": 18, "low": 0, "high": 217, "week": 3, "avg": 72, "highscore": 92, "topEarner": "Tufail" },
      { "x": 19, "low": 0, "high": 169, "week": 3, "avg": 56, "highscore": 83, "topEarner": "Tufail" },
      { "x": 22, "low": 0, "high": 157, "week": 4, "avg": 52, "highscore": 94, "topEarner": "Musaddique" },
      { "x": 23, "low": 0, "high": 112, "week": 4, "avg": 37, "highscore": 63, "topEarner": "Musaddique" },
      { "x": 24, "low": 0, "high": 158, "week": 4, "avg": 52, "highscore": 67, "topEarner": "Musaddique" },
      { "x": 25, "low": 0, "high": 239, "week": 4, "avg": 79, "highscore": 96, "topEarner": "Tufail" },
      { "x": 26, "low": 0, "high": 175, "week": 4, "avg": 58, "highscore": 82, "topEarner": "Tufail" }
    ]]
  }
}
