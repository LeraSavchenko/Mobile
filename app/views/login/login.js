var frameModule = require("ui/frame");
var clientId = 'b4b2f6557d644ed88a6b3e53f51a6902';
var reidrectUri = 'https://github.com/LeraSavchenko/Mobile';
var secret = 'de7d9ef653e04eb9bf4d86be0c209898';

var TnsSideDrawer = require('nativescript-sidedrawer');

exports.loaded = function() {
	console.log('ASDASDASDASDSADASDAS');

	console.dir(TnsSideDrawer);
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

exports.redirect = function() {
	uri = 'https://api.instagram.com/oauth/authorize/?client_id=' + clientId +
	'&redirect_uri=' + reidrectUri + '&response_type=token';
	accessToken = '2322571499.b4b2f65.87f8ac668e764e2781ea1e91c9975879';

	console.log("BEFORE INSTAGRAM!!!!!");
	var SocialShare = require("nativescript-social-share");
	var imageSourceModule = require("image-source");

	console.dir(imageSourceModule);

	var image = imageSourceModule.fromFile('~/images/1.jpg');
	console.log(image);
	SocialShare.shareImage(image);

};

exports.connect = function() {
	var topmost = frameModule.topmost	();
    topmost.navigate("views/main/main");
};
