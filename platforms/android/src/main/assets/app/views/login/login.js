var frameModule = require("ui/frame");

exports.loaded = function() {

};

exports.connect = function() {
	var topmost = frameModule.topmost();
    topmost.navigate("views/main/main");
};

