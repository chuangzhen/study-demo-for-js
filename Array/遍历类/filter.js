Array.prototype.filter1 = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw `${callback} is not a function`
    }

    const length = this.length
    let i = 0
    let j = 0
    let newFilterArr = []
    while (i < length) {
        console.log(callback.call(thisArg, this[i], i, this));
        if (!!callback.call(thisArg, this[i], i, this)) {
            newFilterArr[j] = this[i]
            j++
        }
        i++
      
    }
    return newFilterArr
}

let a = [1, 2, 3, , 5, 6]
let Obj = {
    name: '我是map'
}
let a1 = a.filter1((i) => {
    //{}  a1
    console.log(this, 'a1')

    return i>2
}, Obj)

console.log(a1,a1.length) // [3,5,6]
