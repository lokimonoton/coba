import { ConfigData } from 'src/app/services/config';
import { Component } from '@angular/core';
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];
  headerMenuItem = {}
  socialLink: any = {};

  rootPage: any = "HomePage";
  pages: Array<{ title: string, component: any, image: string, url: string }>;

  constructor(
    private oneSignal: OneSignal,
    private navController: NavController,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: "HomePage", image: "../../assets/icon/menu-home.png", url: "home" },
      { title: 'Category', component: "CategoryPage", image: "../../assets/icon/menu-category.png", url: "category" },
      { title: 'Bookmark', component: "BookmarkPage", image: "../../assets/icon/menu-bookmark.png", url: "bookmark" },
      { title: 'About', component: "AboutPage", image: "../../assets/icon/menu-about.png", url: "about" },
      { title: 'Settings', component: "settings", image: "../../assets/icon/menu-settings.png", url: "settings" },
    ];
  }

  initializeApp() {
    let self = this;
    self.socialLink = ConfigData.socialLink;
    self.platform.ready().then(() => {
      self.loadFromConfig()
      self.defaultLoad();
    });
  }

  loadFromConfig() {
    let isLoadedFromConfig = localStorage.getItem('isLoadedFromConfig');
    if (!isLoadedFromConfig) {
      let isRTLEnabled = localStorage.getItem('isRTLEnabled');
      let isLightColorSelected = localStorage.getItem('isLightColorSelected');
      let isPushNotificationEnabled = localStorage.getItem('isPushNotificationEnabled');
      if (!isRTLEnabled) {
        localStorage.setItem('isRTLEnabled', ConfigData.defualtValueForRTL + "")
      }
      if (!isLightColorSelected) {
        localStorage.setItem('isLightColorSelected', ConfigData.isLightColorSelected + "")
      }
      if (!isPushNotificationEnabled) {
        localStorage.setItem('isPushNotificationEnabled', ConfigData.defaultValueForPushNotification + "")
      }
      localStorage.setItem('isLoadedFromConfig', "true")
    }
  }

  defaultLoad() {
    if (localStorage.getItem('isRTLEnabled') == "true") {
      document.getElementsByTagName('ion-menu')[0].setAttribute('side', 'end');
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    }
    if (localStorage.getItem('isLightColorSelected')) {
      let isLightColorSelected = localStorage.getItem('isLightColorSelected') == "true";
      let theme = isLightColorSelected ? "light-themes" : "dark-themes";
      document.getElementsByTagName("body")[0].setAttribute("class", theme);
    }
    if (this.statusBar) {
      this.statusBar.styleBlackOpaque();
    }
    if (this.splashScreen) {
      this.splashScreen.hide();
    }
    if (ConfigData.oneSignal && ConfigData.oneSignal.appID && ConfigData.oneSignal.googleProjectId) {
      this.oneSignal.startInit(ConfigData.oneSignal.appID, ConfigData.oneSignal.googleProjectId)
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

      // this.oneSignal.handleNotificationReceived().subscribe(() => {
      //   // do something when notification is received
      //   //
      // });
      // this.oneSignal.handleNotificationOpened().subscribe(() => {
      //   // do something when a notification is opened
      // });
      this.oneSignal.endInit()
    }
    this.oneSignal.setSubscription(localStorage.getItem('isPushNotificationEnabled') == "true");
  }

  openPage(page) {
    this.navController.navigateForward([page.url], {});
  }
}
