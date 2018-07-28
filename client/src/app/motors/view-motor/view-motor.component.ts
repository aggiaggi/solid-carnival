import { Component, OnInit, Input } from '@angular/core';
import { Motor } from '../../models/motor';

@Component({
  selector: 'moco-view-motor',
  templateUrl: './view-motor.component.html',
  styleUrls: ['./view-motor.component.css']
})
export class ViewMotorComponent implements OnInit {
  @Input() motor: Motor;

  constructor() { }

  ngOnInit() {
  }

}
