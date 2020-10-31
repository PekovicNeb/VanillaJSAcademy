//
//Variables
//
var btnCallback = document.querySelector('#btnPromiseCallback');
var myTimeCount = 0;

//
//Methods
//

//click Handler
var clickHandler = function(event){
    //console.log(event.target.getAttribute('id'));

    //As click handler is on the document elemeent and most evenet bublle to the top 
    //lets get event target id attribute value and pass it to the all function(s) 
    //called in event Handler
    var btnClicked = event.target.getAttribute('id');
    btnPromiseCallback(btnClicked);
};

//
// Set Timer ticking
//
var myCounter = function(){
    var myTimer = setInterval(function(){
        myTimeCount+=1;

        if (myTimeCount> 10){
            clearTimeout(myTimer)
        }
        console.log(myTimeCount);
    }, 1000);
};

// Call timer to display it
myCounter();

//
// Function that check if the target clicked is matching our selected button 
// before continue running
//
var btnPromiseCallback = function(btn){
    //console.log(btn);
    //console.log(btnCallback.getAttribute('id'));
    if (btn != btnCallback.getAttribute('id')) return;

    // Check State of the promise
    console.log(myPromise.isFulfilled());
    //After 5 seconds this will output result of resolve/or reject promise function 
    myPromise.then(function (result) {
        console.log(result);
    }).catch(function(err){
        console.warn(err);
    });
}

/**
 * This function allow you to modify a JS Promise by adding some status properties.
 * Based on: http://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved
 * But modified according to the specs of promises : https://promisesaplus.com/
 */
function MakeQueryablePromise(promise) {
    // Don't modify any promise that has been already modified.
    if (promise.isFulfilled) return promise;
    // Set initial state
    var isPending = true;
    var isRejected = false;
    var isFulfilled = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    var result = promise.then(
        function(v) {
            isFulfilled = true;
            isPending = false;
            return v; 
        }, 
        function(e) {
            isRejected = true;
            isPending = false;
            return e; 
        }
    );

    result.isFulfilled = function() { return isFulfilled; };
    result.isPending = function() { return isPending; };
    result.isRejected = function() { return isRejected; };
    return result;
};

// Create a Promise object
var sayHello = new Promise(function (resolve, reject) {
    // In 5 seconds, resolve the Promise.
    // Pass along "Hi, universe!" to any callback methods
    setTimeout(function () {
        resolve('Hi, Helo Universe!');
    }, 6000);
});

// Wrap promise to expand with its State that can be accessed syncronously.
var myPromise = MakeQueryablePromise(sayHello);

//
//Event Listeners
//
document.addEventListener('click',clickHandler);
