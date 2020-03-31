import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NewsWizardService {

    constructor() { }

    //* Data Set for page 1
    getNewsWizardData = (): any => {
        return {
             "btnPrev": "Previous",
             "btnNext": "Next",
             "btnFinish": "Finish",
             "items": [
                 {
                    "avatarImage": "https://decouikit.com/presentationEnvato/deco-news-android/magic.png",
                     "title": "Magic",
                     "description": "Make mobile application from your Wordpress web"
                 },
                 {
                    "avatarImage": "https://decouikit.com/presentationEnvato/deco-news-android/design.png",
                     "title": "Design",
                     "description": "Fresh & stylish design for your mobile news app"
                 },
                 {
                    "avatarImage": "https://decouikit.com/presentationEnvato/deco-news-android/code.png",
                     "title": "Code",
                     "description": "Well written code with online documentation"
                 }
             ]
        };
    }
}
