Array.prototype.reduceRight1 = function (callback, initailValue, thisArg) {
    if (typeof callback !== 'function') {
        throw `${callback} is not a function`
    }
    const length = this.length
    let i = length - 1
    let total = initailValue
    //没有初始值的时候，取数组最后一个值为初始值
    if (typeof initailValue === 'undefined') {
        //执行一次第一个元素的callback，不取该callbacl的返回值
        callback.call(thisArg, initailValue, this[i], i, this)
        //将第一个元素的值设置成返回值
        total = this[length - 1]
        i -= 1
    }
    while (i >= 0) {
        //判断数组元素是否是被删除或者未被赋值的，跳过不执行callback
        if (i in this) {
            total = callback.call(thisArg, total, this[i], i, this)
        }
        i--
    }
    return total
}


let a = [1, 2, 3, 4, , 5]

let b = a.reduceRight((total, next) => {
    console.log(next)
    return total + next
})
console.log("🚀 ~ file: reduce.js ~ line 21 ~ b ~ b", b) //15