Array.prototype.reduce1 = function (callback, initailValue, thisArg) {
    if (typeof callback !== 'function') {
        throw `${callback} is not a function`
    }
    const length = this.length
    let i = 0
    let total = initailValue
    //没有初始值的时候，取数组第一个值为初始值
    if (typeof initailValue === 'undefined') {
        callback.call(thisArg, total, this[i], i, this)
        total = this[0]
        i = 1
    }
    while (i < length) {
        if (i in this) {
            total = callback.call(thisArg, total, this[i], i, this)
        }
        i++
    }
    return total
}


let a = [1, 2, 3, 4, , 5]

let b = a.reduce1((total, next) => {
    console.log(next);
    return total + next
})
console.log("🚀 ~ file: reduce.js ~ line 21 ~ b ~ b", b) //15