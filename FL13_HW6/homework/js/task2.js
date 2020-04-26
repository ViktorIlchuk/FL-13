
let inputWord = prompt('Please enter word.');
const wordLength = inputWord.length;
const remaindOfDivid = 2;
const digitTwo = 2;



if(inputWord.trim().length === 0) {
    alert('Invalid value')
} else if( inputWord.length % remaindOfDivid === 1 ){
    let middlePosition = Math.floor(wordLength / digitTwo)
    let result = inputWord.charAt(middlePosition);
    console.log(result);
} else {
    let middleStart = wordLength / digitTwo - 1;
    let result = inputWord.substr(middleStart, digitTwo)
    console.log(result);
}
