import { IntroPage } from './../intro-page/intro-page';
import { AdMobFree } from '@ionic-native/admob-free/ngx';

import { Component, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { CategoryService } from '../../services/categoty.service';

import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { MediaService } from '../../services/media.service';
import { BookmarkService } from '../../services/bookmark.service';
import { NavigationExtras } from '@angular/router';
import { ConfigData } from '../../services/config';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss'],
  providers: [CategoryService, UserService,
    PostService, MediaService, BookmarkService, AdMobFree
  ]
})
export class HomePage {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  categories: any = [];
  posts: any = [];
  postsRecentNews: any = [];
  selectedCategory: any;
  selectedItem: any;
  postPageLoaded = 1;
  loading = true;

  emptyState = {
    "title": "Uups, no data!",
    "subtitle": "Sorry no posts here"
  } 
  
  constructor(
    private admobFree: AdMobFree,
    public navCtrl: NavController,
    private domSanitizer: DomSanitizer,
    private modalController: ModalController,
    private categoryService: CategoryService,
    private postService: PostService,
    private mediaService: MediaService,
    private bookmarkService: BookmarkService) {
      this.showBannerAds();
      this.categoryService.getCategories().subscribe(categories => {
        this.categories = categories
        if (categories) {
          this.refreshData(categories[0])
        }
      });

      if (!this.isWizardShown()) {
        this.openModalWizard();
      }
  }

  isWizardShown() {
    if (ConfigData.introData) {
      return localStorage.getItem("SHOW_START_WIZARD") == "true";
    } 
    return false
  }

  showBannerAds() {
    if (!ConfigData.bannerAds.enable) {
      return;
    }
    this.admobFree.banner.config(ConfigData.bannerAds.config);
    this.admobFree.banner.prepare();
  }

  getHtmlTitle(title) {
    if (title) {
      return this.domSanitizer.bypassSecurityTrustHtml(title)
    }
  }

  loadData(categoryId, event) {
    if (ConfigData.isFeaturesPostsGetFromSticky) {
      this.loadDataStickyFeatured(categoryId, event);
      this.loadDataStickyRecent(categoryId, event);
    } else {
      this.loadPostsAll(categoryId, event);
    }
  }

  loadPostsAll(categoryId, event) {
    this.postService.getPostListWithFilter(categoryId, null, null, null, this.postPageLoaded++).subscribe((data: Array<any>) => {
      if (this.posts && this.posts.length == 0) {
        this.posts = data.slice(0, ConfigData.numberOfItemForSlider);
        if (data.length > ConfigData.numberOfItemForSlider) {
            this.postsRecentNews = this.postsRecentNews.concat(data.slice(ConfigData.numberOfItemForSlider, data.length));
        }
      } else {
        this.postsRecentNews = this.postsRecentNews.concat(data);
      }

      this.posts.forEach(element => {
        element.bookmark = this.bookmarkService[element.id] ? true : false
        if (element.mediaId) {
          this.mediaService.getItemById(element.mediaId).subscribe(media => {
            this.posts.forEach(element => {
              if (media['id'] === element['mediaId']) {
                element.image = media['source_url'];
              }
            });
          });
        }
      });

      this.postsRecentNews.forEach(element => {
        element.bookmark = this.bookmarkService[element.id] ? true : false
        if (element.mediaId) {
          this.mediaService.getItemById(element.mediaId).subscribe(media => {
            this.postsRecentNews.forEach(element => {
              if (media['id'] === element['mediaId']) {
                element.image = media['source_url'];
              }
            });
          });
        }
      });
      this.loading = false;
      if (event) {
        event.target.complete();
      }
    })
  }

  loadDataStickyRecent(categoryId, event) {
    this.postService.getPostListWithFilter(categoryId, null, false, null, this.postPageLoaded++).subscribe((data: Array<any>) => {
      this.postsRecentNews = this.postsRecentNews.concat(data)
      if (event) {
        event.target.complete();
      }
      this.postsRecentNews.forEach(element => {
        element.bookmark = this.bookmarkService[element.id] ? true : false
        if (element.mediaId) {
          this.mediaService.getItemById(element.mediaId).subscribe(media => {
            this.postsRecentNews.forEach(element => {
              if (media['id'] === element['mediaId']) {
                element.image = media['source_url'];
              }
            });
          });
        }
      });
      this.loading = false;
    });
  }
  
  loadDataStickyFeatured(categoryId, event) {
    this.postService.getPostListWithFilter(categoryId, null, true, null, this.postPageLoaded).subscribe((data: Array<any>) => {
      this.posts = this.posts.concat(data)
      if (event) {
        event.target.complete();
      }
      this.posts.forEach(element => {
        element.bookmark = this.bookmarkService[element.id] ? true : false
        if (element.mediaId) {
          this.mediaService.getItemById(element.mediaId).subscribe(media => {
            this.posts.forEach(element => {
              if (media['id'] === element['mediaId']) {
                element.image = media['source_url'];
              }
            });
          });
        }
      });
      this.loading = false;
    });
  }

  refreshData(category) {
    if (category) {
      this.loading = true;
      this.selectedItem = category.name;
      this.selectedCategory = category;
      this.postsRecentNews = [];
      this.posts = [];
      this.postPageLoaded = 1;
      this.loadData(category.id, null);
    }
  }

  doInfinite(event) {
    this.loadData(this.selectedCategory.id, event);
  }

  openViewAll(isFeatured, event) {
    if (event) {
      event.stopPropagation();
    }
    const navigationExtras: NavigationExtras = {
      queryParams: { featured: isFeatured, categoryId: this.categories[0].id}
    };
    this.navCtrl.navigateForward(['/recent-news'], navigationExtras);
  }
  
  openSinglePost(item) {
    const navigationExtras: NavigationExtras = {
      queryParams: { item: JSON.stringify(item) }
    };
    this.navCtrl.navigateForward(['/single-page'], navigationExtras);
  }

  bookmark = (item, e) => {
    if (e) {
      e.stopPropagation();
    }
    if (item.bookmark) {
      item.bookmark = false;
      this.bookmarkService.delete(item);
    } else {
      item.bookmark = true;
      this.bookmarkService.save(item);
    }
  }

  isEmptyStateActive() {
    return !this.loading && this.posts.length == 0 && this.postsRecentNews.length == 0
  }

  initialLoading() {
    return this.loading
  }
  async openModalWizard() {
    let modal = await this.modalController.create({component: IntroPage});
     return await modal.present();
  }
}
