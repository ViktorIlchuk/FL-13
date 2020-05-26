function asign(newObj) {
    for(let i = 1; i < arguments.length; i++) {
        let srcObj = arguments[i];
        for(let nextKey in srcObj) {
            if (srcObj.hasOwnProperty(nextKey)) {
                newObj[nextKey] = srcObj[nextKey];
            }
        }
    }
    console.log(newObj)
}

const painmentCard = {cash: '100$'};
const creditCard = {creditLimit: '50$', cash: '200$'}

const universalCard = asign({}, creditCard, painmentCard);