import { Component } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html',
  styleUrls: ['settings.scss']
})
export class SettingsPage {

  isLightColorSelected: Boolean = true;
  isPushNotificationEnabled: boolean = false;
  isRTLEnabled: Boolean = false;

  constructor(private oneSignal: OneSignal, private file: File) {
    this.isPushNotificationEnabled = localStorage.getItem('isPushNotificationEnabled') == "true";
    this.isRTLEnabled = localStorage.getItem('isRTLEnabled') == "true";
  }

  ionChangeSelectedTheme(e) {
    localStorage.setItem('isLightColorSelected', this.isLightColorSelected + "");
    let theme = this.isLightColorSelected ? "colorLight" : "colorDark";
    document.getElementsByTagName("body")[0].setAttribute("class", theme);
  }

  //Enable/Disable push notification OneSignal
  ionChange(e) {
    this.oneSignal.setSubscription(this.isPushNotificationEnabled);
    localStorage.setItem('isPushNotificationEnabled', "" + this.isPushNotificationEnabled);
    if (this.isPushNotificationEnabled) {
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    } else {
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
    }
    this.oneSignal.endInit();
  }

  ionChangeRTL(e) {
    localStorage.setItem('isRTLEnabled', "" + this.isRTLEnabled)
    document.getElementsByTagName('ion-menu')[0]
      .setAttribute('side', this.isRTLEnabled ? 'end' : 'start');
    document.getElementsByTagName('html')[0]
      .setAttribute('dir', this.isRTLEnabled ? 'rtl' : 'ltr');
  }

  changeTheme(name) {
    if (name) {
      document.body.removeAttribute("class");
      document.body.classList.add(name);
    }
  }
}
