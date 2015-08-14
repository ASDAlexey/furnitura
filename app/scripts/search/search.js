var app;
(function (app) {
    var search;
    (function (search_1) {
        var SearchCtrl = (function () {
            function SearchCtrl() {
                this.isShowSearch = false;
            }
            SearchCtrl.prototype.toggleSearch = function () {
                this.isShowSearch = !this.isShowSearch;
            };
            SearchCtrl.prototype.blurSearch = function (search) {
                if (!search)
                    this.isShowSearch = false;
            };
            SearchCtrl.prototype.resetSearch = function () {
                this.dataForm.search = '';
            };
            return SearchCtrl;
        })();
        angular.module("App").controller("SearchCtrl", SearchCtrl);
    })(search = app.search || (app.search = {}));
})(app || (app = {}));
//# sourceMappingURL=search.js.map