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

    var copy = function(arr){
        return arr.slice();
    }
    // Holds our public Constructor
    var Constructor = function(selector){
        this.selector = selector;
        this.elements = document.querySelectorAll(selector);
    };

    Constructor.prototype.toArray = function(list){
        return Array.prototype.slice.call(list);
    };

    Constructor.prototype.getElements = function(){
        return this.toArray(document.querySelectorAll(this.selector));
    };

    Constructor.prototype.addClass = function(cls){
        this.getElements().forEach(function(element){
            element.classList.add(cls);
        });
    };

    Constructor.prototype.removeClass = function(cls){
        this.getElements().forEach(function(element){
            element.classList.remove(cls);
        });
    };

    Constructor.prototype.getFirstElement = function(){
        return document.querySelector(this.selector);
    };

    Constructor.prototype.getLastElement = function(){
        var lastIndex = this.getElements().length;
        return this.getElements()[lastIndex - 1];
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
