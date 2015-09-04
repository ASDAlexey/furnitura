declare var angular:any;
class onlyIntNumbers {
    restrict = 'A';
    link = (scope, element, attrs:ng.IAttributes) => {
        element[0].addEventListener('keydown', ((event)=> {
                if (event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 27 || (event.keyCode === 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
                    return;
                } else {
                    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                        event.preventDefault();
                    }
                }
            })
        );
    }
}
class countProductsCtrl {
    quantity:number;
    static $inject = ['$scope'];

    constructor(public $scope) {
        $scope.changeQuantity = this.changeQuantity;
    }

    changeQuantity(change:number):void {
        if (change == 1) {
            this.quantity++;
        } else if (change == -1) {
            if (this.quantity > 1) {
                this.quantity--;
            }
        }
    }
}
class countProducts implements ng.IDirective {
    //Directive settings
    restrict:string = 'E';
    transclude:boolean = true;
    template = require("./templates/count-product.jade");
    scope:any = {
        quantity: "=",
        isShowFreeShipping:"@"
    };
    replace:boolean = true;
    controller:any = countProductsCtrl;

    constructor() {
    }

    link:ng.IDirectiveLinkFn = (scope:ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes, ctrls, transludeFn) => {

    };

    static factory():ng.IDirectiveFactory {
        var directive:ng.IDirectiveFactory = () =>
            new countProducts();
        return directive;
    }
}
angular.module('App.product.directives', [])
    .directive('onlyIntNumbers', () => {
        return new onlyIntNumbers();
    })
    .directive('countProducts', () => {
        return new countProducts();
    });