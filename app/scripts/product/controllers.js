var ProductDetail = (function () {
    function ProductDetail($scope) {
        var _this = this;
        this.$scope = $scope;
        this.dataForm = {
            quantity: 1,
            price: {
                usd: 0,
                cad: 0
            },
            discount: {
                usd: 0,
                cad: 0
            }
        };
        $scope.$watch(angular.bind(this, function (name) {
            return this.dataForm.quantity;
        }), function (newVal) {
            if (!newVal) {
                _this.dataForm.quantity = 1;
            }
        });
    }
    ProductDetail.prototype.getDiscount = function (price, discount) {
        return price * discount;
    };
    ProductDetail.prototype.getTotalPrice = function (unit_price, quantity) {
        return unit_price * quantity;
    };
    ProductDetail.prototype.getTotalDiscount = function (unit_discount, quantity) {
        return unit_discount * quantity;
    };
    ProductDetail.$inject = ["$scope"];
    return ProductDetail;
})();
var MiniCartCtrl = (function () {
    function MiniCartCtrl($scope, CartService) {
        this.$scope = $scope;
        this.CartService = CartService;
        this.products = CartService.products;
    }
    MiniCartCtrl.prototype.setProducts = function (products) {
        this.CartService.products = products;
    };
    MiniCartCtrl.prototype.getCount = function (products) {
        return _.sum(this.CartService.products, function (object) {
            return object.quantity;
        });
    };
    MiniCartCtrl.$inject = ["$scope", "CartService"];
    return MiniCartCtrl;
})();
var CartCtrl = (function () {
    function CartCtrl($scope, CartService) {
        this.$scope = $scope;
        this.CartService = CartService;
    }
    CartCtrl.prototype.remove = function (product) {
        this.CartService.products = _.without(this.CartService.products, product);
    };
    CartCtrl.prototype.subSum = function (products, currency) {
        if (products.length) {
            return _.sum(products, function (object) {
                return object[currency] * object.quantity;
            });
        }
        else {
            return 0;
        }
    };
    CartCtrl.prototype.totalSum = function (products, currency, discount_rate) {
        var sum;
        sum = _.sum(products, function (object) {
            return object[currency] * object.quantity;
        });
        return sum * (1 - discount_rate);
    };
    CartCtrl.prototype.getDiscount = function (discount_code, url, method) {
        var _this = this;
        this.CartService.getDiscount(discount_code, url, method).then(function (data) {
            _this.discount_rate = data.discount;
        });
    };
    CartCtrl.prototype.setStep = function (step) {
        this.step = step;
    };
    CartCtrl.$inject = ["$scope", "CartService"];
    return CartCtrl;
})();
angular.module('App.product.controllers', [])
    .controller("MiniCartCtrl", MiniCartCtrl)
    .controller("CartCtrl", CartCtrl)
    .controller("ProductDetail", ProductDetail);
//# sourceMappingURL=controllers.js.map