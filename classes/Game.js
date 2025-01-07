const { DungeonDeck } = require('./DungeonDeck');
const { TreasureDeck } = require('./TreasureDeck');
const { Turn } = require('./Turn');

class Game {
    constructor() {
        if (Game.instance) {
            return Game.instance;
        }
        Game.instance = this;
        this.players = [];
        this.dungeonDeck = new DungeonDeck();
        this.treasureDeck = new TreasureDeck();
        this.currentTurn = 0;
        this.gameStatus = 'not_started';
        this.turn = null; 
    }

    static getInstance() {
        if (!Game.instance) {
            new Game();
        }
        return Game.instance;
    }

    startGame() {
        this.gameStatus = 'in_progress';
    }

    endGame() {
        this.gameStatus = 'ended';
    }

    nextTurn() {
        this.currentTurn = (this.currentTurn + 1) % this.players.length;
        this.turn = new Turn(this.getCurrentPlayer()); // Atualiza o turno atual
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(player) {
        this.players = this.players.filter(p => p.id !== player.id);
    }

    getCurrentPlayer() {
        return this.players[this.currentTurn];
    }

    getCurrentTurn() {
        return this.turn;
    }

    setCurrentTurn(turn) {
        this.turn = turn;
    }
}

module.exports = { Game };
