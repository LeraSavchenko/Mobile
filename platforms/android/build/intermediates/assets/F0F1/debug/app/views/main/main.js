var TnsSideDrawer = require('nativescript-sidedrawer');

exports.pageLoaded = function() {
  TnsSideDrawer.build({
    templates: [{
        title: 'Home',
        androidIcon: 'ic_home_white_24dp',
        iosIcon: 'ic_home_white',
    }, {
        title: 'Judgment Day',
        androidIcon: 'ic_gavel_white_24dp',
        iosIcon: 'ic_gavel_white',
    }, {
        title: 'Bank Roll',
        androidIcon: 'ic_account_balance_white_24dp',
        iosIcon: 'ic_account_balance_white',
    }, {
        title: 'Fix Stuff',
        androidIcon: 'ic_build_white_24dp',
        iosIcon: 'ic_build_white',
    }, {
        title: 'This Is Me',
        androidIcon: 'ic_account_circle_white_24dp',
        iosIcon: 'ic_account_circle_white',
    }],
    title: 'This App Name',
    subtitle: 'is just as awesome as this subtitle!',
    listener: (index) => {
        this.i = index
    },
    context: this,
  })

  TnsSideDrawer.toggle()
};
