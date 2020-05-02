function isBigger(a, b) {
    return a > b;
}

function countPoints(arr) {
    const PARSED_ARR = arr.map( element => element.split(':'))
    const RESULT = [];
    
    PARSED_ARR.map( element => {
        if(isBigger(element[0], element[1])){
            return RESULT.push(3)
        } else if(element[0] === element[1]){
            return RESULT.push(1);
        } else {
            return RESULT.push(0)
        }
    })

    return RESULT.reduce((res, el) => res + el);
}

console.log(countPoints(['3:1','1:0','0:0','1:2','4:0','2:3','1:1','0:1','2:1','1:0']));
