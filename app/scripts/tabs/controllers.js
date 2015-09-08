var app;
(function (app) {
    var form;
    (function (form) {
        var TabCtrl = (function () {
            function TabCtrl() {
                this.currentTab = 0;
            }
            TabCtrl.prototype.switchTab = function (index) {
                this.currentTab = index;
            };
            return TabCtrl;
        })();
        form.TabCtrl = TabCtrl;
        angular.module("App").controller("App.tabs.TabCtrl", TabCtrl);
    })(form = app.form || (app.form = {}));
})(app || (app = {}));
//# sourceMappingURL=controllers.js.map