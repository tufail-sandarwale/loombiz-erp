import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import Exporting from 'highcharts/modules/exporting';
import HC_colorAxis from 'highcharts/modules/coloraxis';
import { ChartModule } from 'angular-highcharts';
//import HC_bubble from 'highcharts/modules/';

HighchartsMore(Highcharts);
//Exporting(Highcharts);
HC_colorAxis(Highcharts);
//HC_bubble(Highcharts);
@Component({
  selector: 'app-polar-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './polar-chart.component.html',
  styleUrl: './polar-chart.component.scss'
})
export class PolarChartComponent implements OnInit {
  @Input() data = [];
  @Output() action = new EventEmitter<any>();
  chart: typeof Highcharts = Highcharts
  options: any;
  colors = Highcharts.getOptions().colors.map(Highcharts.Color.parse)


  ngOnInit(): void {
    const data: any = this.data;
    const scoreData: any = data[3];
    const colors: any[] = Highcharts.getOptions().colors.map(Highcharts.Color.parse);

    const monthExtremes: { min: number; max: number } = { min: 0, max: 26 };
    const weekExtremes: { min: number; max: number } = { min: 1, max: 5 };
    const paneOpeningAngles: { startAngle: number; endAngle: number } = { startAngle: 40.5, endAngle: 319.5 };
    const noLabelProp: { labels: { enabled: boolean } } = { labels: { enabled: false } };
    const specialSeriesProps: { showInLegend: boolean; groupPadding: number; pointPadding: number } = {
      showInLegend: false,
      groupPadding: 0,
      pointPadding: 0
    };

    const toggleableGradient: { pattern: undefined; radialGradient: number[]; stops: [number, string][] } = {
      pattern: undefined,
      radialGradient: [1, 0.25, 0.1],
      stops: [
        [0, '#1f1836'],
        [1, '#45445d']
      ]
    };

    const setGradient = function (): void {
      const chart: any = this.series.chart;
      chart.setMidPaneBg({
        backgroundColor: toggleableGradient,
        outerRadius: '75%'
      });
      chart.subtitle.element.style.opacity = 1;
    };

    const asColFieldStr = (str: string): string => (
      '<span class="col-display-fieldwrap">' +
      '<span class="symbolSize" ' +
      'style="color:{point.color};">●</span> ' + str + '</span>'
    );

    const teamNames: string[] = ['Musaddique', 'Zeeshan', 'Tufail'];
    const teamColors: any[] = [
      colors[9 % colors.length].tweenTo(colors[0], 0.25),
      colors[9 % colors.length].tweenTo(colors[8 % colors.length], 0.65),
      colors[9 % colors.length].tweenTo(colors[3], 0.85)
    ];
    const teamSeries: any[] = Array(3).fill({
      type: 'bubble',
      shadow: true,
      maxSize: '4%',
      minSize: '1%',
      clip: false,
      point: {
        events: {
          mouseOver: function (): void {
            const chart: any = this.series.chart;
            chart.subtitle.element.style.opacity = 0;
            chart.setMidPaneBg({
              backgroundColor: teamColors[this.series.index],
              innerRadius: '0%'
            });
          },
          mouseOut: setGradient
        }
      },
      colorKey: 't',
      tooltip: {
        headerFormat: (
          '<div class="team-day center">' +
          '<span class="team-header">' +
          '<b class="team-index">Day {point.x}</b></span>' +
          '<span class="team-name" style="' +
          'border: 0 outset {series.color};' +
          'border-block-end: 0 outset {series.color};">' +
          '<b>{series.name}</b></span>'
        ),
        pointFormat: (
          '<span class="team-points">' +
          '<span class="team-salescount-header">Daily Sales:</span>' +
          '</br>' +
          '<span class="team-salescount">{point.z}</span>'
        ),
        footerFormat: '</div>'
      }
    }).map((seriesProps: any, i: number) => ({
      ...seriesProps,
      name: teamNames[i],
      data: data[i],
      color: teamColors[i],
      marker: {
        fillColor: teamColors[i],
        fillOpacity: 1,
        lineColor: '#46465C',
        lineWidth: 2
      }
    }));

    const weekLabels: { dataLabels: { format: string; enabled: boolean; inside: boolean; style: any; textPath: any }; x: number; y: number }[] = Array(4)
      .fill(0)
      .map((_value: number, index: number) => ({
        dataLabels: {
          format: 'Week {x}',
          enabled: true,
          inside: true,
          style: {
            textOutline: undefined,
            fontSize: '0.7em',
            fontWeight: '700',
            textTransform: 'uppercase',
            fontStyle: 'normal',
            letterSpacing: '0.01em'
          },
          textPath: {
            enabled: true,
            attributes: {
              startOffset: (
                index % 3 ? '75%' : (
                  index % 2 ? '22%' : '28%'
                )
              ),
              dx: index % 2 ? '-2%' : '0%',
              dy: index % 3 ? '2.8%' : '3.3%'
            }
          }
        },
        x: index + 1,
        y: 1.5
      }));

    this.options = {
      chart: {
        polar: true,
        height: '100%',
        events: {
          load: function (): void {
            const midPane: any = this.pane[1];
            this.setMidPaneBg = function (background: any): void {
              midPane.update({ background: background });
            };
          },
          render: function (): void {
            if (this.legend.group) {
              const { chartWidth, chartHeight, legend } = this;
              const { legendWidth, legendHeight } = legend;
              legend.group.translate(
                (
                  (chartWidth - legendWidth) / 2
                ),
                legendHeight * (chartWidth / chartHeight)
              );
            }
          }
        }
      },
      title: {
        text: 'Employee Sale Performace'
      },
      subtitle: {
        text: 'Sales Team<br>Performance',
        useHTML: true,
        align: 'center',
        y: 35,
        verticalAlign: 'middle',
        style: {
          fontSize: '1em',
          color: 'white',
          textAlign: 'center'
        }
      },
      tooltip: {
        animation: false,
        backgroundColor: undefined,
        hideDelay: 0,
        useHTML: true,
        positioner: function (labelWidth: number, labelHeight: number): { x: number; y: number } {
          const { chartWidth, chartHeight } = this.chart;
          return {
            x: (chartWidth / 2) - (labelWidth / 2),
            y: (chartHeight / 2) - (labelHeight / 2)
          };
        }
      },
      colorAxis: [{
        minColor: colors[0].brighten(0.05).get('rgba'),
        maxColor: colors[5].brighten(0.05).get('rgba'),
        showInLegend: false,
        ...weekExtremes
      }, {
        minColor: colors[1].tweenTo(colors[5], 0.5),
        maxColor: colors[8 % colors.length].tweenTo(
          colors[8 % colors.length],
          0.5
        ),
        showInLegend: false,
        ...monthExtremes
      }],
      pane: [{
        size: '80%',
        innerSize: '75%',
        ...paneOpeningAngles,
        background: {
          borderColor: colors[4],
          backgroundColor: toggleableGradient,
          innerRadius: '40%'
        }
      }, {
        size: '55%',
        innerSize: '45%',
        ...paneOpeningAngles,
        background: {
          borderWidth: 0,
          backgroundColor: toggleableGradient,
          outerRadius: '75%'
        }
      }, {
        size: '100%',
        innerSize: '88%',
        startAngle: 16.5,
        endAngle: 343.5,
        background: {
          borderWidth: 1,
          borderColor: colors[4],
          backgroundColor: '#46465C',
          innerRadius: '55%',
          outerRadius: '100%'
        }
      }],
      xAxis: [{
        pane: 0,
        tickInterval: 1,
        lineWidth: 0,
        gridLineWidth: 0,
        min: 1,
        max: 26,
        ...noLabelProp
      }, {
        pane: 1,
        linkedTo: 0,
        gridLineWidth: 0,
        lineWidth: 0,
        plotBands: Array(3).fill(7).map(
          (weekendOffset: number, week: number) => {
            const from: number = weekendOffset * (week + 1);
            const to: number = from - 1;
            return { from, to, color: '#BBBAC5' };
          }
        ),
        ...monthExtremes,
        ...noLabelProp
      }, {
        pane: 2,
        tickAmount: 4,
        tickInterval: 0.5,
        gridLineWidth: 0,
        lineWidth: 0,
        ...weekExtremes,
        ...noLabelProp
      }],
      yAxis: [{
        pane: 0,
        gridLineWidth: 0.5,
        gridLineDashStyle: 'longdash',
        tickInterval: 1,
        title: null,
        ...noLabelProp,
        min: 1,
        max: 3
      }, {
        pane: 1,
        reversed: true,
        gridLineWidth: 0,
        tickInterval: 100,
        min: 0,
        max: 400,
        title: null,
        ...noLabelProp
      }, {
        pane: 2,
        tickInterval: 0.25,
        gridLineWidth: 0,
        gridLineColor: colors[1].brighten(0.05).get('rgba'),
        min: -3,
        max: 1,
        title: null,
        ...noLabelProp
      }],
      legend: {
        enabled: true,
        floating: true,
        layout: 'vertical',
        verticalAlign: 'center',
        align: 'center',
        backgroundColor: '#1f1836',
        borderRadius: 14,
        borderColor: 'transparent',
        borderWidth: 0,
        lineHeight: 8,
        itemStyle: {
          color: '#FFF',
          fontSize: '0.8em'
        },
        itemHoverStyle: {
          color: '#BBBAC5',
          fontSize: '0.9em'
        },
        padding: 2,
        itemDistance: 0,
        symbolPadding: 8,
        symbolHeight: 8,
        width: '36%',
        maxHeight: '14%'
      },
      plotOptions: {
        columnrange: {
          custom: {
            textSizeClass: 'small-size'
          }
        }
      },
      responsive: {
        rules: [
          {
            condition: {
              minWidth: 400
            },
            chartOptions: {
              legend: {
                lineHeight: 16,
                padding: 3,
                borderWidth: 0.5,
                itemStyle: {
                  fontSize: '0.9em'
                },
                itemHoverStyle: {
                  fontSize: '1.1em'
                },
                width: '34%'
              },
              subtitle: {
                style: {
                  fontSize: '1em'
                }
              }
            }
          }, {
            condition: {
              minWidth: 520
            },
            chartOptions: {
              legend: {
                borderWidth: 1,
                itemStyle: {
                  fontSize: '1.1em'
                },
                itemHoverStyle: {
                  fontSize: '1.25em'
                },
                width: '30%'
              },
              subtitle: {
                style: {
                  fontSize: '1.4em'
                }
              }
            }
          }, {
            condition: {
              minWidth: 600
            },
            chartOptions: {
              legend: {
                borderWidth: 1.5,
                itemStyle: {
                  fontSize: '1.2em'
                },
                itemHoverStyle: {
                  fontSize: '1.4em'
                },
                width: '26%'
              },
              plotOptions: {
                columnrange: {
                  custom: {
                    textSizeClass: 'mid-size'
                  }
                }
              },
              subtitle: {
                style: {
                  fontSize: '1.8em'
                }
              }
            }
          }, {
            condition: {
              minWidth: 680
            },
            chartOptions: {
              legend: {
                borderWidth: 2,
                symbolPadding: 12,
                symbolHeight: 12,
                itemStyle: {
                  fontSize: '1.4em'
                },
                itemHoverStyle: {
                  fontSize: '1.6em'
                }
              },
              plotOptions: {
                columnrange: {
                  custom: {
                    textSizeClass: 'large-size'
                  }
                }
              },
              subtitle: {
                style: {
                  fontSize: '2em'
                }
              }
            }
          }
        ]
      },
      series: [
        ...teamSeries, {
          ...specialSeriesProps,
          animation: false,
          name: 'Month',
          type: 'column',
          data: weekLabels,
          xAxis: 2,
          yAxis: 2,
          borderRadius: 50,
          colorKey: 'x',
          pointWidth: 1.2,
          pointPlacement: 'between',
          enableMouseTracking: false
        }, {
          showInLegend: false,
          ...specialSeriesProps,
          animation: false,
          name: 'Total',
          type: 'columnrange',
          data: scoreData,
          xAxis: 1,
          yAxis: 1,
          shadow: false,
          colorAxis: 1,
          colorKey: 'x',
          borderColor: '#46465C',
          borderWidth: 2,
          pointPlacement: 'on',
          pointStart: 1,
          point: {
            events: {
              mouseOver: function (): void {
                const chart: any = this.series.chart;
                chart.setMidPaneBg({
                  backgroundColor: toggleableGradient,
                  outerRadius: '75%'
                });
                chart.subtitle.element.style.opacity = 0;
              },
              mouseOut: setGradient
            }
          },
          tooltip: {
            headerFormat: (
              '<span class="team-day center">' +
              '<span class="{series.options.custom.textSizeClass}">' +
              '<b style="color:{point.color};">Day {point.x}</b></span>'
            ),
            hideDelay: 0,
            pointFormat: (
              asColFieldStr(
                '<b>Sales: </b><span>{point.high}</span>'
              ) +
              asColFieldStr(
                '<b>Average: </b><span>{point.avg}</span>'
              ) +
              asColFieldStr(
                '<b>Highscore: </b><span>{point.highscore}</span>'
              ) +
              asColFieldStr(
                '<b>Top earner: </b><span>{point.topEarner}</span>'
              )
            ),
            footerFormat: (
              '<i class="col-display-footer center">' +
              'Week {point.week}</i></span></span>'
            )
          }
        }
      ]
    }
  }
}
