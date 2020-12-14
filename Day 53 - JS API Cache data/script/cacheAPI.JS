//
//Variables
//
var app = document.querySelector('#app');
var url = 'https://vanillajsacademy.com/api/pirates.json';
var cacheFor = 1000 * 60 * 5; // 5 minutes
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
        fetch(url).then(function(APIresponse){

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
            app.innerText = "[Something went wrong.]";
            console.warn("Something went wrong.", err);
        })
}

//
// Render retrurned API data (after json()) and convert into "article" format 
//
var renderArticle = function(APIdata){
    //console.log(APIdata);
    
    app.innerHTML = '<h2>' + APIdata.attribution['name'] +'</h2> <ul>' + APIdata.articles.map(function(article){
        var list = '<li><strong>' + sanitizeHTML(article.title) + '</strong></br>';
        list += sanitizeHTML(article.article) + '</li>';
        return list;
    }).join('') + '</ul>'; 
}

getPiratesNews();

//
//Event Listeners
//
//document.addEventListener('click',clickHandler);
