//Generator函数是一个生成器，是异步编程的一种解决方式，可以打断暂停js函数的内部执行
/**特征
 * 1.函数名之前有*号标识
 * 2.函数体内使用yield 表达式，定义不同暂停中断时next函数返回的值，可以有多个
 * 3.Generator函数返回一个iterator对象(迭代器对象)，对象没有具体值，只要next函数，依次调用iterator.next()函数时返回对应的值
 * 4.next()方法接收参数，该参数会覆盖上一个yield表达式的值，第一个next参数无用。
 * 5.在一个生成器内部执行另一个生成器，即是yield* bar()   //bar()是另一个generator函数
 * 6.在生成器内部，yield 右边的表达式的值会在下一次执行next(p)的时候，
 *   将上一个yiled的表达式值赋值给左边的变量，当next带了参数p，则p会覆盖yield右侧表达式的值，将p赋值给左边变量result
 */ 
    
    function* generator() {
        let x = yield 5 + 6 + 4
        console.log(x,'<==x');
        let y = yield x*2
        console.log(y,'<==y')
    }




/**
 *  iteration接口类型-数据类型---Array  Map Set  类数组对象 arguments 等等
 * 【注意】:普通的object对象没有实现iterator接口，不是iterator类型的数据结构
 *  1. for(i of values){}    for(key in values){}的区别
 *  for of 只能遍历iterator接口类型的数据结构 如Array等，但是普通object对象不是iterator类型的，for of 不能遍历普通对象
 */
