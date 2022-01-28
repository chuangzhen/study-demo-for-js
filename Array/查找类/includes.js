Array.prototype.includes1 = function (data) {
    const length = this.length
    let i = 0
    let first = 0
    let hasData = false
    while (i < length) {
        if (this[i] === data && first == 0) {
            first++
            hasData = true
        }
        i++
    }
    return hasData
}

//测试
let obj1 = {
    a: 1
}
let obj2 = {
    a: 1
}
let obj3 = obj1
let a = [obj1, 2, 3, undefined]
console.log(a.includes1(obj1)); //true
console.log(a.includes1(obj2)); //false
console.log(a.includes1(obj3)); //true
console.log(a.includes1(), '---'); // true
