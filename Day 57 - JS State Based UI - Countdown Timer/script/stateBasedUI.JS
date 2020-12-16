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
    UITimer.data.count = timeDuration;
    // initial render
    UITimer.render();
    timer = window.setInterval(countdown,1000);
};

var clickHandler = function(event){
    if(!event.target.hasAttribute('data-restart-timer')) return;
    // start again countdown
    startTimer();
}

// my timer component
var UITimer = new myUI('#app',{
    // data
        data: { 
            count: timeDuration
        },
    // template
        template : function (props){
            //var html = '<input type="text" value="' + props.count +'" readonly>';
            var minutes = parseInt(props.count/60,10).toString() 
            var seconds = (props.count % 60).toString().padStart(2,'0');
            
            var html 
            
            if (props.count < 1){
                html = '<p><button data-restart-timer>Restart Timer</button></p>';
            }else {
               html = '<div>' + minutes + ' : ' + seconds +  '</div>'
            } 
            return html
        }
    });
//
// Inits
//
    startTimer();

//
//Event Listeners
//
document.addEventListener('click',clickHandler);
