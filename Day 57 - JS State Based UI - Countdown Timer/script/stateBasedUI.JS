//
//Variables
//
var timeDuration = 120;
var timer;

//
//Methods

// State based UI component
var myUI = function(selector, options){
    this.elem = document.querySelector(selector);
    this.data = options.data;
    this.template = options.template;
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
    UITimer.render();
}

var startTimer = function(){
    // render state-based ui
    UITimer.data.state = 'Pause';
    // initial render
    UITimer.render();
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
        UITimer.render();
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
