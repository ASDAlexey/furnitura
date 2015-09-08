declare var angular:any;
declare var _:any;
interface IFormAuthModel {
    dataForm:{};
    send(dataForm:{}, formValidate:{}, action:string, form:string):void;
    form_set_dirty(form:{}):void;
    action:string;
}
interface IFormModel {
    dataForm:{
        data:{
            address_cart:any[];
        },
        hidden:{}
    };
    send(dataForm:{}, formValidate:{}, action:string, form:string):void;
    addAddress(address_cart, address_count):void;
    form_set_pristine(form:{}):void;
    form_set_dirty(form:{}):void;
    action:string;
    address_count:number;
}
interface IFilterModel {
    dataForm:{};
    //send(dataForm:{}, formValidate:{}, action:string, form:string):void;
    //form_set_dirty(form:{}):void;
    action:string;
}
class FormAuthCtrl implements IFormAuthModel {
    dataForm:{};
    action:string;

    constructor() {
        this.dataForm = {};
    }

    form_set_dirty(form) {
        if (form.$setDirty) {
            form.$setDirty();
            return angular.forEach(form, function (input, key) {
                if (typeof input === 'object' && input.$name !== undefined) {
                    return form[input.$name].$setViewValue((form[input.$name].$viewValue !== undefined ? form[input.$name].$viewValue : ""));
                }
            });
        }
    }

    send(dataForm:{}, formValidate, action:string, form:string):void {
        if (formValidate.$valid) {
            angular.element(document.getElementById(form))[0].submit();
        } else {
            this.form_set_dirty(formValidate);
        }
    }
}
class FilterCtrl implements IFilterModel {
    dataForm:{};
    action:string;

    constructor() {
        this.dataForm = {};
    }

    form_set_dirty(form) {
        if (form.$setDirty) {
            form.$setDirty();
            return angular.forEach(form, function (input, key) {
                if (typeof input === 'object' && input.$name !== undefined) {
                    return form[input.$name].$setViewValue((form[input.$name].$viewValue !== undefined ? form[input.$name].$viewValue : ""));
                }
            });
        }
    }

    send(dataForm:{}, formValidate, action:string, form:string):void {
        if (formValidate.$valid) {
            angular.element(document.getElementById(form))[0].submit();
        } else {
            this.form_set_dirty(formValidate);
        }
    }
}
export class FormCtrl implements IFormModel {
    dataForm:{
        data:{
            address_cart:any[];
        },
        hidden:{}
    };
    action:string;
    address_count:number;
    private httpService:ng.IHttpService;

    static $inject = ["$rootScope", "$timeout", "$http"];

    constructor(private $rootScope, private $timeout, $http:ng.IHttpService) {
        this.httpService = $http;
        this.address_count = 1;
        this.dataForm = {
            data: {
                address_cart: [
                    {
                        "name": "address_cart1",
                        "value": ""
                    }
                ]
            },
            hidden: {}
        };
        $rootScope.hideThank = ()=> {
            return $rootScope.formIsValide = false;
        };
    }

    form_set_pristine(form) {
        if (form.$setPristine) {
            return form.$setPristine();
        }
    }

    form_set_dirty(form) {
        if (form.$setDirty) {
            form.$setDirty();
            angular.forEach(form, function (input, key) {
                if (typeof input === 'object' && input.$name !== undefined) {
                    return form[input.$name].$setViewValue((form[input.$name].$viewValue !== undefined ? form[input.$name].$viewValue : ""));
                }
            });
        }
    }

    thanksShowTime() {
        this.$rootScope.formIsValide = true;
        this.$timeout(()=> {
            this.$rootScope.hideThank();
        }, 2000);
    }

    clear(formValidate) {
        this.dataForm.data = {};
        this.dataForm = {
            data: {
                address_cart: [
                    {
                        "name": "address_cart1",
                        "value": ""
                    }
                ]
            },
            hidden: {}
        };
        this.form_set_pristine(formValidate);
    }


    sendData(sendOptions) {
        this.httpService({
            url: sendOptions.action,
            method: sendOptions.method,
            data: sendOptions.data
        }).then(function () {
            this.clear(sendOptions.formValidate);
        });
    }

    send(dataForm:{}, formValidate, action:string) {
        var sendOptions;
        if (formValidate.$valid) {
            this.thanksShowTime();
            sendOptions = {
                formValidate: formValidate,
                action: action,
                method: "POST",
                data: angular.copy(dataForm)
            };
            if (angular.element(document.getElementById('form-cart')).length) {
                angular.element(document.getElementById('form-cart'))[0].submit()
            } else {
                this.sendData(sendOptions);
                this.clear(formValidate);
            }
        } else {
            this.form_set_dirty(formValidate);
        }
    }

    addAddress(address_cart, address_count):void {
        this.address_count++;
        let obj = {};
        obj['name'] = address_cart + (address_count + 1);
        obj['value'] = "";
        this.dataForm.data.address_cart.push(obj);
    }
}
angular.module("App")
    .controller("App.form.FormAuthCtrl", FormAuthCtrl)
    .controller("App.form.FormCtrl", FormCtrl)
    //.controller("App.form.FilterCtrl", FilterBlockCtrl);
    .controller("App.FilterCtrl", FilterCtrl);



