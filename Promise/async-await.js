//1. async await 是es6出现的Promise的语法糖，用于解决promise链式调用时传参复杂的问题，让异步程序看起来像同步程序

//【1】async : 用于声明一个函数是异步函数，可以是函数语句、函数表达式、Lambda表达式
// 函数内部有return  一个直接量，则async函数返回直接量通过Promise.resolve()封装的Promise对象
// 函数内部没有return直接量，则async返回一个fullfilled状态,值是undefined Promise对象

async function testAsc(){
    console.log(111)
}
console.log(testAsc())   //Promise { undefined }

async function testAsc2(){
    return 123
}
testAsc2().then(res => {
    console.log(res)   //123
})