declare var angular:any;
declare var _:any;
interface IMultislidesModel {
    popular:any[];
    countInSlide:number;
    group:any[];
}
export class MultislidesCtrl implements IMultislidesModel {
    popular:any[];
    countInSlide:number;
    group:any[];
    static $inject = ["$timeout"];

    constructor(private $timeout) {
        this.popular = [];
        this.group = [];
        this.countInSlide = 0;
        this.$timeout(()=> {
            var count;
            if (this.popular.length % this.countInSlide == 0)
                count = parseInt(this.popular.length / this.countInSlide);
            else
                count = parseInt(this.popular.length / this.countInSlide) + 1;
            this.group = _.fill(new Array(count), true);
        }, 100)
    }
}
angular.module("App")
    .controller("App.animations.multislidesCtrl", MultislidesCtrl)



