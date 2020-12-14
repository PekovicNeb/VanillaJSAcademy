//
//Variables
//
var app = document.querySelector('#app');
var url = 'https://vanillajsacademy.com/api/pirates.json';
var cacheFor = 1000 * 5; // 30 seconds
var cachedPirateNewsData = JSON.parse(localStorage.getItem('PirateNews'));

// when API data returned set this variable
var PirateNews = {
    data: {},
    timestamp: null
};

//
//Methods
//
/**
 * Dynamically vary the API endpoint
 * @return {String} The API endpoint
 */
var getEndpoint = function () {
	var endpoint = 'https://vanillajsacademy.com/api/';
	var random = Math.random();
	if (random < 0.5) return endpoint + 'pirates.json';
	return endpoint + 'fail.json';
};

/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function (str) {
	return str.replace(/[^\w. ]/gi, function (c) {
		return '&#' + c.charCodeAt(0) + ';';
	});
};

//
// Fetch API to The Scuttlebutt API
//
var getPiratesNews = function(){
        // check if we have localStorage and if data is still valid before we reload
        if(!cachedPirateNewsData || !isCachedDataValid()) {
            // call API
            callPirateAPI();
        } else{
            
            if (isCachedDataValid()){
            // render from local storage
            console.log("Rendered from local storage cached valid data");

            renderArticle(cachedPirateNewsData['data']);
        }
    }

}

var isCachedDataValid = function(){
    var difference = new Date().getTime() - cachedPirateNewsData['timestamp'];
    return difference < cacheFor;
}

var callPirateAPI = function(){
        //Basic syntax fetch return promise so we can use then and catch
        //fetch(url).then(function(APIresponse){
        fetch(getEndpoint()).then(function(APIresponse){
            //return APIresponse.json();
            if (APIresponse.ok){
                //The API call was successful!
                console.log("The API call to The Scuttlebutt was successful!");
                return APIresponse.json();
            }else {
                return Promise.reject(APIresponse);
            }
        }).then(function(APIdata){
            //this is our data returned
           // console.log(APIdata.results);
            //this works as well console.log(APIdata['results']);

            PirateNews['data']= APIdata;
            PirateNews['timestamp'] = new Date().getTime();
            // save to localStorage
            localStorage.setItem('PirateNews', JSON.stringify(PirateNews));

            renderArticle(APIdata);
            
        }).catch(function(err){

            if(!cachedPirateNewsData){
                app.innerText = "[Something went wrong.]";
                console.warn("Something went wrong.", err);
            }else {
                console.log("API Failed so rendered from local storage regardless if data expired.");
                renderArticle(cachedPirateNewsData['data']); 
            }
         
        })
}

//
// Render retrurned API data (after json()) and convert into "article" format 
//
var renderArticle = function(APIdata){
    //console.log(APIdata);
    
    app.innerHTML = APIdata.articles.map(function(article){
        var html = '<article>' + 
            '<h2>' + sanitizeHTML(article.title) + '</h2>' +
            '<p><em>By' + sanitizeHTML(article.author) + ' on ' +
            sanitizeHTML(article.pubdate) + '</em></p>' +
            sanitizeHTML(article.article);
        return html;
    }).join('') + '<p><em>Articles from <a href="' + sanitizeHTML(APIdata.attribution.url) + '">' +
    sanitizeHTML(APIdata.attribution.name) + '</a></em></p>'; 
}

getPiratesNews();

//
//Event Listeners
//
//document.addEventListener('click',clickHandler);
