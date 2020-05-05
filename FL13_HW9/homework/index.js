// Task 1

function convert(...arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = typeof arr[i] === 'number' ? String(arr[i]) : Number(arr[i]);
    }

    return arr;
}

// Task 2

function executeforEach(arr, func) {
    for(let i = 0; i < arr.length; i++) {
        func(arr[i]);
    }
}

// Task 3

function mapArray(arr, func) {
    let transformedArr = [];

    executeforEach(arr, el => {
        transformedArr.push(func(Number(el))); 
    });

    return transformedArr;      
}

// Task 4
  
function filterArray(arr, func) {
    const FILTERED_ARR = [];

    executeforEach(arr, el => {
        if(func(el)) {
            FILTERED_ARR.push(el);
        }
    });

    return FILTERED_ARR;
}

// Task 5
function containsValue(arr, value) {
    let result = false;

    executeforEach(arr, el => {
        if(el === value) {
            result = true;
        }
    });
    
    return result;
}

// Task 6

function flipOver(str) {
    let flippedStr = '';
    
    for (let i = str.length - 1; i >= 0; i--) { 
        flippedStr += str[i];
    }

    return flippedStr;
}

// Task 7

function makeListFromRange(arr) {
    let listArr = [];
    let start, end;

    if (arr[0] <= arr[1]) {
        start = arr[0];
        end = arr[1];
    } else {
        start = arr[1];
        end = arr[0];
    }
    
    for(let i = start; i <= end; i++){
       listArr.push(i);
    }
    
    return listArr;
}

// Task 8

const fruits = [
    { name: 'apple', weight: 0.5 },
    { name: 'pineapple', weight: 2 }
];

function getArrayOfKeys(arr, value) {
    const ARR_2 =[];

    executeforEach(arr, el => {
        ARR_2.push(el[value]);
    });

    return ARR_2;
}
 
//Task 9

function substitute(arr) {
    const MAX_NUM = 20;
    const MIN_NUM = 10;
    return mapArray(arr, el => {
        if(el < MAX_NUM && el > MIN_NUM) {
            return '*';
        } else {
            return el;
        }
    });
}

// Task 10 

const YEAR = 2020, DAY = 2, MS_IN_DAY = 86400000;
const date = new Date(YEAR, 0, DAY);

function getPastDay(date, days) {
    return new Date(date - days * MS_IN_DAY).getDate();
}

// Task 11

function formatDate(date) {
    const MIN_DUBL_NUM = 10;
    const YYYY = date.getFullYear();  
    const DD = date.getDate() < MIN_DUBL_NUM ? '0' + date.getDate() : date.getDate();
    const HH = date.getHours() < MIN_DUBL_NUM ? '0' + date.getHours() : date.getHours();
    const MIN = date.getMinutes() < MIN_DUBL_NUM ? '0' + date.getMinutes() : date.getMinutes();
    let mm = date.getMonth() + 1;  

    if(mm < MIN_DUBL_NUM) {
        mm = '0' + mm;
      }

    return `${YYYY}/${mm}/${DD} ${HH}:${MIN}`;
}


  


  









  
  