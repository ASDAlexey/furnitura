var CartService = (function () {
    function CartService($http, $q) {
        this.$http = $http;
        this.$q = $q;
        this.products = [];
    }
    CartService.prototype.getDiscount = function (discount_code, url, method) {
        var defer = this.$q.defer();
        this.$http[method]("" + url, { discount_code: discount_code }).then(function (data) {
            defer.resolve(data.data);
        }).catch(function (e) {
            defer.reject(e);
        });
        return defer.promise;
    };
    CartService.$inject = ["$http", "$q"];
    return CartService;
})();
angular.module('App.product.services', []).service("CartService", CartService);
//# sourceMappingURL=services.js.map