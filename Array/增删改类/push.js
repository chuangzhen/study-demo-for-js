//接受一个或者若干个参数，从数组末尾依次插入，返回数组新的长度，改变原数组
Array.prototype.push1 = function(...args) {
    
    const length = args.length
    let thisLength = this.length
    let i = 0
    while (i < length) {
      this[thisLength + i] = args[i]
      i ++
    }
    return this.length
    
}
//验证
let a = [1,2,3,4,,6]
let b = [1,2,3,4,,6]
console.log(a.push(undefined),a)  //10 [ 1, 2, 3, 4, <1 empty item>, 6, 7, 8, 9, 10 ]
console.log(b.push1(),b) //10 [ 1, 2, 3, 4, <1 empty item>, 6, 7, 8, 9, 10 ]