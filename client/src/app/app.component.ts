import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { McuService } from './mcu.service';

@Component({
  selector: 'moco-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Camera Motion Control App';

  constructor(private mcuService: McuService){}
}
