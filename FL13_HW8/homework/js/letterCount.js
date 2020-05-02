
function letterCount(str, letter) {
    const LETTERS = str.split('');
    const FILTERED_LETTERS = LETTERS.filter( element => {
       return element.toLowerCase() === letter;
    })
    return FILTERED_LETTERS.length;   
} 

console.log(letterCount("Maggy","g"));