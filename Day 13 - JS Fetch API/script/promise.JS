//
//Variables
//
var btnFetchAPI = document.querySelector('#btnFetchAPI-GET');
var btnFetchAPIPOST = document.querySelector('#btnFetchAPI-POST');

//Random Ron var(s)
var btnRandonRonFetchAPI = document.querySelector('#btnRandonRonFetchAPI-GET');
var blockQuotes = document.querySelector('#RandomRonQuotes');

//
var myTimeCount = 0;

//
//Methods
//

//click Handler
var clickHandler = function(event){
    //console.log(event.target.getAttribute('id'));

    //As click handler is on the document elemeent and most evenet bublle to the top 
    //lets get event target id attribute value and pass it to the all function(s) 
    //called in event Handler
    var btnClicked = event.target.getAttribute('id');
    btnFetchAPIAjaxCall(btnClicked);
    btnFetchAPIAjaxCallPOST(btnClicked);
    btnFetchAPIAjaxCallGETRandomRon(btnClicked);
};

//
// Set Timer ticking
//
var myCounter = function(){
    var myTimer = setInterval(function(){
        myTimeCount+=1;

        if (myTimeCount> 10){
            clearTimeout(myTimer)
        }
        console.log(myTimeCount);
    }, 1000);
};

// Call timer to display it
//myCounter();

//
// Function that check if the target clicked is matching our selected button 
// before continue running
//
var btnFetchAPIAjaxCallGETRandomRon = function(btn){
    //console.log(btn);
    //console.log(btnCallback.getAttribute('id'));
    if (btn != btnRandonRonFetchAPI.getAttribute('id')) return;

    getQuote();
}

var getQuote = function(){
        //Basix synatx fetch return promise so we can use then and catch
        fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes').then(function(APIresponse){

            //return APIresponse.json();
            if (APIresponse.ok){
                //The API call was successful!
                console.log("The API call to Random Ron was successful!");
                return APIresponse.json();
            }else {
                return Promise.reject(APIresponse);
            }
        }).then(function(APIdata){
            //this is our data returned
            console.log(APIdata);
            blockQuotes.innerText = APIdata[0];
           // blockQuotes.innerHTML = blockQuotes.innerHTML + "</br></br>" + APIdata;
        }).catch(function(err){
            blockQuotes.innerText = "[Something went wrong.]I have a joke for you... The government in this town is excellent, and uses your tax dollars efficiently.'"
            console.warn("Something went wrong.", err);
        })
}


//
// Function that check if the target clicked is matching our selected button 
// before continue running
//
var btnFetchAPIAjaxCall = function(btn){
    //console.log(btn);
    //console.log(btnCallback.getAttribute('id'));
    if (btn != btnFetchAPI.getAttribute('id')) return;

    //Basix synatx fetch return promise so we can use then and catch
    fetch('https://jsonplaceholder.typicode.com/posts').then(function(APIresponse){

        //return APIresponse.json();
        if (APIresponse.ok){
            //The API call was successful!
            console.log("The API call was successful!");
            return APIresponse.json();
        }else {
            return Promise.reject(APIresponse);
        }
    }).then(function(APIdata){
        //this is our data returned
        console.log(APIdata);
    }).catch(function(err){
        console.warn("Something went wrong.", err);
    })
}


//
// Function that check if the target clicked is matching our selected button 
// before continue running
//
var btnFetchAPIAjaxCallPOST = function(btn){
    //console.log(btn);
    //console.log(btnCallback.getAttribute('id'));
    if (btn != btnFetchAPIPOST.getAttribute('id')) return;

    //Basix synatx fetch return promise so we can use then and catch
    fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        //
        body:{
            title: encodeURIComponent('My awsome new article tile'),
            body: encodeURIComponent('This is a txt of my article')
        }

    }).then(function(APIresponse){

        //return APIresponse.json();
        if (APIresponse.ok){
            //The API call was successful!
            console.log("The API call was successful!");
            return APIresponse.json();
        }else {
            return Promise.reject(APIresponse);
        }
    }).then(function(APIdata){
        //this is our data returned
        console.log(APIdata);
    }).catch(function(err){
        console.warn("Something went wrong.", err);
    })
}


getQuote();

//
//Event Listeners
//
document.addEventListener('click',clickHandler);
