//
//Variables
//
var btnCallback = document.querySelector('#btnPromiseCallback');
var myCount = 0;

//
//Methods
//

//click Handler

var clickHandler = function(event){
    //console.log(event.target.getAttribute('id'));
    var btnClicked = event.target.getAttribute('id');
    btnPromiseCallback(btnClicked);
};


var myCounter = function(){
    var myTimer = setInterval(function(){
        myCount+=1;

        if (myCount> 15){
            clearTimeout(myTimer)
        }
        console.log(myCount);
    }, 1000);
};

myCounter();


var btnPromiseCallback = function(btn){
    //console.log(btnCallback);
    if (btn != btnCallback.getAttribute('id')) return;
    console.log("Im checking promise status");
    console.log(sayHello);
    //if (sayHello.state =="pending") console.log("Still Awaiting Promise");
    //if (sayHello.state =="fulfilled") console.log("Promise Resolved");
    //if (sayHello.state =="rejected") console.log("Promise Rejected");
    sayHello.then(function (msg) {
        console.log(msg);
        console.log(sayHello.state);
    });
}

// Create a Promise object
var sayHello = new Promise(function (resolve, reject) {
    // In 5 seconds, resolve the Promise.
    // Pass along "Hi, universe!" to any callback methods
    setTimeout(function () {
        resolve('Hi, universe!');
    }, 15000);
});

// After 5 seconds, if the Promise resolves,
// this will log "Hi, universe!" into the console
//sayHello.then(function (msg) {
//    console.log(msg);
//});



//
//Event Listeners
//
document.addEventListener('click',clickHandler);
