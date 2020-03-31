import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AboutService {

    constructor() {}

    getAboutInformation() {
      return {
        "headerTitle":"About",
        "title": "Deco News",
        "titleImage": "../assets/imgs/decoLogo.png",
        "subtitle": "WordPress to Ionic 4 / Angular 7 News App",
        "description": "Amazing list of features",
        "about_text_button": "Purchase Now",
        "about_text_button_link": "https://devspush.com/deco-news-ionic-4-mobile-app-for-wordpress-angular-7-sass-firebase-admob-onesignal",
        "items": [
          {
            "title": "No need for development skills",
            "icon": "../assets/imgs/checkmark.png",
          },
          {
            "title": "Word press as Backend",
            "icon": "../assets/imgs/checkmark.png",
          },
          {
            "title": "Amazing Documentation and Support",
            "icon": "../assets/imgs/checkmark.png",
          },
          {
            "title": "Firebase Push Notifications",
            "icon": "../assets/imgs/checkmark.png",
          },
          {
            "title": "AdMob Integration",
            "icon": "../assets/imgs/checkmark.png",
          },
          {
            "title": "Light and Dark theme",
            "icon": "../assets/imgs/checkmark.png",
          },
          {
            "title": "Design files (Sketch, Adobe Xd and Photo shop)",
            "icon": "../assets/imgs/checkmark.png",
          },
          {
            "title": "Ionic 4, Sass & Angular 7",
            "icon": "../assets/imgs/checkmark.png",
          },
          {
            "title": "Compatible with Android & iOS",
            "icon": "../assets/imgs/checkmark.png",
          }
        ]
      };
    }
}