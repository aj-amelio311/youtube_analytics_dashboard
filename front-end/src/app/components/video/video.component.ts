import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  animations: [
    trigger('fade', [
      transition("void=>*", [
        style({opacity: 0}),
        animate(2500)
      ])
    ])
  ]
})
export class VideoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
