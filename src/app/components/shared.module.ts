
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NewsItemPage } from './news-item/news-item';
import { NewsItemHomePage } from './news-item-home/news-item-home';
import { NewsListPage } from './news-list/news-list';
import { NewsLoadingPage } from './news-loading/news-loading';
import { NewsEmptyStatePage } from './news-empty-state/news-empty-state';
import { NewsWizardPage } from './news-wizard/news-wizard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    NewsItemPage, NewsItemHomePage, NewsListPage, 
    NewsLoadingPage, NewsEmptyStatePage,
    NewsWizardPage
  ],
  exports: [
    NewsItemPage, NewsItemHomePage, NewsListPage, 
    NewsLoadingPage, NewsEmptyStatePage,
    NewsWizardPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
