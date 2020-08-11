import { Component } from '@angular/core';
import { RndPosition } from './lgame/lghelpers/rnd-position';
import { Point } from './lgame/lghelpers/point';
import { Vector } from './lgame/lghelpers/vector';
import { Printable } from './lgame/lghelpers/printable';
import { Size } from './lgame/lghelpers/size';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lgame-refactored';

  constructor(){

    let point = new Vector();

    let printable:Printable = new Printable();
    let size = new Size();
    console.log(size);
  }
}
