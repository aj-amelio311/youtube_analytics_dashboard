import { Component, OnInit } from '@angular/core';
import {GetdataService} from '../../services/getdata.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
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
export class CommentsComponent implements OnInit {

  constructor(private _get:GetdataService) { }
  data:any[];
  urlparam:string = `previous_day`;

  ngOnInit() {
    this._get.getResponse(this.urlparam).subscribe((resp) => {
      this.data = resp.json();
    })
  }

}
