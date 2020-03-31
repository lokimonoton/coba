import { ConfigData } from './config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from './service';
import { Observable } from 'rxjs';
import { CacheService } from './cache/cache.service';

@Injectable({ providedIn: 'root' })
export class PostService extends Service {

  constructor(public http: HttpClient) {
    super(http, 'posts', new CacheService('posts'));
  }

  getPostListWithFilter(categoryId, tagId = null, sticky = null, search = null, page = null) {
    return new Observable(observer => {
      let categories = JSON.parse(localStorage.getItem("categories"));
      let posts = [];
      let query = categoryId ? `categories=${categoryId}` : null;
      if (tagId) {
        query = query ? query + `&tags=${tagId}` : `tags=${tagId}`
      }
      if (sticky != null) {
        query = query != null ? query + `&sticky=${sticky}` : `sticky=${sticky}`
      }
      if (search) {
        query = query ? query + `&search=${encodeURI(search)}` : `search=${encodeURI(search)}`
      }
      let itemListRequest = page ? this.getItemList(query, null, null, page, ConfigData.numberOfItemPerPage) : this.getItemList(query);
      itemListRequest.subscribe((data: Array<any>) => {
        data.forEach(element => {
          posts.push({
            "category": categories[element.categories[0]] ? categories[element.categories[0]].name : "",
            "categoryId": element.categories[0],
            "title": element.title.rendered,
            "time": element.date,
            "image": "",
            "id": element.id,
            "link": element.link,
            "content": element.content.rendered,
            "mediaId": element.featured_media,
            "tags": element.tags,
            "sticky": element.sticky,
            "comment_status": element.comment_status
          });
        });
        observer.next(posts);
        observer.complete();
      }, err => {
        observer.next(posts);
        observer.complete();
      }, () => {
        observer.next(posts);
        observer.complete();
      });
    })
  };
}
