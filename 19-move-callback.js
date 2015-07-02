function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }
    return getComputedStyle(obj,false)[attr];
}
function updateAttr(obj, attr, value){
    if(attr == 'opacity'){
        obj.style.filter = 'alpha(opacity:' + value + ')';
        obj.style.opacity = value/100;
    }else{
        obj.style[attr] = value + 'px';

    }
}
function startMove(obj, attr, iTarget, speed, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {

        if(attr == 'opacity'){
            var iAttr = Math.round(parseFloat(getStyle(obj,attr))*100);
        } else {
            var iAttr = parseInt(getStyle(obj, attr));

        }
        if (Math.abs(iAttr - iTarget) < Math.abs(speed)) {
            clearInterval(obj.timer);
            updateAttr(obj, attr, iTarget);
            if(fn)fn();
            //obj.style[attr] = iTarget + 'px';
        } else {
            updateAttr(obj, attr, iAttr + speed);
            //obj.style[attr] = iAttr + speed + 'px';
        }
    }, 30);
}

function startBufferMove(obj, attr, iTarget, step,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var iAttr = parseInt(getStyle(obj, attr));
        var speed = (iTarget - iAttr)/step;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (Math.abs(iAttr - iTarget) <= Math.abs(speed)) {
            clearInterval(obj.timer);
            updateAttr(obj, attr, iTarget);
            if(fn)fn();
            //obj.style[attr] = iTarget + 'px';
        } else {
            updateAttr(obj, attr, iAttr + speed);
            //obj.style[attr] = iAttr + speed + 'px';
        }
    }, 30);
}

