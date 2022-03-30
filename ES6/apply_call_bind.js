/**
 * 手写 call、apply  / bind
 * Function.prototype.call(obj,arg1,arg2)    : 改变调用call的实例(obj.fuc)的this指向，参数是多个参数，分割；立即执行直接返回结果
 * Function.prototype.apply(obj,[arg1,arg2]) : 改变调用apply的实例(obj.fuc)的this指向，参数是数组；立即执行直接返回结果
 * 
 * apply 和bind的区别就在于传参从不同，apply参数放在数组中，call直接顺序排列
 * 
 * Function.prototype.bind(obj,arg1,arg2...) : 改变调用bind的函数的this指向，参数为，分割的参数；返回一个新的函数
 */


Function.prototype.myCall = function(context) {
        
    var context = context || window
    //给新的对象设置一个临时属性fn,fn指向this，是一个函数体，即指向调用myCall的实例（也就是目标函数）
    context.fn = this // 如下测试用例中，this指向的是obj1.getName函数
    //arguments是myCall函数的参数类数组对象，去除第一个的context对象参数，其他的就是目标函数如getName要接受的参数了
    var args = [...arguments].slice(1)
    //立即执行函数fn,
    var res = context.fn(...args)
    //删除目标对象context的临时属性
    delete context.fn
    //返回结果
    return res
}
    //测试
    let obj1 = {name:'obj1',getName:function(x,y,z) { return this.name+ '-' + x + '-'+ y + '-'+ z}}
    let obj2
    obj1.getName() // obj1---,this指向obj1
    obj1.getName.myCall(obj2,1,2,3)   //obj2-1-2-3 ,this指向obj2


Function.prototype.myApply = function(context) {
    var context = context || window
    context.fn = this
    var args = arguments?.[1] || []
    var res = context.fn(...args)
    delete context.fn
    return res
}
    //测试
    obj1.getName.myApply(obj2,[1,2,3])   //obj2-1-2-3 ,this指向obj2


Function.prototype.myBind = function(context) {
    if (typeof _this !== 'function') {
        throw new TypeError('type error')
    }
    var _this = this
    var args = [...arguments].slice(1) || []

    return function F() {
        if (_this instanceof F) {
            return _this(...args)
        }else{
            return _this.call(context,...args)
        }
    }
}

//测试
obj1.getName.myBind(obj2,1,2,3)()   //obj2-1-2-3 ,this指向obj2