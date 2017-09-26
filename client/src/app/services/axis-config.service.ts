import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AxisConfigService {

    constructor(@Inject('greeting') greeting: string) {
        console.log(greeting + ' from AxisConfigService');
    }

}
