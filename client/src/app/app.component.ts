import { Component } from '@angular/core';
import { AxisService} from './axis.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>`,
})
export class AppComponent implements OnInit  { 
  name = 'Angular';
  
  constructor(private axisService: AxisService) { }

  ngOnInit(): void {
    this.getPosition();
  }

  getPosition(): void {
    this.axisService.getAxisPosition(function(data: string){
      console.log(data);
    });
  }
}
