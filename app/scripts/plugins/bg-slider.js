var BgSlider,bgSlider,
    bind=function(fn,me){
        return function(){
            return fn.apply(me,arguments);
        };
    };

BgSlider=(function(){
    var mainInterval,options;

    options={};

    mainInterval=[];

    function BgSlider(data){
        this.events=bind(this.events,this);
        options=data;
        this.getContainers().forEach((function(_this){
            return function(el,index){
                _this.initSliderPosition(el);
                _this.createTrimLists(el);
                console.log(_this.getThumbs(el));
                _this.events(_this.getThumbs(el),'thumbs',el,index);
                return _this.events(_this.getArrows(el),'arrows',el,_this.getThumbs(el),index);
            };
        })(this));
    }

    BgSlider.prototype.initSliderPosition=function(container){
        return this.move(options.startSliderIndex,container);
    };

    BgSlider.prototype.autoScroll=function(container,thumbsForArrows,index){
        var countThumbs,currentActiveElIndex;
        if(container==null){
            container=null;
        }
        if(thumbsForArrows==null){
            thumbsForArrows=null;
        }
        if(index==null){
            index=null;
        }
        currentActiveElIndex=this.getCurrentActiveThumbIndex(thumbsForArrows);
        countThumbs=thumbsForArrows.length;
        if(currentActiveElIndex<countThumbs-1){
            currentActiveElIndex++;
            this.move(currentActiveElIndex,container);
        }else{
            currentActiveElIndex=0;
            this.moveTrimSlides(countThumbs,container,'next');
        }
        return this.setActiveThumb(thumbsForArrows,currentActiveElIndex);
    };

    BgSlider.prototype.createTrimLists=function(container){
        var firstList,lastList,trimContainer;
        firstList=container.querySelector('.slider>li:first-child').cloneNode(true);
        firstList.classList.add('first','active');
        lastList=container.querySelector('.slider>li:last-child').cloneNode(true);
        lastList.classList.add('last','active');
        trimContainer=container.getElementsByClassName('trim-container')[0];
        trimContainer.appendChild(firstList);
        return trimContainer.appendChild(lastList);
    };

    BgSlider.prototype.getThumbs=function(el){
        return el.querySelectorAll(options.thumbs);
    };

    BgSlider.prototype.getArrows=function(container,param){
        var result;
        if(param==null){
            param=null;
        }
        if(!param){
            return container.querySelectorAll(options.arrows);
        }else if(param==='prev'){
            result=null;
            container.querySelectorAll(options.arrows).forEach(function(el,index){
                if(el.classList.contains('prev')){
                    return result=el;
                }
            });
            return result;
        }else if(param==='next'){
            result=null;
            container.querySelectorAll(options.arrows).forEach(function(el,index){
                if(el.classList.contains('next')){
                    return result=el;
                }
            });
            return result;
        }
    };

    BgSlider.prototype.getContainers=function(){
        if(options.container){
            return document.querySelectorAll(options.container);
        }
    };

    BgSlider.prototype.move=function(index,container){
        var pos;
        pos=-index*100;
        container=container.getElementsByClassName('slider')[0];
        container.style.transform="translate3d("+pos+"%, 0, 0)";
        container.style.OTransform="translate3d("+pos+"%, 0, 0)";
        container.style.msTransform="translate3d("+pos+"%, 0, 0)";
        container.style.MozTransform="translate3d("+pos+"%, 0, 0)";
        return container.style.WebkitTransform="translate3d("+pos+"%, 0, 0)";
    };

    BgSlider.prototype.getCurrentActiveThumbIndex=function(collection){
        var currentActiveElIndex;
        currentActiveElIndex=null;
        collection.forEach(function(el,index){
            if(el.classList.contains('active')){
                return currentActiveElIndex=index;
            }
        });
        return currentActiveElIndex;
    };

    BgSlider.prototype.setActiveThumb=function(collection,index,ect){
        var activeEl;
        if(collection==null){
            collection=null;
        }
        if(index==null){
            index=null;
        }
        if(ect==null){
            ect=null;
        }
        if(index!==null){
            activeEl=(collection.filter(function(el){
                return el.classList.contains('active');
            }))[0];
            if(activeEl){
                activeEl.classList.remove('active');
                return collection[index].classList.add('active');
            }
        }
    };

    BgSlider.prototype.moveTrimSlides=function(countThumbs,container,sideSlide){
        if(countThumbs==null){
            countThumbs=null;
        }
        if(container==null){
            container=null;
        }
        if(sideSlide==null){
            sideSlide=null;
        }
        if(sideSlide==='prev'){
            this.move(-1,container);
            container.querySelector('.trim-container>li:last-child').classList.remove('active');
            setTimeout((function(_this){
                return function(){
                    container.getElementsByClassName('slider')[0].classList.add('actived');
                    _this.move(countThumbs-1,container);
                    return setTimeout(function(){
                        container.getElementsByClassName('slider')[0].classList.remove('actived');
                        return container.querySelector('.trim-container>li:last-child').classList.add('active');
                    },50);
                };
            })(this),800);
        }
        if(sideSlide==='next'){
            this.move(countThumbs,container);
            container.querySelector('.trim-container>li:first-child').classList.remove('active');
            return setTimeout((function(_this){
                return function(){
                    container.getElementsByClassName('slider')[0].classList.add('actived');
                    _this.move(0,container);
                    return setTimeout(function(){
                        container.getElementsByClassName('slider')[0].classList.remove('actived');
                        return container.querySelector('.trim-container>li:first-child').classList.add('active');
                    },50);
                };
            })(this),800);
        }
    };

    BgSlider.prototype.events=function(collection,name,container,thumbsForArrows,index){
        if(collection==null){
            collection=[];
        }
        if(name==null){
            name="";
        }
        if(container==null){
            container="";
        }
        if(thumbsForArrows==null){
            thumbsForArrows="";
        }
        if(index==null){
            index=null;
        }
        return collection.forEach((function(_this){
            return function(el,index){
                if(name==='thumbs'){
                    el.addEventListener('click',function(e){
                        e.preventDefault();
                        index=e.currentTarget.parentNode.index();
                        _this.setActiveThumb(collection,index);
                        return _this.move(index,container);
                    });
                }
                if(name==='arrows'){
                    return el.addEventListener('click',function(e){
                        var countThumbs,currentActiveElIndex,ect;
                        e.preventDefault();
                        ect=e.currentTarget;
                        console.log(thumbsForArrows);
                        currentActiveElIndex=_this.getCurrentActiveThumbIndex(thumbsForArrows);
                        countThumbs=thumbsForArrows.length;
                        console.log(currentActiveElIndex);
                        console.log(countThumbs);
                        if(ect.classList.contains('prev')){
                            if(currentActiveElIndex>0){
                                currentActiveElIndex--;
                                _this.move(currentActiveElIndex,container);
                            }else{
                                currentActiveElIndex=countThumbs-1;
                                _this.moveTrimSlides(countThumbs,container,'prev');
                            }
                        }else if(ect.classList.contains('next')){
                            if(currentActiveElIndex<countThumbs-1){
                                currentActiveElIndex++;
                                _this.move(currentActiveElIndex,container);
                            }else{
                                currentActiveElIndex=0;
                                _this.moveTrimSlides(countThumbs,container,'next');
                            }
                        }
                        return _this.setActiveThumb(thumbsForArrows,currentActiveElIndex);
                    });
                }
            };
        })(this));
    };

    return BgSlider;

})();

bgSlider=new BgSlider({
    container:'.bg-slider-block',
    thumbs:'.thumb-menu>li>a',
    arrows:'.switchers .arrow',
    time:700,
    startSliderIndex:0,
    autoTime:5000
});
