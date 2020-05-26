const intervalDrive = 2000;
const intervalStop = 1500;
const maxSpeeding = 30;

const Vehicle = function(color, engine) {
    this.color = color;
    this.engine = engine;
    this.maxSpeed = 70;
    Object.defineProperty(this, 'isDrive', {
        value: undefined,
        writable: true
    })
    Object.defineProperty(this, 'isBraking', {
        value: true,
        writable: true
    })
    Object.defineProperty(this, 'driveSpeed', {
        value: 0,
        writable: true
    })
}

Vehicle.prototype.upgradeEngine = function(newEngine, maxSpeed) {
    if(!this.isDrive) {
        this.engine = newEngine;
        this.maxSpeed = maxSpeed;
    }
}

Vehicle.prototype.outputStopInformation = function(maxSpeed) {
    console.log(`Vehicle is stopped. Maximum speed during the drive was ${maxSpeed}`)
}

Vehicle.prototype.getInfo = function() {
    return Object.assign({}, this)
}

Vehicle.prototype.drive = function() {
    if(!this.isDrive) {
        this.isDrive = true;
        this.isBraking = false;
        let intervalId = setInterval( () => {
            if(!this.isDrive) {
                clearInterval(intervalId)
            }
            this.driveSpeed += 20
            console.log(this.driveSpeed);
            if (this.driveSpeed >= this.maxSpeed && this.isDrive) {
                console.log('speed is too high, SLOW DOWN!');
            }
        }, intervalDrive)  
    }
}

Vehicle.prototype.stop = function() {
    if(this.isDrive) {
        this.isBraking = true;
        this.isDrive = false;
        const maxSpeed = this.driveSpeed;
        let intervalId = setInterval( () => {
            if(!this.isBraking) {
                clearInterval(intervalId)
            }
            this.driveSpeed -= 20;
            console.log(this.driveSpeed);
            if(this.driveSpeed <= 0) {
                this.outputStopInformation(maxSpeed)
                clearInterval(intervalId)
            }
        }, intervalStop)
    }
}


const Car = function(model, color, engine) {
    Vehicle.call(this, color, engine);
    this.model = model;
    this.maxSpeed = 80;
}

Car.prototype = Object.create(Vehicle.prototype)

Car.prototype.changeColor = function(newColor) {
    if(newColor === this.color) {
        console.log('The selected color is the same as the previous, please choose another color.')
    } else {
        this.color = newColor;
    }
}

Car.prototype.outputStopInformation = function(maxSpeed) {
    console.log(`Car ${this.model} is stopped. Maximum speed during the drive was ${maxSpeed}`)
}

const Motorcycle = function(...arg) {
    Car.apply(this, arg)
    this.maxSpeed = 90;
}

Motorcycle.prototype = Object.create(Vehicle.prototype)

Motorcycle.prototype.drive = function() {
    if(!this.isDrive) {
        this.isDrive = true;
        this.isBraking = false;
        console.log('Let’s drive')
        let intervalId = setInterval( () => {
            const maxOverheatSpead = this.maxSpeed + maxSpeeding;
            if(!this.isDrive) {
                clearInterval(intervalId)
            }
            if( maxOverheatSpead <= this.driveSpeed) {
                clearInterval(intervalId)
                console.log('Engine overheating')
                this.stop()
            }
            this.driveSpeed += 20
            console.log(this.driveSpeed);
            if (this.driveSpeed >= this.maxSpeed && this.isDrive) {
                console.log('speed is too high, SLOW DOWN!');
            }
        }, intervalDrive)
    }
}

Motorcycle.prototype.outputStopInformation = function() {
    console.log(`Motorcycle ${this.model} is stopped. Good drive`)
}


