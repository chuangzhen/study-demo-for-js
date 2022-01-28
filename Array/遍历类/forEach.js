Array.prototype.forEach1 = function (callback, thisArg) {
    //this指当前使用forEach1方法的数组，thisArg 用于改变callack的this指向到thisArg上,没传时callback的this指向全局对象
    if (typeof callback !== 'function') {
        throw `${callback} is not a function`
    }

    const length = this.length
    let i = 0
    while (i < length) {
        //没有初始化的值不遍历
        if (i in this) {
            callback.call(thisArg, this[i], i, this)
        }
        i++
    }
}

// 使用
let Obj = {
    name: '张三'
}
let a = [1, 2, 3, 4, , 6]
// 不指定thisArg参数
a.forEach1((function (i) {
    console.log('this=', this)     //window
}))
// 传thisArg = Obj
a.forEach1((function (i) {
    console.log('this=', this)     //Obj
}), Obj)
// 传thisArg = Obj   callbcak是箭头函数，不传递this
a.forEach1(( (i) => {
    console.log('this=', this)    //undefined
}), Obj)