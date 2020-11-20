/*
    1.Convert a NodeList to an array.
    2.Get the first matching element in the DOM.
    3.Get all matching elements in the DOM as an array.
    4.Add a class to all elements in an array.
    5.Remove a class from all elements in an array.
*/

//IIFE with exposed public methods allows for "revealing module pattern" design
var helper = (function(){
//
//Variables
//

//
//Methods
//
// Holds our public methods
var methods = {};


methods.ConvertNodeListToArray = function(nodelist){
    var arr = Array.prototype.slice.call(nodelist);
    return arr;
}

methods.ChangeElementColor = function(array, newAtt){
    array.forEach(function(elem){
        var currentClass = elem.getAttribute('.class');

        elem.classList.remove(currentClass);
        elem.classList.add(newAtt);
    });
    return "DOM elements color changed.";
}


return methods;

})();


/// GLOBAL SCOPE
//
//Variables
//
//get NodeList of all buttons
var btns = document.querySelectorAll('button');

var getNodeList = function(btn){
    if (btn != 'button-1') return;
    // prints our NodeList of buttons
    console.log(btns);

    //prints out Array we recived form our helper
    console.log('Node list converted to array');
    console.log(helper.ConvertNodeListToArray(btns));
}

var getElementClass = function(btn){
    if (btn != 'button-4') return;
    //console.log(btn);
    // get all the buttons and retrun as array
    var arr = helper.ConvertNodeListToArray(btns);
    var newColor= "btn-purple"
    console.log(helper.ChangeElementColor(arr, newColor));
}


//Use event delegation
var clickHandler = function(event){
    var btn = event.target.id;
    //console.log(btn);
    getNodeList(btn);
    getElementClass(btn);
}

//
// Init
//

//
//Event Listeners
//
document.addEventListener('click',clickHandler);
