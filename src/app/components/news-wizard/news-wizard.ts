import { Component, Output, EventEmitter, Input, ViewChild, OnChanges } from '@angular/core';

@Component({
  selector: 'news-wizard',
  templateUrl: 'news-wizard.html',
  styleUrls: ['news-wizard.scss'],
})
export class NewsWizardPage implements OnChanges {
  @Input() data: any;
  @Output() onFinish = new EventEmitter();
  @Output() onNext = new EventEmitter();
  @Output() onPrevious = new EventEmitter();

  @ViewChild('wizardSlider') slider;

  sliderOptions = { pager: true };

  prev = false;
  next = true;
  ignoreDidChange = false;

  constructor() { }

  ngOnChanges(changes: { [propKey: string]: any }) {
    this.data = changes['data'].currentValue;
  }

  onFinishFunc() {
    if (event) {
      event.stopPropagation();
    }
    this.onFinish.emit();
  }

  onNextFunc() {
    if (event) {
      event.stopPropagation();
    }
    this.onNext.emit();
    this.slider.slideNext(300);
  }

  onPreviousFunc() {
    this.onPrevious.emit();
    this.slider.slidePrev(300);
  }

  ionSlideReachStart() {
    this.prev = false;
    this.next = true;
    this.ignoreDidChange = true;
  }

  ionSlideReachEnd() {
    this.prev = true;
    this.next = false;
    this.ignoreDidChange = true;
  }

  ionSlideDidChange() {
    if (this.ignoreDidChange) {
      this.ignoreDidChange = false;
    } else {
      this.prev = true;
      this.next = true;
    }
  }
}
