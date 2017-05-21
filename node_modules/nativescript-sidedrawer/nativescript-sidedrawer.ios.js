"use strict";
var application = require("application");
var color_1 = require("color");
var platform_1 = require("platform");
var gestures_1 = require("ui/gestures");
var frame_1 = require("ui/frame");
var label_1 = require("ui/label");
var list_view_1 = require("ui/list-view");
var image_1 = require("ui/image");
var image_source_1 = require("image-source");
var animation_1 = require("ui/animation");
var enums_1 = require("ui/enums");
var utils_1 = require("ui/utils");
var absolute_layout_1 = require("ui/layouts/absolute-layout");
var dock_layout_1 = require("ui/layouts/dock-layout");
var stack_layout_1 = require("ui/layouts/stack-layout");
var types_1 = require("utils/types");
var nativescript_sidedrawer_common_1 = require("./nativescript-sidedrawer.common");
var TnsSideDrawerClass = (function (_super) {
    __extends(TnsSideDrawerClass, _super);
    function TnsSideDrawerClass() {
        var _this = _super.apply(this, arguments) || this;
        _this.width = 250;
        _this.isBusy = false;
        _this.origin = 0;
        _this.isOpen = false;
        return _this;
    }
    TnsSideDrawerClass.prototype.build = function (opts) {
        var _this = this;
        if (_super.prototype.build.call(this, opts)) {
            return;
        }
        this.logoImage = (types_1.isDefined(opts.logoImage)) ? opts.logoImage : TnsSideDrawerClass.getAppIcon();
        var width = platform_1.screen.mainScreen.widthDIPs;
        var height = platform_1.screen.mainScreen.heightDIPs;
        this.backdrop = new absolute_layout_1.AbsoluteLayout();
        this.backdrop.backgroundColor = new color_1.Color(50, 0, 0, 0);
        this.backdrop.opacity = 0;
        this.backdrop.layout(0, 0, width, height);
        this.backdrop.onLoaded();
        this.backdrop.on(gestures_1.GestureTypes.touch, function (args) {
            if (args.action == gestures_1.TouchAction.down) {
                _this.toggle(false);
            }
        });
        this.stack = new dock_layout_1.DockLayout();
        this.stack.backgroundColor = this.headerBackgroundColor;
        this.stack.translateX = -this.width;
        this.stack.opacity = 0;
        var topstack = new stack_layout_1.StackLayout();
        var image = new image_1.Image();
        image.src = this.logoImage;
        var statusHeight = utils_1.ios.getStatusBarHeight();
        image.margin = (statusHeight + 10) + ' 0 10 10';
        image.horizontalAlignment = 'left';
        topstack.addChild(image);
        var title = new label_1.Label();
        title.text = this.title;
        title.color = this.textColor;
        title.fontSize = 20;
        title.style.fontWeight = 'bold';
        title.textAlignment = 'left';
        title.margin = '0 0 10 10';
        topstack.addChild(title);
        if (this.subtitle) {
            title.marginBottom = 0;
            var subtitle = new label_1.Label();
            subtitle.text = this.subtitle;
            subtitle.color = this.textColor;
            subtitle.fontSize = 14;
            subtitle.textAlignment = 'left';
            subtitle.margin = '0 0 10 10';
            topstack.addChild(subtitle);
        }
        dock_layout_1.DockLayout.setDock(topstack, enums_1.Dock.top);
        this.stack.addChild(topstack);
        var listview = new list_view_1.ListView();
        listview.backgroundColor = this.backgroundColor;
        var uitable = listview.ios;
        uitable.separatorStyle = 0;
        uitable.alwaysBounceVertical = false;
        listview.items = this.templates;
        listview.onLoaded();
        listview.on(list_view_1.ListView.itemLoadingEvent, function (args) {
            if (!args.view) {
                var cell = args.ios;
                cell.selectionStyle = 2;
                cell.backgroundColor = _this.backgroundColor.ios;
                var template = _this.templates[args.index];
                var stack = new stack_layout_1.StackLayout();
                stack.orientation = 'horizontal';
                stack.margin = '5 0';
                if (template.iosIcon) {
                    var icon = new image_1.Image();
                    icon.src = image_source_1.fromResource(template.iosIcon);
                    icon.width = 32;
                    icon.marginLeft = 5;
                    stack.addChild(icon);
                }
                var title_1 = new label_1.Label();
                title_1.text = template.title;
                title_1.marginLeft = 15;
                title_1.style.textAlignment = 'left';
                title_1.style.fontSize = 16;
                title_1.color = _this.textColor;
                stack.addChild(title_1);
                args.view = stack;
            }
        });
        listview.on(list_view_1.ListView.itemTapEvent, function (args) {
            var index = args.index;
            if (types_1.isDefined(_this.context)) {
                _this.listener.apply(_this.context, [index]);
            }
            else {
                _this.listener(index);
            }
            _this.toggle(false);
        });
        this.stack.addChild(listview);
        this.stack.eachLayoutChild(function (view) {
            view.measure(null, null);
        });
        this.stack.onLoaded();
        this.stack.on(gestures_1.GestureTypes.pan, function (args) {
            var view = args.view;
            if (args.state == gestures_1.GestureStateTypes.began) {
                _this.origin = view.translateX;
            }
            var x = TnsSideDrawerClass.math_clamp(args.deltaX, -_this.width, 0);
            view.translateX = x;
            if (args.state == gestures_1.GestureStateTypes.ended) {
                if (x < -50) {
                    _this.toggle(false, x + _this.width);
                }
                else {
                    view.animate({
                        curve: enums_1.AnimationCurve.easeOut,
                        translate: { x: 0, y: 0 },
                        duration: x + _this.width,
                    });
                }
            }
        });
        this.stack.layout(0, 0, this.width, height);
        var rootCtrl = application.ios.rootController;
        rootCtrl.view.addSubview(this.backdrop.ios);
        rootCtrl.view.addSubview(this.stack.ios);
        var page = frame_1.topmost().currentPage;
        this.addGesture(page);
    };
    TnsSideDrawerClass.prototype.toggle = function (force, duration) {
        var _this = this;
        if (duration === void 0) { duration = this.width; }
        if (this.isBusy == true) {
            console.log('this.isBusy == true', this.isBusy == true);
            return;
        }
        this.isBusy = true;
        if (types_1.isDefined(force)) {
            this.isOpen = !force;
        }
        var x = (this.isOpen == false) ? 0 : -this.width;
        var opacity = (this.isOpen == false) ? 1 : 0;
        var curve = (this.isOpen == false) ? enums_1.AnimationCurve.easeOut : enums_1.AnimationCurve.easeIn;
        this.isOpen = !this.isOpen;
        var anims = [{
                target: this.backdrop,
                opacity: opacity,
                curve: curve,
                duration: duration,
            }, {
                target: this.stack,
                translate: { x: x, y: 0 },
                opacity: opacity,
                curve: curve,
                duration: duration,
            }];
        new animation_1.Animation(anims).play().then(function () {
            _this.isBusy = false;
        }).catch(function (error) {
            _this.isBusy = false;
        });
    };
    TnsSideDrawerClass.prototype.open = function () {
        this.toggle(true);
    };
    TnsSideDrawerClass.prototype.close = function () {
        this.toggle(false);
    };
    TnsSideDrawerClass.prototype.addGesture = function (page) {
        var _this = this;
        if (!this.stack) {
            console.warn('TnsSideDrawer.addGesture > !this.stack');
            return;
        }
        page.content.on(gestures_1.GestureTypes.pan, function (args) {
            if (args.state == gestures_1.GestureStateTypes.began) {
                var gest = args.ios;
                var loc = gest.locationInView(args.view.ios);
                TnsSideDrawerClass.ignorePan = (loc.x > 25) ? true : false;
                if (TnsSideDrawerClass.ignorePan == false) {
                    _this.stack.opacity = 1;
                }
            }
            if (TnsSideDrawerClass.ignorePan == true) {
                return;
            }
            var x = TnsSideDrawerClass.math_clamp(-_this.width + args.deltaX, -_this.width, 0);
            _this.stack.translateX = x;
            if (args.state == gestures_1.GestureStateTypes.ended) {
                if (x > -200) {
                    _this.toggle(true, x + _this.width);
                }
                else {
                    _this.stack.animate({
                        curve: enums_1.AnimationCurve.easeOut,
                        translate: { x: -_this.width, y: 0 },
                        duration: x + _this.width,
                    });
                }
            }
        });
    };
    TnsSideDrawerClass.prototype.removeGesture = function (page) {
        page.content.off(gestures_1.GestureTypes.pan);
    };
    TnsSideDrawerClass.getAppIcon = function () {
        var plist = NSBundle.mainBundle.infoDictionary;
        var icon = plist.valueForKeyPath('CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles');
        var uiicon = UIImage.imageNamed(icon.lastObject);
        return image_source_1.fromNativeSource(uiicon);
    };
    TnsSideDrawerClass.math_clamp = function (x, a, b) {
        return Math.min(Math.max(x, a), b);
    };
    return TnsSideDrawerClass;
}(nativescript_sidedrawer_common_1.TnsSideDrawerCommonClass));
TnsSideDrawerClass.ignorePan = false;
exports.TnsSideDrawerClass = TnsSideDrawerClass;
exports.TnsSideDrawer = new TnsSideDrawerClass();
//# sourceMappingURL=nativescript-sidedrawer.ios.js.map