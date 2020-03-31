import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WizardService {

    constructor() {}

    getWizardData() {
      return {
        "finishButton":"Finish",
        "skipButton": "Skip",
        "getStartedButton": "Started",
        "pages": [
          {
            "title": "Magic", 
            "subtitle": "Make mobile application from your Wordpress web",
            "image": "https://deco-news.s3.eu-central-1.amazonaws.com/Magic.png"
          },
          {
            "title": "Design", 
            "subtitle": "Fresh &amp; stylish design for your mobile news app",
            "image": "https://deco-news.s3.eu-central-1.amazonaws.com/Design.png"
          },
          {
            "title": "Code", 
            "subtitle": "Well written code with online documentation",
            "image": "https://deco-news.s3.eu-central-1.amazonaws.com/Code.png"
          }
        ]
      };
    }
}