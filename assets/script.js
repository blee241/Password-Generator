// Assignment code here
const lowercaseLibrary = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const uppercaseLibrary = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const numberLibrary = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const specialLibrary = ["'", "\"", "!", "?", "@", "#", "$", "%", "^", "&", "*", "/", "(", ")", "-", "_", "=", "+", ".", ",", "<", ">", "`", "~", "[", "]", "{", "}", ":", ";"];

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function generatePassword() {
  var passwordLength = findPasswordLength();
  // usableLibrary is a representation of which characters the user wants in their password
  var usableLibrary = [];
  var numUsableChars = 0;
  var password = "";
  if (passwordLength !== -1) { // This if statement stops the findCharTypes prompts from appearing if the user clicked cancel while findPasswordLength was running
    var includeChars = findCharTypes();
    // Each of these if statements adds the user's desired character types to usableLibrary. Each if statement that contributes to usableLibrary also increases the upper range of the random number being generated in the for loop. A larger random number range is needed because more characters are being added to the library.
    if (includeChars.lowercase) {
      usableLibrary = lowercaseLibrary;
      numUsableChars = 26;
    };
    if (includeChars.uppercase) {
      usableLibrary = usableLibrary.concat(uppercaseLibrary);
      numUsableChars += 26;
    };
    if (includeChars.numeric) {
      usableLibrary = usableLibrary.concat(numberLibrary);
      numUsableChars += 10;
    };
    if (includeChars.special) {
      usableLibrary = usableLibrary.concat(specialLibrary);
      numUsableChars += specialLibrary.length;
    };
    //This for loop generates the password by picking a random integer between the minimum and maximum index ranges of the usableLibrary array.
    for (var i = 0; i < passwordLength; i++) {
      password += usableLibrary[Math.floor(Math.random()*usableLibrary.length)];
    };
  } else {
    password = "Password generation was stopped. Please press the Generate Password button if you would like to try again."
  }
  return password;
};

function findPasswordLength() {
var acceptable = false;
  // The function begins by asking the user to input a password length
  var passwordLength = prompt("Your password must contain at least 8 characters and no more than 128 characters. How many characters long do you want your new password to be?", "0");
  if (passwordLength >= 8 && passwordLength <= 128) {
    acceptable = true;
  };
  // The program will continue to prompt the user for an acceptable input until either an acceptable number is given or the user clicks cancel
  while (passwordLength !== null && !acceptable) {
      passwordLength = prompt("Your password is either too short or too long! This program is unable to generate a password with " + passwordLength + " characters in it. Your password must contain at least 8 characters and no more than 128 characters.", "0");
      if (passwordLength >= 8 && passwordLength <= 128) {
        acceptable = true;
      };
  };
  // The -1 value will be used in generatePassword() to cancel password generation
  if (passwordLength === null) {
    passwordLength = -1;
  };
  return passwordLength;
};

function findCharTypes() {
  //This object will be sent to generatePassword()
  var includeChars = {
    lowercase: false,
    uppercase: false,
    numeric: false,
    special: false
  } 
  // The function continues to ask the user what types of characters they want in their password until a selection is made
  while ((!includeChars.lowercase && !includeChars.uppercase) && (!includeChars.numeric && !includeChars.special)) {
  includeChars.lowercase = confirm("Do you want your password to contain lowercase letters?");
  includeChars.uppercase = confirm("Do you want your password to contain uppercase letters?");
  includeChars.numeric = confirm("Do you want your password to contain numbers?");
  includeChars.special = confirm("Do you want your password to contain special characters?");
  }
  return includeChars;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
