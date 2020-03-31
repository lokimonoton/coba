import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from './service';
import { CacheService } from './cache/cache.service';
import { Observable } from 'rxjs';
import { ConfigData } from './config';

@Injectable({ providedIn: 'root' })
export class CategoryService extends Service {
    constructor(public http: HttpClient) { 
        super(http, 'categories', new CacheService('categories'));
    }

    getCategories() {
        if (this.getCacheService()) {
            return new Observable(observer => {
                if (ConfigData.isCacheCategoryEnabled) {
                    let cacheItems = this.getCacheService().getItems()
                    if (cacheItems) {
                        var results = []
                        for (var property in cacheItems) {
                            results.push(cacheItems[property])
                        }
                        observer.next(results)
                        observer.complete()
                        return
                    }
                }
                this.getItemList(null, null, null, 1, 100).subscribe(items => {
                    let filteredItems = this.filter(items)
                    this.getCacheService().saveItems(filteredItems)
                    observer.next(filteredItems)
                    observer.complete()
                }, err => {
                    observer.error(err)
                    observer.complete()
                })    
            });
        }
    }

    filter(items) {
        return items.filter(this.getFilterFunction());
    }

    getFilterFunction() {
        if (ConfigData.isExcludeCategoryEnabled) {
            return this.isCategoryExcluded
        } else {
            return this.isCategoryIncluded
        }
    }

    isCategoryExcluded(item) {
        return item.count > 0 && !ConfigData.excludeFromMenu[item.name.toLowerCase()]
    }

    isCategoryIncluded(item) {
        return item.count > 0  && ConfigData.includeFromMenu[item.name.toLowerCase()]
    }
}