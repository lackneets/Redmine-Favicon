(function() {

    var attachEvent = function(element, event, fn) {
        if (element.addEventListener)
            element.addEventListener(event, fn, false);
        else if (element.attachEvent) // if IE
            element.attachEvent('on' + event, fn);
    }

    var onReady = function(func) {
        if (document.readyState == 'complete') {
            func();
        } else {
            attachEvent(window, 'load', func);
        }
    }

    function isCanvasSupported() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    function roundRect(ctx,x,y,width,height,radius,fill,stroke){if(typeof stroke=="undefined"){stroke=true}if(typeof radius==="undefined"){radius=5}ctx.beginPath();ctx.moveTo(x+radius,y);ctx.lineTo(x+width-radius,y);ctx.quadraticCurveTo(x+width,y,x+width,y+radius);ctx.lineTo(x+width,y+height-radius);ctx.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);ctx.lineTo(x+radius,y+height);ctx.quadraticCurveTo(x,y+height,x,y+height-radius);ctx.lineTo(x,y+radius);ctx.quadraticCurveTo(x,y,x+radius,y);ctx.closePath();if(stroke){ctx.stroke()}if(fill){ctx.fill()}}
    function drawTicketIcon(ticket) {
        var num = parseInt(ticket);
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        var color = '#EF5C25';

        function tens(num){ return num < 10 ? ['0', num].join('') : num; }

        canvas.width = canvas.height = 64;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        roundRect(ctx, 0, 0, 64, 64, 15, true);

        ctx.fillStyle = "#FFF";

        ctx.font = "bold 34px helvetica";
        ctx.fillText(Math.floor(num/100), 5, 28);

        ctx.font = "bold 42px helvetica";
        ctx.fillText(tens(num-Math.floor(num/100)*100), 10, 60);

        return canvas.toDataURL("image/png");
    }

    onReady(function() {

        if(!isCanvasSupported()){
            return false;
        }

        var links = document.getElementsByTagName('link');
        for(var i,el=links[i=0]; i<links.length;el=links[++i]){
            if(String(el.getAttribute('rel')).match('icon')){
                el.parentNode.removeChild(el);
            }
        }
        var newLink = document.createElement('link');
        newLink.setAttribute('rel', 'shortcut icon');
        newLink.setAttribute('type', 'image/vnd.microsoft.icon');

        var loc;
        if (loc = window.location.toString().match(/issues\/(\d+)/)) {
            newLink.setAttribute('href', drawTicketIcon(loc[1]));
        }

        if (loc = window.location.toString().match(/people\/(\d+)/)) {
            var src = document.getElementsByClassName('gravatar')[0].getAttribute('src');
            newLink.setAttribute('href', src);
        }

        document.getElementsByTagName('head')[0].appendChild(newLink);

    });
})();