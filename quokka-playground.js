function memoize(fn) {
    const cache = Object.create(null);

    return function (...args) {
        const key = JSON.stringify(args);
        if(!cache[key]) {
            cache[key] = fn(...args);
        }
        return cache[key];
    }
}

function sum({ label }) {
    console.log('sum render');

    return {
        key: 'div',
        children: [label]
    };
}

const betterSum = memoize(sum);

console.log(betterSum(3,3));
console.log(betterSum(3,3));
console.log(betterSum(3,3));
console.log(betterSum(3,3));
console.log(betterSum(3,3));
console.log(betterSum(3,4));
console.log(betterSum(3,4));
console.log(betterSum(3,4));


