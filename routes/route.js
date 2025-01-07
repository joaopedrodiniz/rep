const express = require('express');
const router = express.Router();
const { Game } = require('../classes/Game');
const { Combat } = require('../classes/Combat');
const { Player } = require('../classes/Player');
const { Turn } = require('../classes/Turn');
const { Monster } = require('../classes/Monster');
const { CurseCard } = require('../classes/CurseCard');
const { CharacterClass } = require('../classes/CharacterClass');
const { Race } = require('../classes/Race');
const { Item } = require('../classes/Item');

const cartasTesouro = [
    new Item('12', 'Espada Longa', 'Uma espada poderosa', 3, 3, 'hand', []),
    new Item('23', 'Armadura de Ouro', 'Uma armadura brilhante', 4, 4, 'body', []),
    new Item('34', 'Poção de Força', 'Uma poção mágica', 2, 2, 'hand', []),
    new Item('45', 'Escudo de Prata', 'Um escudo resistente', 1, 1, 'hand', []),
    new Item('56', 'Anel Mágico', 'Um anel encantado', 2, 2, 'hand', []),
    new Item('67', 'Elmo do Destino', 'Um elmo protetor', 3, 3, 'head', []),
    new Item('78', 'Botas de Agilidade', 'Botas rápidas', 1, 1, 'feet', []),
    new Item('89', 'Capa da Invisibilidade', 'Uma capa que torna o usuário invisível', 4, 4, 'body', []),
    new Item('91', 'Machado de Guerra', 'Um machado letal', 3, 3, 'hand', []),
    new Item('1011', 'Bracelete da Força', 'Um bracelete poderoso', 2, 2, 'hand', []),
    new Item('1112', 'Lança Mortal', 'Uma lança letal', 3, 3, 'hand', []),
    new Item('1213', 'Capacete de Ferro', 'Um capacete resistente', 2, 2, 'head', []),
    new Item('1314', 'Poção de Cura', 'Cura instantânea', 1, 1, 'hand', []),
    new Item('1415', 'Armadura de Espinhos', 'Reflete dano', 4, 4, 'body', []),
    new Item('1516', 'Amuleto do Poder', 'Concede força extra', 2, 2, 'hand', []),
    new Item('1617', 'Botas da Fuga', 'Ajuda a fugir de combates', 1, 1, 'feet', []),
    new Item('1718', 'Escudo de Fogo', 'Queima os inimigos', 3, 3, 'hand', []),
    new Item('1819', 'Cajado Arcano', 'Poder arcano concentrado', 4, 4, 'hand', []),
    new Item('1920', 'Capa do Vento', 'Permite movimento rápido', 3, 3, 'body', []),
    new Item('2021', 'Elmo do Caçador', 'Aumenta precisão', 2, 2, 'head', []),
    new Item('2122', 'Machado Duplo', 'Causa dano devastador', 4, 4, 'hand', []),
    new Item('2223', 'Anel do Guardião', 'Protege contra ataques', 1, 1, 'hand', []),
    new Item('2324', 'Bracelete da Velocidade', 'Aumenta a velocidade', 2, 2, 'hand', []),
    new Item('2425', 'Escudo de Gelo', 'Congela os inimigos', 3, 3, 'hand', []),
    new Item('2526', 'Poção de Invulnerabilidade', 'Imune a danos por um turno', 4, 4, 'hand', []),
    new Item('2627', 'Luva do Destruidor', 'Amplifica dano em ataques', 2, 2, 'hand', []),
    new Item('2728', 'Cajado de Fogo', 'Ataques flamejantes', 3, 3, 'hand', []),
    new Item('2829', 'Botas de Levitação', 'Permite andar sobre água e lava', 1, 1, 'feet', []),
    new Item('2930', 'Capa do Camaleão', 'Concede furtividade', 4, 4, 'body', []),
    new Item('3031', 'Espada Relâmpago', 'Ataques elétricos', 3, 3, 'hand', [])
];

const cartasDungeon = [
    new Monster('111', 'Goblin', 'Um pequeno monstro', 1, 1, (player) => {
        player.levelDown();
        console.log(`${player.name} encontrou um Goblin e perdeu um nível.`);
    }),
    new Monster('222', 'Troll', 'Um grande monstro', 3, 2, (player) => {
        player.levelDown();
        player.levelDown();
        console.log(`${player.name} encontrou um Troll e perdeu dois níveis.`);
    }),
    new Monster('333', 'Dragão', 'Um poderoso dragão', 5, 3, (player) => {
        player.levelDown();
        player.levelDown();
        player.levelDown();
        console.log(`${player.name} encontrou um Dragão e perdeu três níveis.`);
    }),
    new CurseCard('444', 'Perda de Memória', 'Perde um nível', 1, 'level_down'),
    new CurseCard('555', 'Maldição da Fraqueza', 'Perde dois níveis', 2, 'level_down'),
    new CharacterClass('666', 'Guerreiro', 'Classe de guerreiro', 'abilidade1'),
    new CharacterClass('777', 'Mago', 'Classe de mago', 'abilidade2'),
    new Race('888', 'Elfo', 'Raça de elfo', 'abilidade1'),
    new Race('999', 'Anão', 'Raça de anão', 'abilidade2'),
    new Monster('4445', 'Orc', 'Um guerreiro brutal', 2, 1, (player) => {
        player.levelDown();
        console.log(`${player.name} encontrou um Orc e perdeu um nível.`);
    }),
    new Monster('5556', 'Ciclops', 'Um monstro gigante', 4, 2, (player) => {
        player.levelDown();
        player.levelDown();
        console.log(`${player.name} encontrou um Ciclops e perdeu dois níveis.`);
    }),
    new Monster('6667', 'Hidra', 'Uma criatura com várias cabeças', 6, 3, (player) => {
        player.levelDown();
        player.levelDown();
        player.levelDown();
        console.log(`${player.name} encontrou uma Hidra e perdeu três níveis.`);
    }),
    new CurseCard('7778', 'Maldição da Pobreza', 'Perde um nível', 1, 'level_down'),
    new CurseCard('8889', 'Maldição da Desesperança', 'Perde dois níveis', 2, 'level_down'),
    new CharacterClass('99910', 'Ladino', 'Classe de ladino', 'abilidade3'),
    new CharacterClass('101011', 'Clérigo', 'Classe de clérigo', 'abilidade4'),
    new Race('111112', 'Humano', 'Raça de humano', 'abilidade3'),
    new Race('121213', 'Gnomo', 'Raça de gnomo', 'abilidade4'),
    new Monster('131314', 'Fênix', 'Renascida das cinzas', 5, 4, (player) => {
        player.levelDown();
        console.log(`${player.name} encontrou uma Fênix e perdeu um nível.`);
    }),
    new Monster('141415', 'Esqueleto', 'Um morto-vivo assustador', 2, 1, (player) => {
        player.levelDown();
        console.log(`${player.name} encontrou um Esqueleto e perdeu um nível.`);
    }),
    new CurseCard('151516', 'Maldição da Confusão', 'Perde um nível', 1, 'level_down'),
    new CurseCard('161617', 'Maldição do Sono', 'Perde dois níveis', 2, 'level_down'),
    new CharacterClass('171718', 'Paladino', 'Classe de paladino', 'abilidade5'),
    new CharacterClass('181819', 'Caçador', 'Classe de caçador', 'abilidade6'),
    new Race('191920', 'Halfling', 'Raça de halfling', 'abilidade5'),
    new Race('202021', 'Tiefling', 'Raça de tiefling', 'abilidade6'),
    new Monster('212122', 'Minotauro', 'Uma besta com chifres', 4, 3, (player) => {
        player.levelDown();
        player.levelDown();
        console.log(`${player.name} encontrou um Minotauro e perdeu dois níveis.`);
    }),
    new Monster('222223', 'Golem', 'Uma criatura de pedra', 3, 2, (player) => {
        player.levelDown();
        console.log(`${player.name} encontrou um Golem e perdeu um nível.`);
    })
];

router.post('/game/addPlayer', (req, res) => {
    const { id, name } = req.body;
    const playerObj = new Player(id, name);
    const game = Game.getInstance();
    game.addPlayer(playerObj);

    res.json({ message: 'Jogador Criado: ', player: playerObj });
});


router.post('/game/start', (req, res) => {
    const game = Game.getInstance();
    
    if (game.players.length >= 2) {
        game.startGame();

        cartasTesouro.forEach(carta => game.treasureDeck.createCard(carta));
        cartasDungeon.forEach(carta => game.dungeonDeck.createCard(carta));

        game.dungeonDeck.shuffle();
        game.treasureDeck.shuffle();

        game.players.forEach(player => {
            for (let p = 0; p < 4; p++) {
                let cartaDungeon = game.dungeonDeck.cards.pop();
                player.addCardToHand(cartaDungeon);
            }

            for (let t = 0; t < 4; t++) {
                let cartaTreasure = game.treasureDeck.cards.pop();
                player.addCardToHand(cartaTreasure);
            }
        });

        res.json({ message: 'Game Começou', status: game.gameStatus });
    } else {
        res.json({ message: 'Número de Players Insuficientes', status: game.gameStatus });
    }
});

router.post('/turn/kickDoor', (req, res) => {
    const { playerId } = req.body;
    const game = Game.getInstance();
    const currentPlayer = game.getCurrentPlayer();

    if (currentPlayer.id === playerId) {
        const turn = new Turn(currentPlayer);

        try {
            const card = turn.openDoor(game.dungeonDeck);

            if (!card) {
                throw new Error('Nenhuma carta foi encontrada.');
            }

            let responseMessage = `${currentPlayer.name} chutou a porta e encontrou ${card.name}`;

            if (card instanceof Monster) {
                responseMessage += `. Você está em combate com ${card.name}.`;
                game.setCurrentTurn(turn); // Persiste o turno atual
            } else if (card instanceof CurseCard) {
                card.applyEffect(currentPlayer);
                responseMessage += ` e foi afetado por uma maldição: ${card.name}.`;
                game.nextTurn(); // Avança para o próximo jogador
            } else {
                card.applyEffect(currentPlayer);
                responseMessage += ` e jogou a carta ${card.name}.`;
                game.nextTurn(); // Avança para o próximo jogador
            }

            res.json({ message: responseMessage, status: game.gameStatus, player: currentPlayer });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    } else {
        res.json({ message: 'Não é a vez desse jogador', status: game.gameStatus });
    }
});

router.post('/turn/resolveCombat', (req, res) => {
    const { playerId } = req.body;
    const game = Game.getInstance();
    const currentPlayer = game.getCurrentPlayer();

    if (currentPlayer.id === playerId) {
        const turn = game.getCurrentTurn();

        if (!turn) {
            res.status(400).json({ message: 'Não há turno em andamento.', status: game.gameStatus });
            return;
        }

        try {
            if (turn.isInCombat()) {
                turn.resolveCombat();
                let responseMessage = `${currentPlayer.name} resolveu o combate com sucesso.`;
                game.nextTurn();
                res.json({ message: responseMessage, status: game.gameStatus, player: currentPlayer });
            } else {
                res.status(400).json({ message: 'Não há combate em andamento.', status: game.gameStatus });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    } else {
        res.json({ message: 'Não é a vez desse jogador', status: game.gameStatus });
    }
});

router.post('/turn/attemptEscape', (req, res) => {
    const { playerId } = req.body;
    const game = Game.getInstance();
    const currentPlayer = game.getCurrentPlayer();

    if (currentPlayer.id === playerId) {
        const turn = new Turn(currentPlayer);

        try {
            const escapeResult = turn.attemptEscape();
            let responseMessage = `${currentPlayer.name} tentou fugir e rolou um ${escapeResult.roll}`;

            if (escapeResult.success) {
                responseMessage += '. Fuga bem-sucedida!';
            } else {
                responseMessage += '. Fuga falhou e você sofreu as consequências.';
            }

            game.nextTurn(); // Avança para o próximo jogador
            res.json({ message: responseMessage, status: game.gameStatus, player: currentPlayer });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    } else {
        res.json({ message: 'Não é a vez desse jogador', status: game.gameStatus });
    }
});

router.post('combat/startCombat', (req, res) => {
    const game = Game.getInstance();
    const currentPlayer = game.getCurrentPlayer();
})


router.get('/game/state', (req, res) => {
    const game = Game.getInstance();

    // Verificar se algum jogador atingiu o nível 10
    const winningPlayer = game.players.find(player => player.level >= 10);
    if (winningPlayer) {
        game.gameStatus = 'ended';
    }

    const gameState = {
        players: game.players.map(player => ({
            id: player.id || 'undefined',
            name: player.name || 'undefined',
            level: player.level || 0,
            race: player.race ? player.race.name : 'undefined',
            characterClass: player.characterClass ? player.characterClass.name : 'undefined',
            combatPower: player.combatPower || 0,
            hand: player.hand.map(card => {
                let cardType = 'unknown';
                if (card instanceof Monster) {
                    cardType = 'Monster';
                } else if (card instanceof CurseCard) {
                    cardType = 'CurseCard';
                } else if (card instanceof CharacterClass) {
                    cardType = 'CharacterClass';
                } else if (card instanceof Race) {
                    cardType = 'Race';
                } else if (card instanceof Item) {
                    cardType = 'Item';
                }
                return {
                    id: card ? card.id : 'undefined',
                    name: card ? card.name : 'undefined',
                    description: card ? card.description : 'undefined',
                    type: cardType
                };
            })
        })),
        currentTurn: game.currentTurn,
        gameStatus: game.gameStatus
    };

    // Incluir o jogador vencedor no estado do jogo se houver
    if (winningPlayer) {
        gameState.winner = {
            id: winningPlayer.id,
            name: winningPlayer.name,
            level: winningPlayer.level
        };
    }

    res.json(gameState);
});

router.post('/game/equipItem', (req, res) => {
    const { playerId, cartaId } = req.body;
    const game = Game.getInstance();

    const player = game.players.find(p => p.id === playerId);
    if (player) {
        const item = player.hand.find(card => card.id === cartaId);
        if (item) {
            player.equipItem(item);
            player.removeCardFromHand(item);
            res.json({ message: 'Item equipado', status: game.gameStatus });
        } else {
            res.json({ message: 'Item não encontrado', status: game.gameStatus });
        }
    } else {
        res.json({ message: 'Jogador não encontrado', status: game.gameStatus });
    }
});

router.post('/game/equipRace', (req, res) => {
    const { playerId, cartaId } = req.body;
    const game = Game.getInstance();

    const player = game.players.find(p => p.id === playerId);
    if (player) {
        if (player.race) {
            res.json({ message: 'Jogador já possui uma raça equipada', status: game.gameStatus });
            return;
        }
        const race = player.hand.find(card => card.id === cartaId);
        if (race) {
            player.equipRace(race);
            player.removeCardFromHand(race);
            res.json({ message: 'Raça equipada', status: game.gameStatus });
        } else {
            res.json({ message: 'Raça não encontrada', status: game.gameStatus });
        }
    } else {
        res.json({ message: 'Jogador não encontrado', status: game.gameStatus });
    }
});

router.post('/game/equipClass', (req, res) => {
    const { playerId, cartaId } = req.body;
    const game = Game.getInstance();

    const player = game.players.find(p => p.id === playerId);
    if (player) {
        if (player.characterClass) {
            res.json({ message: 'Jogador já possui uma classe equipada', status: game.gameStatus });
            return;
        }
        const characterClass = player.hand.find(card => card.id === cartaId);
        if (characterClass) {
            player.equipClass(characterClass);
            player.removeCardFromHand(characterClass);
            res.json({ message: 'Classe equipada', status: game.gameStatus });
        } else {
            res.json({ message: 'Classe não encontrada', status: game.gameStatus });
        }
    } else {
        res.json({ message: 'Jogador não encontrado', status: game.gameStatus });
    }
});

module.exports = router;


router.post('/turn/endTurn', (req, res) => {
    const { playerId } = req.body;
    const game = Game.getInstance();

    const player = game.players.find(p => p.id === playerId);
    console.log(player);
    if (player) {
        if (player.hand.length > 5) {
            res.json({ message: `O Jogador deve descartar ou equipar ${(player.hand.length - 5)} cartas`, status: game.gameStatus });
        } else {
            game.nextTurn();
            res.json({ message: 'Próximo Turno', status: game.gameStatus });
        }
    } else {
        res.json({ message: 'Jogador não encontrado', status: game.gameStatus });
    }
});

router.post('/game/discardCard', (req, res) => {
    const { playerId, cartaId } = req.body;
    const game = Game.getInstance();
    const player = game.players.find(p => p.id === playerId);

    if (player) {
        const card = player.hand.find(c => c.id === cartaId);

        if (card) {
            // Remove a carta da mão do jogador
            player.removeCardFromHand(card);

            // Adiciona a carta à pilha de descarte correspondente
            if (card instanceof Monster || card instanceof CurseCard) {
                game.dungeonDeck.addToDiscard(card);
            } else if (card instanceof Item || card instanceof CharacterClass || card instanceof Race) {
                game.treasureDeck.addToDiscard(card);
            }

            res.json({ 
                message: 'Carta descartada', 
                status: game.gameStatus 
            });
        } else {
            res.json({ 
                message: 'Carta não encontrada na mão do jogador', 
                status: game.gameStatus 
            });
        }
    } else {
        res.json({ 
            message: 'Jogador não encontrado', 
            status: game.gameStatus 
        });
    }
});



module.exports = router;


