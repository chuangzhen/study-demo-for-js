Array.prototype.some1 = function(callback,thisArg) {
    if (typeof callback !== 'function') {
        throw `${callback} is not a function`
    }

    const length = this.length
    let i = 0

    let someStatus = false
    while (i < length) {
        if (!!callback.call(thisArg,this[i],i,this)) {
            someStatus = true
            //break中断循环
            break
        }
        i++
    }

    return someStatus

}


//使用
let a = [2,3,4,,6,7]

let aStatus = a.some1((i) => {console.log(i);return i>3})  //2 3 4  遍历3次中止
console.log(aStatus)  //true