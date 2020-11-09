//
//Variables
//
var btnMixMonsters = document.querySelector('#MixMonsters');
var app =  document.querySelector('#app');
var door = 'door';
var score = 0;


var monsters = [
    'monster1',
    'monster2',
    'monster3',
    'monster4',
    'monster5',
    'monster6',
    'monster7',
    'monster8',
    'monster9',
    'monster10',
    'monster11',
    'sock'
];

var url='https://gist.githubusercontent.com/cferdinandi/b216c6c06685a381ec5bd547410d76c1/raw/ea404869e2c3b02738b36ccb9d82921f80cbf2bd/';
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


//click Handler
var clickHandler = function(event){
    //console.log(event.target.getAttribute('id'));
    //As click handler is on the document elemeent and most evenet bublle to the top 
    //lets get event target id attribute value and pass it to the all function(s) 
    //called in event Handler
    var btnClicked = event.target;

    //console.log(btnClicked.closest('.grid'));
  //  console.log(event.target.closest('.grid'));
    btnShuffleMonsters(btnClicked);
    ShowMonster(btnClicked);

};

var btnShuffleMonsters = function(btnClicked){
    if(btnClicked.getAttribute('id') != btnMixMonsters.getAttribute('id')) return;
    HideMonsters();
};


var HideMonsters = function(){
    // remove WIN/LOST message
    off();
    score = 0;
    var html = '<div class="row">';
    html += shuffle(monsters).map(function(monster){
        var img = '<div class = "grid" aria-live = "polite"><button data-monster-id="' + monster + '">'
            + '<img alt ="Click the door to see what\'s behind it" src ="' + url + door + '.svg" /></button></div>';
        return img;
    }).join('') + "</div>";
    //console.log(html);
    app.innerHTML = html;
};

var ShowMonster = function(btnClicked){
   // console.log(btnClicked);
    var btn = btnClicked.closest('[data-monster-id]');

    if(!btn) return;

    var id = btn.getAttribute('data-monster-id');
    btn.parentNode.innerHTML = '<img alt = "You discovered ' + id + '" src="' + url + id  + '.svg" />';
    
    if (id != 'sock'){
        score ++;
    } else {
        score = 0;
        on("GAME OVER")
    }

    if (score === (monsters.length -1)){
        on("YOU WON")
    }
}

var on = function(msg){
    document.getElementById("overlay").style.display = "block";
    document.getElementById("text").textContent = msg;
}
var off = function(){
    document.getElementById("overlay").style.display = "none";
}

//
// Init
//

HideMonsters();

//
//Event Listeners
//
document.addEventListener('click',clickHandler);
