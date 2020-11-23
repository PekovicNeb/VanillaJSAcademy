/*
    1.Get an array of items from the DOM.
    2.Get the first and last matching element in the DOM.
    4.Add a class to all elements in an array.
    5.Remove a class from all elements in an array.
*/

//IIFE with exposed Constructor allows for "constructor pattern" design
var _ = (function(){
    //
    //Variables
    //

    //
    //Methods
    //

    // Holds our public Constructor
    var Constructor = function(selector){
        //this.selector = selector;
        this.elements = document.querySelectorAll(selector);
    };

    Constructor.prototype.toArray = function(){
        return Array.prototype.slice.call(this.elements);
    };

    Constructor.prototype.addClass = function(className){
        this.toArray().forEach(function(element){
            element.classList.add(className);
        });
        return this;
    };

    Constructor.prototype.removeClass = function(className){
        this.toArray().forEach(function(element){
            element.classList.remove(className);
        });
        // make this function chainable by returning this
        return this;
    };

    Constructor.prototype.getFirstElement = function(){
        return this.elements[0];
    };

    Constructor.prototype.getLastElement = function(){
        var lastIndex = this.elements.length;
        return this.elements[lastIndex - 1];
    };

    return Constructor;

})();


/// GLOBAL SCOPE
//
//Variables
//

//Use event delegation
var clickHandler = function(event){
    var btn = event.target.id;
} 

//
// Init
//

var btns = new _('button');
var itms = new _('li');
//
//Event Listeners
//
document.addEventListener('click',clickHandler);
