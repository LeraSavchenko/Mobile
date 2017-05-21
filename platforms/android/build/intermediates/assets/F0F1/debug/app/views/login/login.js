var frameModule = require("ui/frame");
var clientId = 'b4b2f6557d644ed88a6b3e53f51a6902';
var reidrectUri = 'https://github.com/LeraSavchenko/Mobile';
var secret = 'de7d9ef653e04eb9bf4d86be0c209898';

exports.loaded = function() {
	console.log('ASDASDASDASDSADASDAS')
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
