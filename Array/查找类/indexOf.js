Array.prototype.indexOf1 = function (data) {
    const length = this.length
    let i = 0
    let first = 0
    while (i < length) {
        if (this[i] === data && first == 0) {
            first++
            return i
        }
        i++
    }
    return -1
}

//测试
let obj1 = {
    a: 1
}
let a = [obj1, 2, 3]
console.log(a.indexOf1(obj1)); //obj1的下标是0
console.log(a.indexOf1(undefined), '---'); // -1