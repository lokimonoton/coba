import { NewsWizardService } from './../../services/wizard-service';
import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
    templateUrl: 'intro-page.html',
    styleUrls: ['intro-page.scss'],
    providers: [NewsWizardService]
})
export class IntroPage {

    data = {};

    constructor(
        private modalController: ModalController,
        public navCtrl: NavController,
        private service: NewsWizardService) {
        this.data = this.service.getNewsWizardData()
    }

     closeModal() {
         localStorage.setItem("SHOW_START_WIZARD", 'true');
        this.modalController.dismiss();
    }
}