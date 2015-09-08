var app;
(function (app) {
    var form;
    (function (form) {
        var GMapCtrl = (function () {
            function GMapCtrl() {
                this.map = {};
                this.options = {
                    scrollwheel: false
                };
            }
            return GMapCtrl;
        })();
        form.GMapCtrl = GMapCtrl;
        angular.module("App")
            .controller("App.map.GMapCtrl", GMapCtrl);
    })(form = app.form || (app.form = {}));
})(app || (app = {}));
//# sourceMappingURL=controllers.js.map