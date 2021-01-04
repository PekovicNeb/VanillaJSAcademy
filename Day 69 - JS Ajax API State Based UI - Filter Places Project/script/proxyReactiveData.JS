//
//Variables
//
var APIurl = 'https://vanillajsacademy.com/api/places.json';
var favesID = 'exploreFaves';

//
//Methods

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
        html+='<button id="' + place.place + '" class="fave" aria-label="Save ' +place.place+'" aria-pressed="'+ props.faves[place.place]+'">❤</button></div>'
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

var getFaves = function () {
    var faves = localStorage.getItem(favesID);
    var favesObj = faves ? JSON.parse(faves) : {};
    return favesObj;
};

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
        UIPlaces.data.faves = getFaves();
    }).catch(function(err){
        console.warn(err);
        UIPlaces.data.places= null;
        UIPlaces.data.faves = null;
    });
}  

var setFavourite = function(target){
    if(!target.closest('.fave')) return;

    //toggle attribute aria-pressed
    UIPlaces.data.faves[target.id] = UIPlaces.data.faves[target.id] ? false : true;
}

var saveFaves = function (faves) {
	localStorage.setItem(favesID, JSON.stringify(faves));
};

var clickHandler = function(event){
    setFavourite(event.target);
}

var renderHandler = function (event) {
	// Save favorites to localStorage on render
	saveFaves(UIPlaces.data.faves);
};
//
// Inits
//
getPlaces();

//
//Event Listeners
//
document.addEventListener('click',clickHandler);
document.addEventListener('render', renderHandler);