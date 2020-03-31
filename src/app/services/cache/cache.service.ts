import { Injectable } from '@angular/core';
import { ConfigData } from '../config';

@Injectable({ providedIn: 'root' })
export class CacheService {
    
    constructor(public name: string) { 
    }

    getStorageName(): string {
        return this.name
    }

    clearAll() {
        localStorage.removeItem(name);
    }

    findById(id) {
        if (this.isCacheExpired()) {
            return null
        }
        let items = this.getItems() || {};
        if (items) {
            return items[id]
        } 
        return null
    }

    saveItems(items) {
        if (!items) { return; }
        
        if (items.size > 0) { return; }

        let listItems = this.getItems() || {};
        items.forEach(item => {
            if (!listItems[item.id]) {
                listItems[item.id] = item;
            }    
        });
        localStorage.setItem(this.getStorageName(), JSON.stringify(listItems));
        localStorage.setItem(this.getStorageName()+"Time", new Date().getTime().toString());
    }   

    isCacheExpired() {
        let cacheTime = parseInt(localStorage.getItem(this.getStorageName()+"Time"));
        return new Date().getTime() - cacheTime > ConfigData.cacheExpiredTime
    }

    save(item) {
        if (!item) {
            return;
        }
        if (!item.id) {
            return;
        }
        let items = this.getItems() || {};
        if (!items[item.id]) {
            items[item.id] = item;
            localStorage.setItem(this.getStorageName(), JSON.stringify(items));
            localStorage.setItem(this.getStorageName()+"Time", new Date().getTime().toString());
        }
    }   
    
    delete(item) {
        if (!item) {
            return;
        }
        if (!item.id) {
            return;
        }
        let items = this.getItems() || {};
        if (items[item.id]) {
            delete items[item.id]
            localStorage.setItem(this.getStorageName(), JSON.stringify(items));
            localStorage.setItem(this.getStorageName()+"Time", new Date().getTime().toString());
        }
    }

    getItems() {
        if (this.isCacheExpired()) {
            return null
        }
        let itemsString = localStorage.getItem(this.getStorageName());
        if (itemsString) {
            return JSON.parse(itemsString);
        }
        return null;
    }
}
