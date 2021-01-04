//
//Variables
//
var APIurl = 'https://vanillajsacademy.com/api/places.json';
//
//Methods

/* var handler = function (instance) {
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
} */

var getNoPlacesHTML = function(){
    return '<div>Unable to find any places right now. Please try again. Sorry.</div>';
}

var getPlacesHTML = function(props){
 


    var html = '<div class="row">';
    props.places.map(function (place) {
        // check if local Storage key exists and read the value
        var ariaPressedValue;
        if(!localStorage.getItem(place.place)){
            ariaPressedValue = "false";
        } else {
            ariaPressedValue = localStorage.getItem(place.place);
        }


        html+='<div class = "grid" ><p><a href="' + place.url + '">'+ place.place + '</a></p>';
        html+='<img src="' + place.img + '"/>';
        html+='<p>' + place.description + '</p>';  
        html+='<button id="' + place.place + '" class="fave" aria-label="Favorite" aria-pressed="'+ ariaPressedValue+'">❤</button></div>'
    }).join('') + '</div>';
    return html;
}        


// my Reef component
var UIPlaces = new Reef('#app',{
    // data
        data: {},
    // template
        template : function (props){
            // Do good practice checks
            if(props.places && props.places.length){
                return getPlacesHTML(props);
            }
                // Otherwise return an error
                return getNoPlacesHTML();
        }
    });



// Fetch data from the API
var getPlaces = function(){
    fetch(APIurl).then(function (response) {
        if (response.ok) {
			return response.json();
		}
		return Promise.reject(response);
    }).then(function (data) {
        // Reactively update the data
        // console.log(data);
        UIPlaces.data.places = data;
    }).catch(function(err){
        console.warn(err);
        UIPlaces.data.places= null;
    });
}  

var setFavourite = function(target){
    if(!target.closest('.fave')) return;

    //toggle attribute aria-pressed
    if(target.getAttribute('aria-pressed') == "false"){
        target.setAttribute('aria-pressed', true);
        // set local storage 
        localStorage.setItem(target.id, "true");

    }else{
        target.setAttribute('aria-pressed', false);
        localStorage.setItem(target.id,"false");
    }
    

}

var clickHandler = function(event){
    setFavourite(event.target);
}

//
// Inits
//
getPlaces();

//
//Event Listeners
//
document.addEventListener('click',clickHandler);
