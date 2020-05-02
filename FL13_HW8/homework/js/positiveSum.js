
function positiveSum(arr) {
    const POSITIVE_NUMS = arr.filter( element => element > 0);
    return POSITIVE_NUMS.reduce((sum, element) => sum + element)
}

console.log(positiveSum([0,-3,5,7]));