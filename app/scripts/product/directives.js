var onlyIntNumbers = (function () {
    function onlyIntNumbers() {
        this.restrict = 'A';
        this.link = function (scope, element, attrs) {
            element[0].addEventListener('keydown', (function (event) {
                if (event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 27 || (event.keyCode === 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
                    return;
                }
                else {
                    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                        event.preventDefault();
                    }
                }
            }));
        };
    }
    return onlyIntNumbers;
})();
var countProductsCtrl = (function () {
    function countProductsCtrl($scope) {
        this.$scope = $scope;
        $scope.changeQuantity = this.changeQuantity;
    }
    countProductsCtrl.prototype.changeQuantity = function (change) {
        if (change == 1) {
            this.quantity++;
        }
        else if (change == -1) {
            if (this.quantity > 1) {
                this.quantity--;
            }
        }
    };
    countProductsCtrl.$inject = ['$scope'];
    return countProductsCtrl;
})();
var countProducts = (function () {
    function countProducts() {
        //Directive settings
        this.restrict = 'E';
        this.transclude = true;
        this.template = require("./templates/count-product.jade");
        this.scope = {
            quantity: "=",
            isShowFreeShipping: "@"
        };
        this.replace = true;
        this.controller = countProductsCtrl;
        this.link = function (scope, element, attrs, ctrls, transludeFn) {
        };
    }
    countProducts.factory = function () {
        var directive = function () {
            return new countProducts();
        };
        return directive;
    };
    return countProducts;
})();
angular.module('App.product.directives', [])
    .directive('onlyIntNumbers', function () {
    return new onlyIntNumbers();
})
    .directive('countProducts', function () {
    return new countProducts();
});
//# sourceMappingURL=directives.js.map