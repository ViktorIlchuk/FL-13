class Fighter {
    constructor(object) {
        this._name = object.name
        this._damage = object.damage
        this._hp = object.hp
        this._strength = object.strength
        this._agility = object.agility
        this._totalHealth = object.hp
        this._wins = 0
        this._losses = 0
    }

    getName() {
        return this._name;
    }

    getDamage() {
        return this._damage;
    }

    getStrength() {
        return this._strength;
    }

    getAgility() {
        return this._agility;
    }

    getHealth() {
        return this._hp;
    }

    setHealth(healthAmount) {
        this._hp = healthAmount;
    }

    getWins() {
        return this._wins;
    }

    getLosses() {
        return this._losses;
    }

    addWins() {
        this._wins++;
    }

    addLosses() {
        this._losses++;
    }

    getTotalHealth() {
        return this._totalHealth;
    }

    attack(defender) {
        const MULTIPLIER = 101;
        const RANDOM_NUMBER = Math.floor(Math.random() * MULTIPLIER);

        if(RANDOM_NUMBER > defender.getStrength() + defender.getAgility()) {
            if(defender.dealDamage(this.getDamage()) === 0) {
                console.log(`${this.getName()} has won!`)
                this.addWins();
            } else {
                console.log(`${this.getName()} makes ${this.getDamage()} damage to ${defender.getName()}`)
            }    
        } else {
            console.log(`${this.getName()} attack missed`)
        }
    }

    logCombatHistory() {
        console.log(`Name: ${this.getName()}, Wins: ${this.getWins()}, Losses: ${this.getLosses()}`)
    }

    heal(healthAmount) {
        this.setHealth(healthAmount + this.getHealth());
        if(this.getHealth() > this.getTotalHealth()) {
            this.setHealth(this.getTotalHealth());
        }
    }

    dealDamage(healthAmount) {
        this.setHealth(this.getHealth() - healthAmount);
        if(this.getHealth() <= 0) {
            this.setHealth(0);
            this.addLosses();
        }
        return this.getHealth();
    }
}

function battle(firstFighter, secondFighter) {
    if(firstFighter.getHealth() <= 0) {
        console.log(`${firstFighter.getName()} is dead and can't fight!`)
    } else if(secondFighter.getHealth() <= 0) {
        console.log(`${secondFighter.getName()} is dead and can't fight!`)
    } else {
        firstFighter.attack(secondFighter)
        if (firstFighter.getHealth() === 0 || secondFighter.getHealth() === 0) {
            return; 
        }
        battle(secondFighter, firstFighter)
    }
}

let fiter1 = new Fighter({name: 'Maximus', damage: 20, hp: 100, agility: 15, strength: 20});
let fiter2 = new Fighter({name: 'Commodus', damage: 25, hp: 90, agility: 20, strength: 25});

battle(fiter1, fiter2);