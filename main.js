//Global variables for deck id and score
let deckid;
let score = 0;
let botScore = 0;

//Getting a new shuffled deck and retrieving its id
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        deckid = data.deck_id;
    })


//NEW GAME EVENT LISTENER
document.querySelector('.newGame').addEventListener('click', function(){
    reset();
    drawCard();
    botDraw();
    console.log(score);
    
});

//HIT ME EVENT LISTENER
document.querySelector('.hitMe').addEventListener('click', function() {
    drawCard();
    botDraw();
    checkWin();
})

//STOP EVENT LISTENER
document.querySelector('.stop').addEventListener('click', function(){
    checkWin();
})


//FUNCTIONS
function reset() {
    let cards = document.querySelector(".cards");
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }
    score = 0;
    botScore = 0;
}

function botDraw(){
    let num;
    num = Math.floor(Math.random() * 10) + 1;
    botScore += num;
    document.querySelector('.bot .score').innerText = botScore;
}

function drawCard() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        //place image on the screen
        let card = document.createElement('img');
        card.src = data.cards[0].image;
        document.querySelector('.cards').appendChild(card);

        //log the card value to 'score'
        let cardValue = data.cards[0].value;
        if(cardValue === "JACK" || cardValue === "QUEEN" || cardValue === "KING") {
            cardValue = 10;
        }else if(cardValue === "ACE") {
            let input = Number(prompt("You drew an ace. 1 or 11?"));
            while(![1, 11].includes(input)) {
                input = Number(prompt("Try again. 1 or 11?"));
            }
            cardValue = input;
        }
        score += Number(cardValue);

        //display score to the screen
        document.querySelector('.player .score').innerText = score;
    })
}

function checkWin() {
//zxc
}
