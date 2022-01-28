//Promise 是一个构造函数，有3种状态，pendding  /  fullfilled  rejected；从pendding可变为fullfilled或者rejected，不可逆
//        接收一个【回调函数fn】作为参数，并【同步】执行；fn接收2个函数参数，(resolve,reject) => {}
//                                      resolve执行，则状态变为fullfilled=>返回resolve接收的值;     rejecte执行则状态变成rejected=>返回reason存放失败的信息

// Promise构造函数暴露resolve reject方法给Promise实例去改变Promise实例自身的state和value/reason


class MyPromise {
    constructor(executor) {
        //状态
        this.state = 'pendding'
        //resolve返回的值
        this.value = undefined
        // reject或者失败返回的原因
        this.reason = undefined

        //用于存放异步回调，resolve, reject都因异步代码没有同步执行时，state保持在pendding，等等执行resolve, reject状态才改变，这是在then中将then的回调函数存放入下边的队列中，等待resolve reject执行
        this.resolveCallbacks = []
        this.rejectCallbacks = []


        //成功函数
        let resolve = (val) => {
            //state为改变，pendding时，执行成功函数，改变状态，状态已改变的不可再执行成功函数
            //限制暴露出去的resolve 和reject被多次执行
            if (this.state === 'pendding') {
                this.state = 'fullfilled'
                this.value = val
                this.resolveCallbacks.forEach(fn => fn())
            }
        }
        // 失败函数
        let reject = (reason) => {
            //限制暴露出去的resolve 和reject被多次执行
            if (this.state === 'pendding') {
                this.state = 'rejected'
                this.reason = reason
                this.rejectCallbacks.forEach(fn => fn())
            }
        }

        //【同步】执行Promise接收的回调函数参数-将Promise实例自身改变自身state和value的方法暴露出去
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }

    }
}

//链式调用 resolve 方法
MyPromise.resolve = function (val) {
    return new MyPromise((res, rej) => {
        res(val)

    })
}

//链式调用 reject 方法
MyPromise.reject = function (reason) {
    return new MyPromise((res, rej) => {
        rej(reason)

    })
}

//.then方法： 关联一个已改变状态的promise，将value 或者 reason 的结果抛给 then的参数（是2个函数）
// 接收2个回调函数参数,onFullfilled,onRejected,它们均返回一个新的promise
// then不能是箭头函数，会取不到实例this的值
// onFullfilled ,onRejected 必须在Promise执行完resolve 、reject改变状态之后才能执行then的回调函数，并将Promise种对应的value赋值给 onFullfilled , reason赋值给 onRejected
// onFullfilled 函数接收Promise 执行完resolve后的返回值
// onRejected 函数接收Promise异常的或者reject后的reason异常信息
MyPromise.prototype.then = function (onFullfilled, onRejected) {
    const _this = this
    //兼容then回调函数参数中漏传函数参数或者传的参数不是函数---导致的onFullfilled/onRejected is not a function JS报错情况
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : (val) => val
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => reason

    //then的回调执行的resolve返回的是promise2本身，引用循环，promise2的value是promise2本身，其他的then链上的resolve回调就取不到正确的值了
    //校验then的onFullfilled返回的值是否等于自身
    const onResolvePromise = function (promise2, x, nextResolve, nextReject) {
        if (promise2 === x) {
            return nextReject(new TypeError('then的回调函数返回的值是then返回的新的promise，引用循环调用了！'))
        }
        try {
            nextResolve(x)
        } catch (error) {
            nextReject(error)
        }
    }


    let myPromise2 = new MyPromise((nextResolve, nextReject) => {
        if (_this.state === 'fullfilled') {
            let x = onFullfilled(_this.value)
            onResolvePromise(myPromise2, x, nextResolve, nextReject)
        }

        if (_this.state === 'rejected') {
            let x = onRejected(_this.reason)
            onResolvePromise(myPromise2, x, nextResolve, nextReject)
        }
        //当Promise构造函数暴露给
        if (_this.state === 'pendding') {
            _this.resolveCallbacks.push(() => {
                let x = onFullfilled(_this.value)
                onResolvePromise(myPromise2, x, nextResolve, nextReject)
            })
            _this.rejectCallbacks.push(() => {
                let x = onRejected(_this.reason)
                onResolvePromise(myPromise2, x, nextResolve, nextReject)
            })
        }
    })

    return myPromise2


}

//catch方法--等同于then的第二个函数参数reject
MyPromise.prototype.catch = function (onRejected) {
    this.then(null,onRejected)
}

//all 方法接收一个数组
//  数组元素是promise实例-则等待所有的promise实例返回后结果后返回对应顺序的结果数组
//  返回值是一个已改变状态的promise实例
MyPromise.all = function (promises) {
    let result = []
    let i = 0
    function processData(idx, data, resolve) {
        result[idx] = data
        i++
        if (i === promises.length) {
            resolve(result)
        }
    }

    return new MyPromise((resolve, reject) => {
        //promise不是数组
        if (!promises instanceof Array) {
            reject(new TypeError('object is not iterable'))
            return false
        }
        for (let index = 0; index < promises.length; index++) {
            const element = promises[index];

            if (element instanceof MyPromise) {
                element.then(res => {
                    processData(index, res, resolve)
                }, reject)
            } else {
                //元素非MyPromise类型的情况下
                processData(index, element, resolve)
            }



        }


    })


}

// race(irerable) 接收一个可迭代的对象，如数组
// 数组元素全部是Promise类型，返回最快改变状态的那个Promise
// 存在数组元素非Promise类型，直接返回以第一个非Promise元素为值的已改变状态的Promise
MyPromise.race = function (promises) {

    return new MyPromise((resolve, reject) => {
        //promise不是数组
        if (!promises instanceof Array) {
            reject(new TypeError('object is not iterable'))
            return false
        }
        for (let index = 0; index < promises.length; index++) {
            const element = promises[index];
            //元素是一个MyPromise对象
            if (element instanceof MyPromise) {
                element.then(
                    (res) => {
                        resolve(res)
                    }, reject)
            } else {
                //元素非MyPromise
                resolve(element)
            }

        }

    })
}


//allSettled(iterable) 接收一个可迭代的对象 如数组
//当时所有的Promise类型元素全部变更状态后，按顺序返回对应Promise的结果【对象数组】（[{status:'fullfilled',value:'123'},{status:'rejected',reason:'原因'}]）
MyPromise.allSettled = function (promises) {
    let result = []
    let i = 0

    function resolveData(index, data, resolve) {
        result[index] = data
        i++
        if (i === promises.length) {
            resolve(result)
        }
    }


    return new MyPromise((resolve, reject) => {
        if (!promises instanceof Array) {
            reject(new TypeError('object is not a iterable'))
            return false
        }
        for (let index = 0; index < promises.length; index++) {
            const element = promises[index];
            if (element instanceof MyPromise) {
                element.then(
                    //resolve
                    (res) => {
                        let data = { status: 'fullfilled', value: res }
                        resolveData(index, data, resolve)
                    },
                    //reject
                    (err) => {
                        let data = { status: 'rejected', reason: err }
                        resolveData(index, data, resolve)
                    }
                )
            } else {
                let data = { status: 'fullfilled', value: element }
                resolveData(index, data, resolve)
            }

        }
    })
}

//【验证测试】MyPromise.allSettled
let as1 = new MyPromise((res) => {setTimeout(() => {
    res(111)
}, 3000);})
let as2 = new MyPromise((res) => {setTimeout(() => {
    res(222)
}, 5000);})
let as3 = new MyPromise((res,rej) => {setTimeout(() => {
    rej(333)
}, 1000);})
MyPromise.allSettled([as1,as2,as3,'444']).then(res => {
    console.log(res) //结果： [{ status: 'fullfilled', value: 111 },{ status: 'fullfilled', value: 222 },{ status: 'rejected', reason: 333 },{ status: 'fullfilled', value: '444' }]
    
})

//【测试race】MyPromise.race方法
// let r1 = new MyPromise((res) => {setTimeout(() => {
//     res(111)
// }, 3000);})
// let r2 = new MyPromise((res) => {setTimeout(() => {
//     res(222)
// }, 5000);})
// let r3 = new MyPromise((res,rej) => {setTimeout(() => {
//     rej(333)
// }, 1000);})
// // console.log(MyPromise.race([r1,'4444']))    //MyPromise<..onFullfilled..444>
// // MyPromise.race([r1,r2]).then(res => {console.log(res)}) //MyPromise<..onFullfilled.111>
// MyPromise.race([r1,r3]).then(res => {console.log(res)},err => {console.log(err)})    //触发err  MyPromise<..onRejected..333>





// 【验证测试】多次调用resolve，只要第一次调用的才生效
// let a1 = new MyPromise((res) => {
//     setTimeout(() => {
//         res('123')
//     }, 2000);

//     setTimeout(() => {
//         res('222')
//     },4000)
// })
// setTimeout(() => {
//     console.log(a1,'=3000')
// }, 3000);
// setTimeout(() => {
//     console.log(a1,'=5000')
// }, 5000);



//【验证测试】--resolve reject快捷创建MyPromise 、MyPromise.all方法
// let p1 = MyPromise.resolve('123')
// let p3 = MyPromise.reject('333')
// console.log(p1)

// let p2 = new MyPromise((res, rej) => {
//     setTimeout(() => {
//         res('222')
//     }, 5000);
// })
// // console.log(MyPromise.all([p1, p2]));
// MyPromise.all([p1, p2, '222333', p3]).then(res => {
//     console.log(res, 'res===');
// }, (err) => {
//     console.log(err, 'err==')
// })



//【验证测试】--引用循环.then链式调用
// let mp1 = new Promise((res, rej) => {
//     setTimeout(() => {
//         res('11111111111112')
//     }, 3000)
// })
// mp1.name = 'mp1'

// let mp11 = mp1.then((r) => {
//     return new MyPromise((res) => {
//         setTimeout(() => {
//             res('222222222')
//         }, 2000);
//     })
// })
// mp11.name = 'mp11'
// setTimeout(() => {
//     console.log(mp11, mp1)
// }, 6000);
// let mp111 = mp11.then(res => {
//     console.log(res, 'ccc')
//     return 'mp111'
// })