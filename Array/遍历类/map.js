Array.prototype.map1 = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw `${callback} is not a function`
    }

    const length = this.length
    let i = 0
    let newArr = []
    let j = 0
    while (i < length) {
        newArr[j] = callback.call(thisArg, this[i], i, this)
        i++
        j++
    }
    return newArr

}



let a = [1, 2, 3, , 5, 6]
let Obj = {
    name: '我是map'
}
let a1 = a.map((i) => {
    //{}  a1
    console.log(this, 'a1')

    return i * 2
}, Obj)

console.log(a1) // [2,4,6,empty,10,12]

let a2 = a.map(function aa(i) {
    //Obj ,a2
    console.log(this, 'a2')

    return i * 2
}, Obj)
console.log(a2) // [2,4,6,empty,10,12]

let a3 = a.map(function aa(i) {
    //windows ,a2
    console.log(this, 'a3')

    return i * 2
})
console.log(a3) // [2,4,6,empty,10,12]