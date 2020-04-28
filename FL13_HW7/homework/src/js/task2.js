const startPrize = 0;
const startPossibleMaxPrize = 100;
const startMaxInPocket = 5;
const startAttempts = 3;


if (confirm('Do you want to play a game?')) {
    let gameInProgress = true;
    let prize = startPrize;
    let possibleMaxPrize = startPossibleMaxPrize;
    let prizeMultiplierDivider = 2;
    let maxInPocket = startMaxInPocket;
    let pocketIncreaceBy = 5;
    let thankYouShown = false;
    let maxAttemps = startAttempts;

    while (gameInProgress) {
        let attempts = 3;
        let winner = false;
        let possiblePrize = possibleMaxPrize;
        let randomNumber = Math.floor(Math.random() * Math.floor(maxInPocket + 1));
        thankYouShown = false;

        while (attempts > 0) {
            if (attempts < maxAttemps && possiblePrize > 0) {
                possiblePrize /= prizeMultiplierDivider;
            }

            if (parseInt(prompt(`Choose a roulette pocket number from 0 to ${maxInPocket}\n` +
                    `Attempts left: ${attempts}\n` +
                    `Total prize: ${prize}$\n` +
                    `Possible prize on current attempt: ${possiblePrize}$`, 0), 10) === randomNumber) {
                winner = true;
                prize += possiblePrize;
                break;
            } else {
                attempts--;
            }
        }

        if (winner) {
            alert(`Congratulation, you won! Your prize is: ${prize} $.`);
        } else {
            thankYouShown = true;
            alert(`Thank you for your participation. Your prize is: ${prize} $`);
        }


        if(winner === false) {
            gameInProgress = confirm('Do you want to try again?');
            if(gameInProgress) {
                prize = startPrize
                possibleMaxPrize = startPossibleMaxPrize;
                maxInPocket = startMaxInPocket;
                maxAttemps = startAttempts;
            }
        } else {
            gameInProgress = confirm('Do you want to continue?');
            possibleMaxPrize *= prizeMultiplierDivider;
            maxInPocket += pocketIncreaceBy;
        }
        
    }

    if (!thankYouShown) {
        alert(`Thank you for your participation. Your prize is: ${prize} $`);
    }
} else {
    alert('You did not become a billionaire, but can.');
}