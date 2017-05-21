var frameModule = require("ui/frame");

exports.pageLoaded = function() {

};

exports.logout = function() {
	var topmost = frameModule.topmost ();
    topmost.navigate("views/login/login");
};
