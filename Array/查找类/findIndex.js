Array.prototype.findIndex1 = function (callback, argsThis) {
    if (typeof callback !== 'function') {
        throw `${callback} is not a function`
    }

    const length = this.length
    let i = 0
    let first = 0
    while (i < length) {
        if (callback.call(argsThis, this[i], i, this) && first == 0) {
            first++
            return i
        }
        i++
    }
    return -1

}

//测试
let a = [1, 2, 3]
console.log(a.findIndex1((ele) => {
    return ele == 2
})); //2的下标是1
console.log(a.findIndex1(() => {}));// -1