declare var angular:any;
interface ISearchModel {
    isShowSearch:boolean;
    resetSearch():void;
    blurSearch(search:string):void;
    dataForm:{
        search:string
    };
}
class SearchCtrl implements ISearchModel {
    isShowSearch:boolean;
    dataForm:{
        search:string
    };

    constructor() {
        this.isShowSearch = false;
        this.dataForm = {
            search: ''
        };
    }

    blurSearch(search:string):void {
        if (!search)
            this.isShowSearch = false
    }

    resetSearch():void {
        this.dataForm.search = '';
        this.blurSearch('');
    }
}
angular.module("App.search",[]).controller("SearchCtrl", SearchCtrl);