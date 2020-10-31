//
//Variables
//
//Random Ron var(s)
var btnRandonRonFetchAPI = document.querySelector('#btnRandonRonFetchAPI-GET');
var blockQuotes = document.querySelector('#RandomRonQuotes');
var RonQuotes = [];
var RonDupeQuotes = [];
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
    btnFetchAPIAjaxCallGETRandomRon(btnClicked);
};

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
           // console.log(APIdata);

           // check if
            if (RonQuotes.indexOf(APIdata[0])>-1){
                // Quote already exists so lets go and get another one.
                RonDupeQuotes.push(APIdata[0]);
                alert("Quote exists within last 50 so we will go and get another one.");
             //   console.log(RonDupeQuotes);
             //   console.log(RonQuotes);
             // This is recursion and we willre-run this function again (all codd stopped)
                getQuote();
            }else {
                // Add to our array of quotes 
                RonQuotes.push(APIdata[0]);
                blockQuotes.innerText = APIdata[0];
                if (RonQuotes.length > 50){
                    // reset an array so the dupe dos 
                    RonQuotes = [];
                }
             // blockQuotes.innerHTML = blockQuotes.innerHTML + "</br></br>" + APIdata[0];
            }

            
        }).catch(function(err){
            blockQuotes.innerText = "[Something went wrong.]I have a joke for you... The government in this town is excellent, and uses your tax dollars efficiently.'"
            console.warn("Something went wrong.", err);
        })
}

getQuote();

//
//Event Listeners
//
document.addEventListener('click',clickHandler);
