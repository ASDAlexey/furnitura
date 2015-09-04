declare var angular:any;
interface IFormAuthModel {
    dataForm:{};
    send(dataForm:{}, formValidate:{}, action:string, form:string):void;
    form_set_dirty(form:{}):void;
    action:string;
}
interface IFormModel {
    dataForm:{
        data:{},
        hidden:{}
    };
    send(dataForm:{}, formValidate:{}, action:string, form:string):void;
    form_set_pristine(form:{}):void;
    form_set_dirty(form:{}):void;
    action:string;
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
export class FilterCtrl implements IFilterModel {
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
        console.log('snedForm');
        if (formValidate.$valid) {
            angular.element(document.getElementById(form))[0].submit();
        } else {
            console.log('valid');
            this.form_set_dirty(formValidate);
        }
    }
}
export class FormCtrl implements IFormModel {
    dataForm:{
        data:{},
        hidden:{}
    };
    action:string;
    private httpService:ng.IHttpService;

    static $inject = ["$rootScope", "$timeout", "$http"];

    constructor(private $rootScope, private $timeout, $http:ng.IHttpService) {
        this.httpService = $http;
        this.dataForm = {
            data: {},
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
            return angular.forEach(form, function (input, key) {
                if (typeof input === 'object' && input.$name !== undefined) {
                    return form[input.$name].$setViewValue((form[input.$name].$viewValue !== undefined ? form[input.$name].$viewValue : ""));
                }
            });
        }
    }

    thanksShowTime() {
        console.log('start');
        this.$rootScope.formIsValide = true;
        this.$timeout(()=> {
            this.$rootScope.hideThank();
        }, 2000);
    }

    clear(formValidate) {
        this.dataForm.data = {};
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
            this.sendData(sendOptions);
            this.clear(formValidate);
        } else {
            this.form_set_dirty(formValidate);
        }
    }
}
angular.module("App")
    .controller("App.form.FormAuthCtrl", FormAuthCtrl)
    .controller("App.form.FormCtrl", FormCtrl)
    //.controller("App.form.FilterCtrl", FilterBlockCtrl);
    .controller("App.FilterCtrl", FilterCtrl);



