import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MediaService } from '../../services/media.service';
import { BookmarkService } from '../../services/bookmark.service';

@Component({
  selector: 'news-list',
  templateUrl: 'news-list.html',
  styleUrls: ['news-list.scss'],
  providers: [PostService, MediaService, BookmarkService]
})
export class NewsListPage {
  @Input('categoryId') categoryId: any;
  @Input('title') title: any;
  @Input('doRefresh') doRefresh: any;
  @Input('postId') postId: any;
  @Input('tags') tagId: any;
  @Input('sticky') sticky: any;
  @Input('search') search: any;
  @Output() onItemClick = new EventEmitter();
  @Output() onRefreshCompleted = new EventEmitter();

  posts: any = [];
  events: any = {};
  bookmarks: any = {};
  postPageLoaded = 1;
  loading = true;
  refreshLoader = false;

  emptyState = {
    "title": "Uups, no data!",
    "subtitle": "Sorry no posts here"
  } 
  constructor(
    private postService: PostService,
    private mediaService: MediaService,
    private bookmarkService: BookmarkService) {
    this.bookmarks = this.bookmarkService.getAllBookmark();
  }

  ngOnChanges() {
    console.log('ngOnChanges');
    this.postPageLoaded = 1
    this.posts = []
    this.doRefresh = false;
    this.loading = true
    this.loadData(null);
  }

  doInfinite(event) {
    this.loadData(event);
  }

  itemClick(item) {
    this.onItemClick.emit(item);
  }

  loadData(event=null, doRefresh=false) {
    this.postService.getPostListWithFilter(this.categoryId, this.tagId, this.sticky, this.search, this.postPageLoaded++)
    .subscribe((data: Array<any>) => {
      if (doRefresh) {
        this.posts = [];
      }
      let newData = this.postId ? data.filter(it => it.id != this.postId) : data;
      this.posts = this.posts.concat(newData);

      if (event) {
        event.target.complete();
      }
      console.log('loadData-onRefreshCompleted');
      if (this.onRefreshCompleted) {
        this.onRefreshCompleted.emit();
      }
      newData.forEach(element => {
        element.bookmark = this.bookmarks[element.id] ? true : false
        if (element.mediaId) {
          this.mediaService.getItemById(element.mediaId).subscribe(media => {
            this.posts.forEach(element => {
              if (media['id'] === element['mediaId']) {
                element.image = media['source_url'];
              }
            });
          })
        }
      });
      this.loading = false;
    },
      err => {
        if (this.onRefreshCompleted) {
          this.onRefreshCompleted.emit();
        }
        if (event) {
          event.target.complete();
          this.loading = false;
        }
      }, () => {
        if (this.onRefreshCompleted) {
          this.onRefreshCompleted.emit();
        }
        if (event) {
          event.target.complete();
          this.loading = false;
        }
      }
    )
  }

  isEmptyStateActive() {
    return !this.loading && !this.refreshLoader && this.posts.length == 0;
  }
}
