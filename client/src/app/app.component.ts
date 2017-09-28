import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RealtimeDataService } from './services/realtime-data.service';
import { AxisConfigService } from './services/axis-config.service';

@Component({
  selector: 'moco-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Camera Motion Control App';

  constructor(private realtimeDataService: RealtimeDataService,
              private axisConfigService: AxisConfigService){}
}
