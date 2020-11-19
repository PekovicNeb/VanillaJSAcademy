//
//Variables
//
var curLocationUrl='https://ipapi.co/json';
var weatherAPIKey = '47f45cb8a6364f779c2dafe875f7427d';
var weatherbitIconUrl = 'https://www.weatherbit.io/static/img/icons/';

var locationData;
//
//Methods
//

var sanitizeHTML = function (str) {
	return str.replace(/[^\w. ]/gi, function (c) {
		return '&#' + c.charCodeAt(0) + ';';
	});
};

var showConfig = function (event){
    console.log(event.target);

    if(event.target.getAttribute('id') != 'config') return;
    document.getElementById("row").classList.add("show");
}

var changeConfig = function(event){
    if (event.target.getAttribute('name') != 'selectorProp' && event.target.getAttribute('name') != 'tempProp' && event.target.getAttribute('name') != 'descProp' && event.target.getAttribute('name') != 'iconProp' ) return;
   // console.log(event.target.getAttribute('id'));
   // var prop = event.target.getAttribute('name');
   // var val = event.target.getAttribute('id')
    var userConfig = {};
    // get all config values and populate userConfig
    var configs = Array.prototype.slice.call(document.querySelectorAll('.config')).map(function(config){
        //console.log(config);
        if (config.checked!=false){
            var prop = config.name;
            var val = config.id;
           /// console.log(prop, val);
            userConfig[prop]=val;
        }
    });
    getCurrentLocationWeather(userConfig);
}

//
// Fetch API to ger Current Loaction and then nest API call to get weather info
//
var getCurrentLocationWeather = function(props){
    var defaults = {
        selectorProp:'B',
        tempProp:'C',
        descProp:'L',
        iconProp:'I'
    }

    var newDefaults=Object.assign(defaults,props);
    console.log(newDefaults);
    //Basix syntax fetch return promise so we can use then and catch
    fetch(curLocationUrl).then(function(APIresponse){

        //return APIresponse.json();
        if (APIresponse.ok){
            //The API call was successful!
            console.log("The API call to current location was successful!");
            return APIresponse.json();
        }else {
            return Promise.reject(APIresponse);
        }
    }).then(function(APIdata){
        //this is our data returned
        //console.log(APIdata);
        locationData = APIdata;

        var lat = APIdata['latitude'];
        var lon = APIdata['longitude'];
      return fetch('https://api.weatherbit.io/v2.0/current?lat=' + lat + '&lon=' + lon + '&key=' + weatherAPIKey);
    }).then(function(WeatherAPIresponse){
      //return APIresponse.json();
      if (WeatherAPIresponse.ok){
        //The API call was successful!
            console.log("The API call to weather data was successful!");
            return WeatherAPIresponse.json();
        }else {
            return Promise.reject(WeatherAPIresponse);
        }  
    }).then(function(WeatherAPIdata){
        console.log(WeatherAPIdata.data[0]);
        //console.log(WeatherAPIdata.data[0].app_temp);
        console.log(locationData);
    //  renderWeather(category, APIdata.results);
        renderWeather(locationData, WeatherAPIdata.data[0], newDefaults);

    }).catch(function(err){
        console.warn("Something went wrong.", err);
    })
}

var CtoF = function(temp){
    return (parseFloat(temp) * 9 / 5) + 32;
}

var renderWeather = function(location, weather, props){
//
//Local Variables kept outside of the global scope
//
    var content = document.querySelector('#weather');
    document.querySelector('#weatherTop').innerHTML='';
    if(props.selectorProp =='T'){
        content = document.querySelector('#weatherTop');
        document.querySelector('#weather').innerHTML='';
    }

    var html= '<div><h2>'  + sanitizeHTML(location.city) +'</h2></div>';

    if (props.tempProp=='F'){
        weather.app_temp = CtoF(weather.app_temp);
    }

    if (props.iconProp == 'I'){
        html += '<img src="' + sanitizeHTML(weatherbitIconUrl)+ sanitizeHTML(weather.weather.icon) + '.png"/>';
    }
   
    if (props.descProp =='L'){
        html += '<span id="current-temp"> It is currently ' + weather.app_temp + '</span>';
        html += '<span>' + props.tempProp + ' degrees with conditions ' + sanitizeHTML(weather.weather.description) + '</span>';    
    } else {
        html += '<span id="current-temp">' + weather.app_temp + '</span>';
        html += '<span>' + sanitizeHTML(weather.weather.description) + '</span>';
    }

    content.innerHTML = html;
}

var clickHandler = function(event){
    //var eventId= event.target.getAttribute('id')
    //console.log(event.target.getAttribute('id'));
    showConfig(event);
    changeConfig(event);

}

//
// Init
//

getCurrentLocationWeather();

//
//Event Listeners
//

document.addEventListener('click',clickHandler);
