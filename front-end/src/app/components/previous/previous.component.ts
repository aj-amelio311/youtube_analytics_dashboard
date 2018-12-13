import { Component, OnInit } from '@angular/core';
import {GetdataService} from '../../services/getdata.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-previous',
  templateUrl: './previous.component.html',
  styleUrls: ['./previous.component.css'],
  animations: [
    trigger('slide', [
      transition("void=>*", [
        style({transform: "translateY(-90px)"}),
        animate(300)
      ])
    ])
  ]
})
export class PreviousComponent implements OnInit {

  constructor(private _get:GetdataService) { }
  data:any[];
  urlparam:string = `previous_day`;
  ngOnInit() {
    this._get.getResponse(this.urlparam).subscribe((resp) => {
      this.data = resp.json();
    })
  }

}
