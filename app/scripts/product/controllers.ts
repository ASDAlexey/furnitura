declare var angular:any;
declare var _:any;
interface IproductDetailModel {
    //blurSearch(search:string):void;
    dataForm:{
        quantity:number,
        price:{
            usd:number
            cad:number
        },
        discount:{
            usd:number
            cad:number
        }
    };
    getDiscount(price:number, discount:number):number
    getTotalPrice(unit_price:number, quantity:number):number
    getTotalDiscount(unit_discount:number, quantity:number):number
}
class ProductDetail implements IproductDetailModel {
    dataForm:{
        quantity:number;
        price:{
            usd:number
            cad:number
        },
        discount:{
            usd:number
            cad:number
        }
    };
    static $inject = ["$scope"];

    constructor(private $scope) {
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
        }), (newVal)=> {
            if (!newVal) {
                this.dataForm.quantity = 1;
            }
        });
    }

    getDiscount(price:number, discount:number):number {
        return price * discount;
    }

    getTotalPrice(unit_price:number, quantity:number):number {
        return unit_price * quantity;
    }

    getTotalDiscount(unit_discount:number, quantity:number):number {
        return unit_discount * quantity;
    }

}
interface IMiniCartModel {
    products:any[];
    getCount(products:{}):void
    setProducts(product:{}):void
}
class MiniCartCtrl implements IMiniCartModel {
    products:any[];
    static $inject = ["$scope", "CartService"];

    constructor(private $scope, private CartService) {
        this.products = CartService.products;
    }

    setProducts(products:any) {
        this.CartService.products = products;
    }

    getCount(products:{}) {
        return _.sum(this.CartService.products, function (object) {
            return object.quantity;
        });
    }
}
interface ICartModel {
    products:any[];
    discount_code:string;
    discount_rate:number;
    step:number;
    remove(product:any):void;
    subSum(products:any[], currency:string):void;
    totalSum(products:any[], currency:string, discount_rate:number):void;
    getDiscount(discount_code:string, url:string, method:string):void;
    setStep(step:number):void;
}
class CartCtrl implements ICartModel {
    products:any[];
    discount_code:string;
    discount_rate:number;
    step:number;

    static $inject = ["$scope", "CartService"];

    constructor(private $scope, private CartService) {

    }

    remove(product:any) {
        this.CartService.products = _.without(this.CartService.products, product);
    }

    subSum(products, currency) {
        if(products.length) {
            return _.sum(products, function (object) {
                return object[currency] * object.quantity;
            });
        }else{
            return 0
        }
    }

    totalSum(products, currency:string, discount_rate:number) {
        let sum;
        sum = _.sum(products, function (object) {
            return object[currency] * object.quantity;
        });
        return sum * (1 - discount_rate);
    }

    getDiscount(discount_code, url, method) {
        this.CartService.getDiscount(discount_code, url, method).then((data)=> {
            this.discount_rate = data.discount;
        });
    }

    setStep(step:number) {
        this.step = step;
    }
}
angular.module('App.product.controllers', [])
    .controller("MiniCartCtrl", MiniCartCtrl)
    .controller("CartCtrl", CartCtrl)
    .controller("ProductDetail", ProductDetail);