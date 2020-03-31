export const ConfigData = {

  // DEFINE YOUR URL
  'rootUrl': 'https://deconews.decouikit.com/wp-json/wp/v2/',

  // enableExcludeFromMenu SET TO true TO ENABLE excudeFromMenu
  //if want to exclude from menu your category set value FALSE
  //all category enter with lower case

  // SOCIAL NETWORK
  'socialLink': {
    'facebook': 'https://www.facebook.com',
    'twitter': 'https://twitter.com',
    'youtube': 'https://www.youtube.com/',
    'instagram': 'https://www.instagram.com'
  },


  // SHOW ALL YOUR CATEGORIES ( TRUE - display all category )
  'isExcludeCategoryEnabled': true,

  'excludeFromMenu': {
    // 'travel': true,
  },

  'includeFromMenu': {
    //'travel': true
  },


  // INTRO PAGE IN APP ( TRUE - slider is enable)
  'introData': true,

  // SETTINGS PARAMS fOR ONE SIGNAL
  'oneSignal': {
    "appID": "94ca9005-8bfe-1234-5678-d9b74be573f4",
    "googleProjectId": "123456789012"
  },


  // ENABLE OR DISABLE PUSH NOTIFICATION
  'defaultValueForPushNotification': true,


  // SETTINGS DEFAUTL COLOR COMBINATION (Is set Light color combination)
  'isLightColorSelected': true,


  // SETTINGS RTL ( FALSE - is not set rtl default  )
  'defualtValueForRTL': false,


  // SETTINGS FEATURES POTS TO SLIDER (FALSE - slider is enable)
  'isFeaturesPostsGetFromSticky': false,


  // SLIDER NUMBER BUT IT IS NOT STICKY ( isFeaturesPostsGetFromSticky:FALSE)
  'numberOfItemForSlider': 3,

  // SETTINGS NUMBER POSTS ON CATEGORY
  'numberOfItemPerPage': 30,

  'isCacheCategoryEnabled': false,  
  'cacheExpiredTime': 24 * 60 * 60 * 1000, //24H
  

    
  //ADS
  'bannerAds': {
    'enable': true,
    'config': {
      'id': '',
      'isTesting': true,
      'autoShow': true
    }
  },

  // How to set time open ADS page
  'interstitialAds': {
    'showAdsAfterXPosts': 10,
    'enable': true,
    'config': {
      'id': '',
      'isTesting': true,
      'autoShow': true
    }
  }
}