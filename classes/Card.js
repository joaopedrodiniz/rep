class Card {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    play() {
        throw new Error('Método play() deve ser implementado nas subclasses');
    }
}

module.exports = { Card };
