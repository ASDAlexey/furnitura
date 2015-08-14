module app.search {
    declare var angular:any;
    interface ISearchModel {
        isShowSearch:boolean;
        toggleSearch():void;
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
        }

        toggleSearch():void {
            this.isShowSearch = !this.isShowSearch;
        }

        blurSearch(search:string):void {
            if (!search)
                this.isShowSearch = false
        }

        resetSearch():void {
            this.dataForm.search = '';
        }
    }
    angular.module("App").controller("SearchCtrl", SearchCtrl);
    //angular.module("App").controller("SearchCtrl", SearchCtrl);
}