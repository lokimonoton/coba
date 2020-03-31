import { Component, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { CategoryService } from '../../services/categoty.service';
import { NavigationExtras } from '@angular/router';
import { ConfigData } from '../../services/config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
  styleUrls: ['category.scss'],
  providers:[CategoryService]
})
export class CategoryPage {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  categories:any = [];

  constructor(
    public navCtrl: NavController,
    private categoryService:CategoryService,
    private domSanitizer: DomSanitizer) {
      this.loadCategories(null);
  }

  openCategory(category) {
    const navigationExtras: NavigationExtras = {
      queryParams: { categoryId: category.id }
    };
    this.navCtrl.navigateForward(['/recent-news'], navigationExtras);
  }

  getHtmlTitle(title) {
    if (title) {
        return this.domSanitizer.bypassSecurityTrustHtml(title)
    }
  }

  doInfinite(event) {
    this.loadCategories(event)
  }

  loadCategories(event) {
    this.categoryService
      .getCategories()
      .subscribe((data: Array<any>) => {
        this.categories = data
        if (event) {
          event.target.complete();
        }
      });
  }
}
