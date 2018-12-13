import { Component, OnInit } from '@angular/core';
import {GetdataService} from '../../services/getdata.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-likeratio',
  templateUrl: './likeratio.component.html',
  styleUrls: ['./likeratio.component.css'],
  animations: [
    trigger('slide', [
      transition("void=>*", [
        style({transform: "translateY(-90px)"}),
        animate(200)
      ])
    ]),
    trigger('fade', [
      transition("void=>*", [
        style({opacity: 0}),
        animate(200)
      ])
    ])
  ]
})
export class LikeratioComponent implements OnInit {

  constructor(private _get: GetdataService) { }
  data:any[];
  printRatio:string;
  urlparam:string = `like_ratio`;
  rawWidth:number;
  likeWidth:string;

  ngOnInit() {
    this._get.getResponse(this.urlparam).subscribe((resp) => {
      this.data = resp.json();
      this.printRatio = resp.json().ratio;
      this.rawWidth = parseInt(resp.json().rawRatio) * 1.5;
      this.likeWidth = this.rawWidth.toString() + "px";
    })
  }

}
