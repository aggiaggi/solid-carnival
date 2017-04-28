import { Component } from '@angular/core';
import { AxisService } from './axis.service';
import { OnInit } from '@angular/core';
import { AxisComponent } from './axis/axis.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  name = 'Camera Motion Control App';

  constructor(private axisService: AxisService) { }

  ngOnInit(): void {

  }


}
