import { Component, OnInit } from '@angular/core';
import {GetdataService} from '../../services/getdata.service';
import {AddcommaPipe} from '../../pipes/addcomma.pipe';
import { Chart } from 'chart.js';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css'],
  providers: [AddcommaPipe],
  animations: [
    trigger('slide', [
      transition("void=>*", [
        style({transform: "translateY(-90px)"}),
        animate(400)
      ])
    ]),
    trigger('fade', [
      transition("void=>*", [
        style({opacity: 0}),
        animate(400)
      ])
    ])
  ]
})
export class MonthComponent implements OnInit {
  constructor(private _get:GetdataService, private _comma:AddcommaPipe) {
   }

  doughnutChartLabels:string[] = ['This Month', 'Total Views'];
  doughnutChartData:number[] = [];
  doughnutChartType:string = 'doughnut';

  doughnutChartLabels2:string[] = ['This Month', 'Total Subscribers'];
  doughnutChartData2:number[] = [];
  doughnutChartType2:string = 'doughnut';
  doughnutChartDataOptions:any = {
    maintainAspectRatio : false
  }
  doughnutChartDataOptions2:any = {
    maintainAspectRatio : false
  }


  lineChartData = [
      {data: [], label: ""}
    ];
  lineChartLabels = [];
  lineChartOptions:any = {
      responsive: true
    };
  lineChartColors:Array<any> = [
      {
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#ececec'
      }
    ];


  lineChartData2 = [
      {data: [], label: ""}
    ];
  lineChartLabels2 = [];
  lineChartOptions2:any = {
      responsive: true
    };
  lineChartColors2:Array<any> = [
      {
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#ececec'
      }
    ];
  lineChartLegend:boolean = false;
  lineChartType:string = 'line';

  hide:boolean = true;
  month:string = ""
  year:string = ""
  urlparam:string = "month";

  views:number;
  allTimeViews:number;
  allTimeSubs:number;
  percentageViews:number;
  percentageSubs:number;
  subscribers:number;
  likes:number;
  dislikes:number;
  comments:number;
  viewsPerDay:number;
  subsPerDay:number;
  table:string = "";


  ngOnInit() {
  }

  getYear(year) {
    this.year = year.target.value;
    if (this.year !== "" && this.month !== "") {
      this.getAll();
    }
  }

  getMonth(month) {
    this.month = month.target.value;
    if (this.year !== "" && this.month !== "") {
      this.getAll();
    }
  }

  getAll() {
    this._get.getResponse(`all_time`).subscribe((resp) => {
      this.allTimeViews = parseInt(resp.json()[0].views)
      this.allTimeSubs = parseInt(resp.json()[0].subscribers)
      this.getData();
    })
  }

  getData() {
    this._get.getResponse(`${this.urlparam}/${this.month}/${this.year}`).subscribe((resp) => {
      if (resp.json().length > 0) {
        this.hide = false;
        let data = resp.json();
        let viewCharts = [];
        let subCharts = [];
        let days = (resp.json().length - 1)
        for (var i = 0; i < data.length; i++) {
          if (i >= 1) {
            viewCharts.push(data[i].views - data[i-1].views)
            subCharts.push(data[i].subscribers - data[i-1].subscribers)
          } else if (i == 0) {
            viewCharts.push(data[1].views - data[0].views)
            subCharts.push(data[1].subscribers - data[0].subscribers)
          }
        }
        this.lineChartData[0].data = viewCharts;
        this.lineChartData2[0].data = subCharts;
        this.lineChartLabels = Array.from({length: days + 1}, (v, k) => k+1)
        this.lineChartLabels2 = Array.from({length: days + 1}, (v, k) => k+1)
        this.views = (resp.json()[resp.json().length - 1].views) - (resp.json()[0].views)
        this.subscribers = (resp.json()[resp.json().length - 1].subscribers) - (resp.json()[0].subscribers)
        this.likes = (resp.json()[resp.json().length - 1].likes) - (resp.json()[0].likes)
        this.dislikes = (resp.json()[resp.json().length - 1].dislikes) - (resp.json()[0].dislikes)
        this.comments = (resp.json()[resp.json().length - 1].comments) - (resp.json()[0].comments)
        this.viewsPerDay = this.views / days;
        this.subsPerDay = this.subscribers / days;
        this.doughnutChartData = [this.views, this.allTimeViews]
        this.percentageViews = (this.views / this.allTimeViews) * 100;
        this.percentageSubs = (this.subscribers / this.allTimeSubs) * 100;
        this.doughnutChartData2 = [this.subscribers, this.allTimeSubs]
        this.table = `<div class="table-responsive">
          <table class="table">
            <thead align="center">
            <tr class="top-row">
              <th scope="col"><h6>Views</h6></th>
              <th scope="col"><h6>Subscribers</h6></th>
              <th scope="col"><h6>Likes</h6></th>
              <th scope="col"><h6>Dislikes</h6></th>
              <th scope="col"><h6>Comments</h6></th>
              <th scope="col"><h6>Views/Day</h6></th>
              <th scope="col"><h6>Subscribers/Day</h6></th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>${this._comma.transform(this.views)}</td>
            <td>${this._comma.transform(this.subscribers)}</td>
            <td>${this._comma.transform(this.likes)}</td>
            <td>${this._comma.transform(this.dislikes)}</td>
            <td>${this._comma.transform(this.comments)}</td>
            <td>${this._comma.transform(this.viewsPerDay.toFixed(2))}</td>
            <td>${this._comma.transform(this.subsPerDay.toFixed(2))}</td>
            </tr>
            </tbody>
            </table>
            </div>
            `;
      } else {
        this.table = "<h4>No Data Available</h4>"
        this.hide = true;
      }
    })
  }




}
