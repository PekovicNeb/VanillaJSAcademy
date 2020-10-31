//
//Variables
//
//Random Ron var(s)
var btnNYTFetchAPI = document.querySelector('#btnNYTFetchAPI-GET');
var app = document.querySelector('#app');
var NYTTopStrories = [];
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

    getNYTTopStory();
}

var getNYTTopStory = function(){
        //Basix syntax fetch return promise so we can use then and catch
        fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=oHFDoB2yH993OjGdwkdq2kDoh1hv6IA8').then(function(APIresponse){

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
            console.log(APIdata['results']);
            NYTTopStrories = APIdata['results'];
            console.log(NYTTopStrories);

           // check if
         ///   if (NYTTopStrories.indexOf(APIdata[0])>-1){
             //   alert("Quote exists within last 50 so we will go and get another one.");
             //   console.log(RonDupeQuotes);
             //   console.log(RonQuotes);
             // This is recursion and we willre-run this function again (all codd stopped)
          //   getNYTTopStory();
          //  }else {
                // Add to our array of quotes 
          //      NYTTopStrories.push(APIdata[0]);
          //      app.innerText = APIdata[0];
          //  }

            
        }).catch(function(err){
            NYTTopStrories.innerText = "[Something went wrong.]I have a joke for you... The government in this town is excellent, and uses your tax dollars efficiently.'"
            console.warn("Something went wrong.", err);
        })
}

getNYTTopStory();

//
//Event Listeners
//
document.addEventListener('click',clickHandler);
