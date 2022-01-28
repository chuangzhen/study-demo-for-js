Array.prototype.every1 = function(callback,thisArg) {
    if (typeof callback !== 'function') {
        throw `${callback} is not a function`
    }

    const length = this.length
    let i = 0

    let everyStatus = true
    while (i < length) {
        if (!callback.call(thisArg,this[i],i,this)) {
            everyStatus = false
            //break中断循环,有一个是返回false的，就中断遍历，返回false，否则完成遍历，返回true
            break
        }
        i++
    }

    return everyStatus

}


//使用
let a = [2,3,4,,6,7]

let aStatus = a.every1((i) => {console.log(i);return i>3})  //2  遍历1次中止
console.log(aStatus)  //false