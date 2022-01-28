Array.prototype.find1 = function (callback, argsThis) {
    if (typeof callback !== 'function') {
        throw `${callback} is not a function`
    }

    const length = this.length
    let i = 0
    let first = 0
    while (i < length) {
        if (callback.call(argsThis, this[i], i, this) && first == 0) {
            first++
            return this[i]
        }
        i++
    }
    return undefined

}

//测试
let a = [1, 2, 3]
let fa = a.find1((ele) => {
    return ele == 2
}) //2
console.log("🚀 ~ file: find.js ~ line 25 ~ fa ~ fa", fa)
a.find1(() => {})// undefined
