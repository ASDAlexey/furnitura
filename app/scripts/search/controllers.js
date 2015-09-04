var SearchCtrl = (function () {
    function SearchCtrl() {
        this.isShowSearch = false;
        this.dataForm = {
            search: ''
        };
    }
    SearchCtrl.prototype.blurSearch = function (search) {
        if (!search)
            this.isShowSearch = false;
    };
    SearchCtrl.prototype.resetSearch = function () {
        this.dataForm.search = '';
        this.blurSearch('');
    };
    return SearchCtrl;
})();
angular.module("App.search", []).controller("SearchCtrl", SearchCtrl);
//# sourceMappingURL=controllers.js.map