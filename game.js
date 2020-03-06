let randomCountryElement = document.querySelector('#random-country');
let userAnswerElement = document.querySelector("#user-answer");
let submitButton = document.querySelector("#submit-answer");
let resultTextElement = document.querySelector('#result');
let playAgainButton = document.querySelector("#play-again");

// finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file, o
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

  // You don't need to log countriesAndCodes - just proving it is available

// let levenshtein = require('fast-levenshtein');

// clearing html for response and getting random country code and name
resultTextElement.innerHTML = '';
let countryData = getRandomCountry();

// couldn't get this to work honeslty
// console.log(levenshtein.get('name','name'));


function getRandomCountry() {
    // getting a random value from array using math, and extracting the name and code from it
    let randomElement = countriesAndCodes[Math.floor(Math.random()*countriesAndCodes.length)];
    let countryName = randomElement['name'];
    let countryCode = randomElement['alpha-2'];

    randomCountryElement.innerHTML = countryName;

    return [countryCode, countryName]
}
// callback function with the name done that will do some whichcraft and heresy
function fetchingData(done)  {
    //getting the country code from the array
    let countryCode = countryData[0];
    // fetching data from the api with the specific country code
    fetch(`https://api.worldbank.org/v2/country/${countryCode}?format=json`)
        //getting the response in json
        .then(res => res.json())
        // naming the response
        .then(countryData => {
            // getting the capital city from response and passing it to the callback function
            let capital = countryData[1][0]['capitalCity'];

            done(null,capital)

        })// catching any errors and passing those to the callback function also
        .catch(err => {
            console.log(err);

            done(err)
        });

}

submitButton.addEventListener("click", () => {
    //getting the user answer from html and the country from country data array
    let userAnswer = userAnswerElement.value;
    let countryName = countryData[1];
    // getting error and capital cit from function
    fetchingData(function (err,capCity) {
        //checking if there's an error first
        if (err){
            console.log('oh noo an error')
        }else { // if there's no error comparing user answeer to the correct answer and changing the inner html accordingly
            if (capCity.toLowerCase() === userAnswer.toLowerCase() ){
                resultTextElement.innerHTML = `Well Done the capital of ${countryName} is ${capCity}`
            }else{
                resultTextElement.innerHTML = 'Bad Done'
            }
        }

    });
});

playAgainButton.addEventListener("click",() =>{
    // clearing the user input and result message
    userAnswerElement.value= '';
    resultTextElement.innerHTML = '';
    // calling the previous function for the program to run again
    countryData = getRandomCountry();
    fetchingData(function () {

    });

});



//  add a click event handler to the submitButton.  When the user clicks the button,
//  * read the text from the userAnswerElement 
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message.
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare it to the user's answer. 
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"


// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice. 
