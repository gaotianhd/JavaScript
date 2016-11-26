/**
 * Created by 007 on 2016/9/21.
 */

function scroll(){
    if (window.pageYOffset){
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        };
    } else if (document.body.scrollTop){
        return {
            top: document.body.scrollTop,
            left: document.body.scrollLeft
        };
    } else {
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        };
    }
}