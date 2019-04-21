// From:
// https://stackoverflow.com/questions/45229061/how-to-in-angular2-make-my-longpress-directive-on-a-button-not-trigger-a-click-o


import {
  ElementRef,
  Directive,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';
import { eventNames } from 'cluster';

@Directive({ selector: '[mocoLongPress]' })
export class LongPressDirective {
  @Input() duration = 1000;

  @Output() shortpress: EventEmitter<any> = new EventEmitter();
  @Output() longpressStart: EventEmitter<any> = new EventEmitter();
  @Output() longpress: EventEmitter<any> = new EventEmitter();
  @Output() longpressing: EventEmitter<any> = new EventEmitter();
  //@Output() longpressend: EventEmitter<any> = new EventEmitter();

  private pressing: boolean;
  private longPressing: boolean;
  private timeout: any;
  private mouseX = 0;
  private mouseY = 0;

  constructor() {
  }

  @HostBinding('class.press')
  get press() { return this.pressing; }

  @HostBinding('class.longpress')
  get longPress() { return this.longPressing; }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.processPress(event);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event) {
    this.processPress(event);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {
    if (this.pressing && !this.longPressing) {
      const xThres = (event.clientX - this.mouseX) > 10;
      const yThres = (event.clientY - this.mouseY) > 10;
      if (xThres || yThres) {
        this.endPress(event);
      }
    }
  }

  @HostListener('mouseup')
  onMouseUp(event) { this.endPress(event); }

  @HostListener('touchend')
  onTouchEnd(event) { this.endPress(event); }

  processPress(event) {
    // don't do right/middle clicks
    if (event.which !== 1) { return; }

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.pressing = true;
    this.longPressing = false;

    this.timeout = setTimeout(() => {
      this.longPressing = true;
      this.longpressStart.emit(event);
      this.loop(event);
    }, this.duration);

    this.loop(event);
  }

  loop(event) {
    if (this.longPressing) {
      this.timeout = setTimeout(() => {
        this.longpressing.emit(event);
        this.loop(event);
      }, 50);
    }
  }

  endPress(event) {
    clearTimeout(this.timeout);
    if (!this.longPressing) {
      this.shortpress.emit(true);
    } else {
      this.longpress.emit(true);
    }
    this.longPressing = false;
    this.pressing = false;
  }

}
