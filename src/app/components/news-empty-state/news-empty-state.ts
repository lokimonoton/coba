import { Component, Input } from '@angular/core';

@Component({
  selector: 'news-empty-state',
  templateUrl: 'news-empty-state.html',
  styleUrls: ['news-empty-state.scss']
})
export class NewsEmptyStatePage {

  @Input('title') title: any;
  @Input('subtitle') subtitle: any;

  constructor() {
  }
}
