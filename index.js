/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

        for(let game = 0 ; game < games.length; game++){
            let newDiv = document.createElement("div");
            newDiv.classList.add("game-card");
            // console.log(game);
            // console.log("printing space");
            newDiv.innerHTML = `<img src ="${games[game].img}" width = 60%/>
            <p> The game is ${games[game].name} </p> 
            <p> The game description are : ${games[game].description} </p>`;

            gamesContainer.appendChild(newDiv);
        }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

// addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce((acc, GAMES_JSON) => {
    return acc+GAMES_JSON.backers;
}, 0);

//console.log(totalBackers);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<p>${totalBackers.toLocaleString('en-US')} Total </p>`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `<p>${totalRaised.toLocaleString('en-US')} Total Raised </p>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGamecards = GAMES_JSON.reduce((acc, game) => {
    return acc + 1;
}, 0);

gamesCard.innerHTML = `<p>${totalGamecards.toLocaleString('en-US')} Total Games </p>`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let filterUnfundedOnly = GAMES_JSON.filter((games) => {
        return games.pledged < games.goal;
    })
    console.log(filterUnfundedOnly.length);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(filterUnfundedOnly);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let filterFundedOnly = GAMES_JSON.filter((games) => {
        return games.pledged >= games.goal;
    })
    console.log(filterFundedOnly.length);   
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(filterFundedOnly);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");


// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let countUnfundedGames = GAMES_JSON.reduce((acc, game) => {
    return (game.pledged < game.goal) ? acc+1 : acc;  
}, 0);
console.log(countUnfundedGames);

// create a string that explains the number of unfunded games using the ternary operator
let unfundedStr = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGamecards} total games.
  Currently ${countUnfundedGames} ${countUnfundedGames==1 ? "remains" : "remain"} unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
let newP = document.createElement("p");
newP.innerHTML = `${unfundedStr}`;
descriptionContainer.appendChild(newP);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [game1, game2, ...remainGames] = sortedGames;
console.log(game1);
console.log(game2);
// create a new element to hold the name of the top pledge game, then append it to the correct element

let divFirst = document.createElement("p");
divFirst.innerHTML = `${game1.name}`;
firstGameContainer.appendChild(divFirst);

let divSecond = document.createElement("p");
divSecond.innerHTML = `${game2.name}`;
secondGameContainer.appendChild(divSecond);
// do the same for the runner up item