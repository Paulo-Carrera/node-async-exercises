// const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'

// axios.get(url)
//     .then(res => {
//         const deck_id = res.data.deck_id;
//         return axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`);
//     })
//     .then(res => {
//         console.log(res.data.cards[0].value, res.data.cards[0].suit);
//     })


////////////////////////////////////////////////////////////////////////////////////////////////



async function getTwoCards(){
    const res = await axios.get(url);
    const deck_id = res.data.deck_id;
    const res2 = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`);
    console.log(res2.data.cards[0].value, res2.data.cards[0].suit);
    console.log(res2.data.cards[1].value, res2.data.cards[1].suit);
}

// getTwoCards();


//////////////////////////////////////////////////////////////////////////////////////////////////



const remainingCardsText = document.querySelector('#remaining-cards');
const cardsContainer = document.querySelector('#cards-container');
const drawBtn = document.querySelector('#draw-btn');
let deck_id;
let cardCount = 0;

async function getDeckToDrawFrom(){
    try{
        const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/';
        const res = await axios.get(url);
        deck_id = res.data.deck_id;
        cardCount = res.data.remaining;
        remainingCardsText.textContent = `Remaining Cards : ${cardCount}`;
        drawBtn.disabled = false;
    }catch(err){
        console.log(err);
    }
}

drawBtn.addEventListener('click', async function(){
    try{
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
        const card = res.data.cards[0];

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card');

        const cardImg = document.createElement('img');
        cardImg.src = card.image;

        const cardElement = document.createElement('p');
        cardElement.textContent = `${card.value} of ${card.suit}`;

        cardContainer.appendChild(cardImg);
        cardContainer.appendChild(cardElement);
        cardsContainer.appendChild(cardContainer);
        
        cardCount --;
        remainingCardsText.textContent = `Remaining Cards : ${cardCount}`;

        if(cardCount === 0){
            drawBtn.disabled = true;
            drawBtn.textContent = 'No Cards Remaining';
        }
    }catch(err){
        console.log(err);
    }
})


getDeckToDrawFrom();