// my code goes here
//
// Polyfills
//
/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

//
// Classes
//

class Password {
  constructor(pass){
    this.pass=pass;
  }
//Get validation
  get getStatus(){
    return this.checkValidation();
  }

  checkValidation(){
  if(this.pass.length < 6){
      return "Length too short";
    }else {
      return "Validation passed";
    }
  }
}

//
//Variables
//
//NodeList
var passwords = [];
//document.querySelectorAll('.password');  
//get NodeList into an array object to be able to use all array methods
var passArray = [];
//Array.prototype.slice.call(passwords);

var newPasswordType = "";

var toggle = document.querySelector('#show-password');  
var securityAnswer = document.querySelector('#textSecurityAnswer');  
var characterCount = document.querySelector('#character-count');
var wordCount = document.querySelector('#word-count');
//
//Methods
//

var showPassword = function(event){
  if(!event.target.matches('[data-pw-toggle]')) return;
  passwords = passwords = document.querySelectorAll(event.target.getAttribute('data-pw-toggle'));
  passArray = Array.prototype.slice.call(passwords);

  if(event.target.checked){
    newPasswordType = 'text';
  } else {
    newPasswordType = 'password';
  } 
  changePasswordType(newPasswordType);
}

var changePasswordType = function(newType){
  passArray.forEach(function(pass){
    pass.type=newType;
    console.log(pass.value);
    p = new Password(pass.value);
    console.log(p.getStatus);
},false);
}

/**
 * Handle click events
 * @param {Event} event The event object
 */
var clickHandler = function(event){
    showPassword(event);
};

/**
 * Handle key up events
 * @param {Event} event The event object
 */
var inputHandler = function(event){
  countLettersAndWords(event.target.value);
};

var countLettersAndWords = function(answer){
  characterCount.textContent = answer.length;
   var words = answer.split(/[\n\r\s]+/g).filter(function(item){
    return item !="";
  });
  wordCount.textContent = words.length;
};

//Event Listeners

//Listen for the clicks in DOM
//event gets passed implicitly
securityAnswer.addEventListener('input',inputHandler);
document.addEventListener('click',clickHandler);


