import { Component, OnInit } from '@angular/core';
import {GetdataService} from '../../services/getdata.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-alltime',
  templateUrl: './alltime.component.html',
  styleUrls: ['./alltime.component.css'],
  animations: [
    trigger('slide', [
      transition("void=>*", [
        style({transform: "translateY(-90px)"}),
        animate(100)
      ])
    ]),
    trigger('fade', [
      transition("void=>*", [
        style({opacity: 0}),
        animate(100)
      ])
    ])
  ]
})
export class AlltimeComponent implements OnInit {

  constructor(private _get: GetdataService) { }

  data:any[];
  urlparam:string = `all_time`;

  ngOnInit() {
    this._get.getResponse(this.urlparam).subscribe((res) => {
      this.data = res.json()[0];
    })
  }

}
