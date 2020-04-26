
let checkNum = parseInt(prompt('Plese write your check humber.'));
let tip = parseInt(prompt('Plese write tip amount.'));
const maxTip = 100;



if(checkNum < 0 || isNaN(checkNum) || tip < 0 || isNaN(tip) || tip > maxTip) {
    alert('Invalid value');
    checkNum = parseInt(prompt('Plese write your check number.'));
    tip = parseInt(prompt('Plese write tip.'));
}

if (checkNum && tip){
    const hundredPercent = 100;
    const tipAmount = tip / hundredPercent * checkNum;
    const totalSum = checkNum + tipAmount;
    alert(`
        Check number: ${checkNum}

        Tips: ${tip}%

        Tip amount: ${tipAmount}

        Total sum: ${totalSum}
    `); 
}