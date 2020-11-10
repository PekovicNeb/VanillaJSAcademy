//
//Variables
//
var contentHeaders = document.querySelectorAll('h2');
var content = document.querySelector('#table-of-contents');
//
//Methods
//
// var clickHandler = function(){

// }

var SetPageContents = function(){
    var contents = Array.prototype.slice.call(contentHeaders);
    var html='<ul>';
    contents.forEach(function(h2,index){
        html +='<li><a href="#'+h2.getAttribute('id')+ '" id="'+ index +'">' + h2.textContent+'</a></li>'
        return html;
    });
    html +='</ul>';
  //  console.log(html);
   content.innerHTML = html;
}

//
// Init
//

SetPageContents();

//
//Event Listeners
//
//document.addEventListener('click',clickHandler);
