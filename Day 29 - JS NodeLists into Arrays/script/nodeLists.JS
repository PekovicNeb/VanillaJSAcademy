//
//Variables
//

//
//Methods
//
// var clickHandler = function(){

// }

var SetPageContents = function(){
//
//Local Variables kept outside of the global scope
//
    var contentHeaders = document.querySelectorAll('h2');
    var content = document.querySelector('#table-of-contents');

    var contents = Array.prototype.slice.call(contentHeaders);
    var html='<ol>';
    contents.forEach(function(h2,index){
        if(h2.id.length<1){
            //console.log(h2.textContent);
            h2.setAttribute('id',h2.textContent.replace(/[^a-z0-9]+/gi,'-'));  
        }
            html +='<li><a href="#'+h2.getAttribute('id')+ '" id="'+ index +'">' + h2.textContent+'</a></li>';
    });
    html +='</ol>';
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
