import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BookmarkService } from '../../services/bookmark.service';

@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html',
  styleUrls: ['bookmark.scss'],
  providers: [BookmarkService]
})
export class BookmarkPage {
  posts: any = [];
  title: any = "Bookmark";

  constructor(
    public navCtrl: NavController,
    private bookmarkService: BookmarkService) {
    this.loadBookmarks();
  }

  loadBookmarks() {
    let bookmarks = this.bookmarkService.getAllBookmark();
    this.posts = [];
    for (let item in bookmarks) {
      this.posts.push(bookmarks[item]);
    }
  }

  clearAll() {
    this.bookmarkService.clearAll();
    this.loadBookmarks();
  }
  
  ionViewWillEnter() {
    this.loadBookmarks();
  }

  onBookmark(item) {
      this.bookmarkService.delete(item);
      this.loadBookmarks();
  }
}
