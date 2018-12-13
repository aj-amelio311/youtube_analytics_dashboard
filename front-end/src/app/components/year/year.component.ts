import { Component, OnInit } from '@angular/core';
import {GetdataService} from '../../services/getdata.service';
import {AddcommaPipe} from '../../pipes/addcomma.pipe';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css'],
  providers: [AddcommaPipe],
  animations: [
    trigger('slide', [
      transition("void=>*", [
        style({transform: "translateY(-90px)"}),
        animate(500)
      ])
    ]),
    trigger('fade', [
      transition("void=>*", [
        style({opacity: 0}),
        animate(500)
      ])
    ])
  ]
})
export class YearComponent implements OnInit {

  hide:boolean = true;
  year:string;
  views:number;
  subscribers:number;
  likes:number;
  dislikes:number;
  comments:number;
  viewsPerDay:number;
  subsPerDay:number;
  table:string = ""
  constructor(private _get:GetdataService, private _comma:AddcommaPipe) { }

  lineChartData = [
      {data: [], label: ""}
    ];
  lineChartLabels = [];
  lineChartOptions:any = {
      responsive: true,
      maintainAspectRatio : false
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
      responsive: true,
      maintainAspectRatio : false
    };
  lineChartColors2:Array<any> = [
      {
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#ececec'
      }
    ];
  lineChartLegend:boolean = false;
  lineChartType:string = 'line';


  ngOnInit() {
  }

  getYear(year) {
    this.hide = false;
    this.year = year.target.value
    this._get.getResponse(`year/${this.year}`).subscribe((resp) => {
      if (resp.json().length > 0) {
        let data = resp.json();
        let viewCharts = [];
        let subCharts = [];
        let days = (resp.json().length - 1)
        for (var i = 0; i < data.length; i++) {
          if (i >= 1) {
            viewCharts.push(data[i].views - data[i-1].views)
            subCharts.push(data[i].subscribers - data[i-1].subscribers)
          } else {
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
        this.subsPerDay = this.subscribers / days
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
        this.table = "<h4>No Data Available</h4>";
        this.hide = true;
      }
    })
  }

}
