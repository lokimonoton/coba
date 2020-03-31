import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommentService } from '../../services/comment.service';
import { NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
  styleUrls: ['comments.scss'],
  providers: [CommentService]
})
export class CommentsPage {
  comments:Array<any> = [];
  post:any;
  commentPageLoaded = 1;
  loading = true;

  emptyState = {
    "title": "Uups, no data!",
    "subtitle": "Sorry no comments here"
  };

  constructor(public navCtrl: NavController,
    private route: ActivatedRoute,
    private commentService:CommentService) {
      let self = this;
      this.route.queryParams.subscribe(params => {
        self.post = JSON.parse(params['item']);
        //self.onCompleteEvent(this.post.comments);
        self.doRefresh(null);
      });
  }

  openComment(event) {
    if(event) {
      event.stopPropagation();
    }
    const navigationExtras: NavigationExtras = {
      queryParams: { postId: this.post.id }
    };
    this.navCtrl.navigateForward(['/form-page'], navigationExtras);
  }

  onCompleteEvent(items:Array<any>) {
    if (items) {
      items.forEach(element => {
        element.avatar = element.author_avatar_urls['96']
        this.comments.push(element)
      });
    }
  }

  doRefresh(event) {
    this.commentPageLoaded = 1;
    this.loadData(event);
  }

  loadData(event) {
    this.commentService
      .getAllCommentsForPostById(this.post.id, this.commentPageLoaded++)
      .subscribe((comments: Array<any>) => {
        this.loading = false;
        this.onCompleteEvent(comments);
        if (event) {
          event.target.complete();
        }
      }, err => {
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      }, () => {
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      });
  }

  doInfinite(event) {
    this.loadData(event);
  }

  isCommentEnabled(post) {
    return post.comment_status == 'open';
   }

   isEmptyStateActive() {
     return !this.loading && this.comments.length == 0;
   }
}
