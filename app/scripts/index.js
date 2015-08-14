import './plugins/vinilla';
import './vendors/cssua';
import lory from './plugins/lory';
document.addEventListener('DOMContentLoaded', function () {
    var percentage = document.querySelectorAll('.js_percentage');
    percentage.forEach((element, index)=> {
        var lorySlider = lory(element, {
            infinite: 1
        });
        var mainInterval;
        var autoScroll = ()=> {
            mainInterval = setInterval((function () {
                lorySlider.next();
            }), 5000);
        };
        autoScroll();
        element.querySelectorAll('.arrows-bg-slider').forEach((el, i)=> {
            el.addEventListener('click', ()=> {
                clearInterval(mainInterval);
                autoScroll();
            });
        });
    });


});
//import './plugins/bg-slider';

import 'angular';
import './app';
import './search/search';
//import 'angular-resource';
//import 'angular-sanitize';
//import 'gsap';
//import 'gsap/src/uncompressed/utils/Draggable.js';
//import 'gsap/src/uncompressed/plugins/ScrollToPlugin.js';
//import './plugins/ThrowPropsPlugin.min.js';
//import './plugins/DrawSVGPlugin.min-modif.js'
//import 'lodash';
//import './plugins/angular-ui-utils/ui-utils.js';
//import 'angular-animate';
//import 'angular-google-maps';
//import './plugins/isteven-multi-select'
//import 'material-date-picker'
//import './angular/app.js';
