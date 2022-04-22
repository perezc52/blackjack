//Global variables for deck id and score
let deckid;
let score = 0;

//Getting a new deck and retrieving its id
fetch('https://deckofcardsapi.com/api/deck/new/')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        deckid = data.deck_id;
    })

//New game function
document.querySelector('.newGame').addEventListener('click', function(){
    reset();
    fetch(`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            let card = document.createElement('img');
            card.src = data.cards[0].image;
            document.querySelector('.cards').appendChild(card);
        })
});

//Draw 1 card function
document.querySelector('.hitMe').addEventListener('click', function() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            let card = document.createElement('img');
            card.src = data.cards[0].image;
            document.querySelector('.cards').appendChild(card);
        })
})

//Stop drawing and check win condition
document.querySelector('.stop').addEventListener('click', function(){

})

function reset() {
    let cards = document.querySelector(".cards");
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }
    score = 0;
}