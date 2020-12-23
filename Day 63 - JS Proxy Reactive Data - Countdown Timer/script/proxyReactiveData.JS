//
//Variables
//
var timeDuration = 120;
var timer;

//
//Methods

var handler = function (instance) {
	return {
		get: function (obj, prop) {
			console.log('got it!');
			if (['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(obj[prop])) > -1) {
				return new Proxy(obj[prop], handler());
			}
            return obj[prop];
		},
		set: function (obj, prop, value) {
			console.log('set it');
            obj[prop] = value;
            instance.render();
			return true;
        },
        deleteProperty: function (obj, prop) {
			console.log('delete it');
            delete obj[prop];
            instance.render();
			return true;
		}
	};
};

// State based UI component
var myUI = function(selector, options){
    var _this= this;
    _this.elem = document.querySelector(selector);
    var _data = new Proxy(options.data, handler(this));
    _this.template = options.template;

    Object.defineProperty(_this,'data',{
        get: function(){
            return _data;
        },
        set: function(data){
            _data = new Proxy(data,handler(_this));
            _this.render();
            return true;
        }
    });
};

myUI.prototype.render = function(){
   // this.data.count = timeDuration;
    this.elem.innerHTML = this.template(this.data);
}

var stopTimer =function(){
    if (UITimer.data.count > 0) return;
		window.clearInterval(timer);
		console.log('/end');
}

var countdown = function(){
    UITimer.data.count--;
    stopTimer();
  //  UITimer.render();
}

var startTimer = function(){
    // render state-based ui
    UITimer.data.state = 'Pause';
    // initial render
 //   UITimer.render();
    timer = window.setInterval(countdown,1000);
};

var restartTime = function(event){
    if(!event.target.hasAttribute('data-restart-timer')) return;
    // start again countdown by clearing interval to avoid doubling/speeding up counter
    window.clearInterval(timer);
    UITimer.data.count = timeDuration;
    startTimer();
}

var start_pauseTime = function(event){
    if(!event.target.hasAttribute('data-startpause-timer')) return;
    if (UITimer.data.state == 'Start'){
        UITimer.data.state = 'Pause';
        startTimer();
    } else {
        UITimer.data.state = 'Start';
        //UITimer.render();
        window.clearInterval(timer);
    }
}

//event delegation
var clickHandler = function(event){
    restartTime(event);
    start_pauseTime(event);
}

// my timer component
var UITimer = new myUI('#app',{
    // data
        data: { 
            count: timeDuration,
            state: 'Start'
        },
    // template
        template : function (props){
            //var html = '<input type="text" value="' + props.count +'" readonly>';
            var minutes = parseInt(props.count/60,10).toString() 
            var seconds = (props.count % 60).toString().padStart(2,'0');  
            var html 
            html = '<div>' + minutes + ' : ' + seconds +  '</div>'
            + '<p><button data-startpause-timer = "' + props.state + '">'+props.state
            +' </button><button data-restart-timer>Restart</button></p>';
        
            return html
        }
    });
//
// Inits
//

// render start UI with duration and buttons to start/restart
UITimer.render();

//
//Event Listeners
//
document.addEventListener('click',clickHandler);
