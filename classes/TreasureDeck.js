const { Deck } = require('./Deck');
const { Item } = require('./Item');

class TreasureDeck extends Deck {
    constructor() { 
        super();
        this.cards = [];
    } 

    createCard(card) {
        this.cards.push(card);
    }
    
    removeCard(card) { 
        this.cards = this.cards.filter(element => element !== card) 
    };
}
module.exports = { TreasureDeck };