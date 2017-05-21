"use strict";
var application = require("application");
var image_source_1 = require("image-source");
var utils_1 = require("utils/utils");
var types_1 = require("utils/types");
var nativescript_sidedrawer_common_1 = require("./nativescript-sidedrawer.common");
var TnsSideDrawerClass = (function (_super) {
    __extends(TnsSideDrawerClass, _super);
    function TnsSideDrawerClass() {
        var _this = _super.apply(this, arguments) || this;
        _this.isBusy = false;
        _this.isOpen = false;
        return _this;
    }
    TnsSideDrawerClass.prototype.build = function (opts) {
        var _this = this;
        if (_super.prototype.build.call(this, opts)) {
            return;
        }
        this.logoImage = (types_1.isDefined(opts.logoImage)) ? opts.logoImage : TnsSideDrawerClass.getAppIcon();
        var activity = application.android.foregroundActivity;
        var profile = new com.mikepenz.materialdrawer.model.ProfileDrawerItem();
        profile.withIcon(this.logoImage.android);
        if (this.title) {
            profile.withName(this.title);
        }
        if (this.subtitle) {
            profile.withEmail(this.subtitle);
        }
        var bg = android.graphics.Bitmap.createBitmap(8, 8, android.graphics.Bitmap.Config.ARGB_8888);
        bg.eraseColor(this.headerBackgroundColor.android);
        var header = new com.mikepenz.materialdrawer.AccountHeaderBuilder();
        header.withActivity(activity);
        header.withHeaderBackground(new com.mikepenz.materialdrawer.holder.ImageHolder(bg));
        header.addProfiles([profile]);
        header.withSelectionListEnabledForSingleProfile(false);
        header.withProfileImagesClickable(false);
        var items = [];
        var i, len = this.templates.length;
        for (i = 0; i < len; i++) {
            var template = this.templates[i];
            var item = new com.mikepenz.materialdrawer.model.PrimaryDrawerItem();
            item.withIdentifier(i);
            if (template.androidIcon) {
                item.withIcon(utils_1.ad.resources.getDrawableId(template.androidIcon));
                item.withIconColor(this.textColor.android);
            }
            item.withName(template.title);
            item.withSelectable(false);
            item.withTextColor(this.textColor.android);
            items.push(item);
        }
        var drawer = new com.mikepenz.materialdrawer.DrawerBuilder();
        drawer.withActivity(activity);
        drawer.withAccountHeader(header.build());
        drawer.withSliderBackgroundColor(this.backgroundColor.android);
        drawer.addDrawerItems(items);
        drawer.withSelectedItem(-1);
        drawer.withOnDrawerItemClickListener(new com.mikepenz.materialdrawer.Drawer.OnDrawerItemClickListener({
            onItemClick: function (view, index, item) {
                index--;
                if (types_1.isDefined(_this.context)) {
                    _this.listener.apply(_this.context, [index]);
                }
                else {
                    _this.listener(index);
                }
                return false;
            },
        }));
        this.drawer = drawer.build();
    };
    TnsSideDrawerClass.prototype.toggle = function (force) {
        if (force == true) {
            this.drawer.openDrawer();
        }
        else if (force == false) {
            this.drawer.closeDrawer();
        }
        else {
            this.drawer.openDrawer();
        }
    };
    TnsSideDrawerClass.prototype.open = function () {
        this.toggle(true);
    };
    TnsSideDrawerClass.prototype.close = function () {
        this.toggle(false);
    };
    TnsSideDrawerClass.prototype.addGesture = function () { };
    TnsSideDrawerClass.prototype.removeGesture = function () { };
    TnsSideDrawerClass.getAppIcon = function () {
        var nativeApp = application.android.nativeApp;
        var bundle = nativeApp.getPackageName();
        var drawable = nativeApp.getPackageManager().getApplicationIcon(bundle);
        return image_source_1.fromNativeSource(drawable);
    };
    return TnsSideDrawerClass;
}(nativescript_sidedrawer_common_1.TnsSideDrawerCommonClass));
exports.TnsSideDrawerClass = TnsSideDrawerClass;
exports.TnsSideDrawer = new TnsSideDrawerClass();
//# sourceMappingURL=nativescript-sidedrawer.js.map