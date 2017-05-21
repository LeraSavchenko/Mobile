"use strict";
var color_1 = require("color");
var types_1 = require("utils/types");
var TnsSideDrawerCommonClass = (function () {
    function TnsSideDrawerCommonClass() {
        this.textColor = new color_1.Color('white');
        this.headerBackgroundColor = new color_1.Color('#343C45');
        this.backgroundColor = new color_1.Color('#556270');
    }
    TnsSideDrawerCommonClass.prototype.build = function (opts) {
        if (TnsSideDrawerCommonClass.isBuilt == true) {
            console.warn('TnsSideDrawer.isBuilt == true\nyouve already built a sidedrawer');
            return true;
        }
        TnsSideDrawerCommonClass.isBuilt = true;
        this.templates = opts.templates;
        this.listener = opts.listener;
        if (types_1.isDefined(opts.context)) {
            this.context = opts.context;
        }
        if (types_1.isDefined(opts.textColor)) {
            this.textColor = opts.textColor;
        }
        if (types_1.isDefined(opts.headerBackgroundColor)) {
            this.headerBackgroundColor = opts.headerBackgroundColor;
        }
        if (types_1.isDefined(opts.backgroundColor)) {
            this.backgroundColor = opts.backgroundColor;
        }
        if (types_1.isDefined(opts.title)) {
            this.title = opts.title;
        }
        if (types_1.isDefined(opts.subtitle)) {
            this.subtitle = opts.subtitle;
        }
        return false;
    };
    return TnsSideDrawerCommonClass;
}());
TnsSideDrawerCommonClass.isBuilt = false;
exports.TnsSideDrawerCommonClass = TnsSideDrawerCommonClass;
//# sourceMappingURL=nativescript-sidedrawer.common.js.map