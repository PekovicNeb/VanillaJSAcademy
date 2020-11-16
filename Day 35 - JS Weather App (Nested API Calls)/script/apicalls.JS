//
//Variables
//
var curLocationUrl='https://ipapi.co/json?__cf_chl_captcha_tk__=d1beb636ffe9d3d8b23f9b745fac6937fb6260d7-1605562397-0-AexfqKKOO3R3JfbEVHAPF0kpH3lAp95s_Ax-Xodb7Iub8dmQx53wXbi15Hdr21okLfFqxUCnSd9YuHPDsUwAVwfquN4T2FvODNivmGQVPdtQom8qteNzCczKEHTYh-A5iIYiWK62VVhy7gtclDeOm0M6ZjRP-DqrZPkCsMDQLTnA6NKxVtTJb2IMFnUAMjO6g73Jf7BThT6CfkuIG8HiKGw7oU6nege-e1RbLjNMByrplHZv1dIubQfosP10vC6zoJfqkDQ0FQwx61CRgL0adhqYyCTqwQmgUZokR4U34zuZ4XiWVs5gFJ5usMIYQjskUlHX9ycsLw7hUcizy8BIAtMOK2oCVTA1Yj77cEL28hScBhOqVO6CIUw8At1IgR6XRzyOaqqIs8SiJr0XiK82qbx321XXlY-xGzGgfHGi4WUvc5vLyhCRCeLkGpZdxHawIIe0Qp3XYxQMJv7a69bS2X97LdynHw9R7O-EtfNGH9VfXQfiqA0eeb80IkRxidLbhZ9Y-vQVt3hMdHNJN6a4VUIOmWpiACAMU1cp4wZW1VZP3cNEZ9QcIhUQDm15zDr0uw';

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


//
// Fetch API to ger Current Loaction and then nest API call to get weather info
//
var getCurrentLocationWeather = function(){
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
        renderWeather(locationData, WeatherAPIdata.data[0]);

    }).catch(function(err){
        console.warn("Something went wrong.", err);
    })
}

// var clickHandler = function(){

// }

var renderWeather = function(location, weather){
//
//Local Variables kept outside of the global scope
//
    var content = document.querySelector('#weather');
    var html= '<div><h2>'  + sanitizeHTML(location.city) +'</h2></div>';
    html += '<img src="' + sanitizeHTML(weatherbitIconUrl)+ sanitizeHTML(weather.weather.icon) + '.png"/>';
    html += '<span id="current-temp">' + weather.app_temp + '</span>';
    html += '<span>' + sanitizeHTML(weather.weather.description) + '</span>';
   content.innerHTML = html;
}

//
// Init
//

getCurrentLocationWeather();

//
//Event Listeners
//
//document.addEventListener('click',clickHandler);
