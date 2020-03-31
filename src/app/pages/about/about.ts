import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [AboutService]
})
export class AboutPage {
  about: any;
  constructor(public navCtrl: NavController, private aboutService: AboutService) {
    this.about = this.aboutService.getAboutInformation();
  }
}
