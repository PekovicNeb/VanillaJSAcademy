//
//Variables
//
//Random Ron var(s)
var btnNYTFetchAPI = document.querySelector('#btnNYTFetchAPI-GET');
var app = document.querySelector('#app');
var categories = ["arts","automobiles","books","business","fashion","food","health", "home", "insider", "magazine", "movies", "nyregion", "obituaries", "opinion", "politics", "realestate", "science", "sports", "sundayreview", "technology", "theater", "t-magazine", "travel", "upshot","us", "world"];
var apikey = 'oHFDoB2yH993OjGdwkdq2kDoh1hv6IA8';
var html = '';

//
//Methods
//

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
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

//click Handler
var clickHandler = function(event){
    //console.log(event.target.getAttribute('id'));
    //As click handler is on the document elemeent and most evenet bublle to the top 
    //lets get event target id attribute value and pass it to the all function(s) 
    //called in event Handler
    var btnClicked = event.target.getAttribute('id');
    btnFetchAPIAjaxCallGETNYT(btnClicked);
};

//
// Function that check if the target clicked is matching our selected button 
// before continue running
//
var btnFetchAPIAjaxCallGETNYT = function(btn){
    //console.log(btn);
    //console.log(btnCallback.getAttribute('id'));
    if (btn != btnNYTFetchAPI.getAttribute('id')) return;

    // loop through 3-5 random categories 
    app.innerHTML = '';   
    getNYTTopStories();
}

//
// Fetch API to NYT and get hope end-points
//
var getNYTTopStory = function(category){
        //Basix syntax fetch return promise so we can use then and catch
        fetch('https://api.nytimes.com/svc/topstories/v2/' + category+ '.json?api-key=' + apikey).then(function(APIresponse){

            //return APIresponse.json();
            if (APIresponse.ok){
                //The API call was successful!
                console.log("The API call to NYT was successful!");
                return APIresponse.json();
            }else {
                return Promise.reject(APIresponse);
            }
        }).then(function(APIdata){
            //this is our data returned
           // console.log(APIdata.results);
            //this works as well console.log(APIdata['results']);

            renderArticle(category, APIdata.results);
            
        }).catch(function(err){
            NYTTopStories.innerText = "[Something went wrong.]I have a joke for you... The government in this town is excellent, and uses your tax dollars efficiently.'"
            console.warn("Something went wrong.", err);
        })
}

//
// Render retrurned API data (after json()) and convert into "article" format 
//
var renderArticle = function(category, articles){
    //console.log(articles);
    
    var randomArticles = shuffle(articles);

    app.innerHTML += '<h2>' + category +'</h2><ul>' + articles.slice(0,6).map(function(article){
        var list = '<li><a href="' + sanitizeHTML(article.url) + '">' + sanitizeHTML(article.title) + '</a></li>';
        return list;
    }).join('') + '</ul>';
}

/*!
 * Get a random integer with a minimum and maximum value
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Integer} min  The minimum value
 * @param  {Integer} max  The maximum value
 * @return {Integer}      A random number
 */
var randomNumber = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

var getNYTTopStories = function(){
    //shuffle categories
    var rndCategories = randomNumber(3,5);
    var catSelection = shuffle(categories).slice(0,rndCategories);
    console.log(catSelection);
// Load top stories on page load by going trough
// shuffled main categories and get only randon 3 to 5
    catSelection.forEach(function(category){
        getNYTTopStory(category);
    });
};

getNYTTopStories();

//
//Event Listeners
//
document.addEventListener('click',clickHandler);
