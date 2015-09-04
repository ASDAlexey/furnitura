declare var angular:any;
declare var _:any;
interface ICartService {
    //get(str:string):void;
    products:any[]
}

class CartService implements ICartService {
    products:any[];

    static $inject = ["$http", "$q"];

    constructor(private $http, private $q) {
        this.products = [];
    }

    getDiscount(discount_code, url, method) {
        var defer = this.$q.defer();
        this.$http[method](`${url}`, {discount_code: discount_code}).then(function (data) {
            defer.resolve(data.data);
        }).catch((e)=> {
            defer.reject(e);
        });
        return defer.promise;
    }

}
angular.module('App.product.services', []).service("CartService", CartService);

