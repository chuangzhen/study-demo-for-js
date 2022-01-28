//不需要参数，从数组末尾弹出最后一个元素，返回被弹出的元素，改变原数组
Array.prototype.pop1 = function() {
    
    const thisLength = this.length||0
    //数组的长度最小是0
    if (thisLength == 0) {
      return undefined
    }
    let popValue = this[thisLength-1]
    this.length = thisLength - 1 
   
    return popValue
    
}
//验证
let a = [1,2,3,4,,6]
let b = [1,2,3,4,,7]

console.log(a.pop(),a,a.length)  //6 [ 1, 2, 3, 4, <1 empty item> ] 5
console.log(b.pop1(),b,b.length)  //7 [ 1, 2, 3, 4, <1 empty item> ] 5
console.log([].pop1())  //undefined
