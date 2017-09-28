import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AxisConfigService {

    constructor(@Inject('greeting') greeting) {
        console.log(greeting + ' from AxisConfigService');
    }

}
