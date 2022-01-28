//从数组开头弹出第一个数组元素，返回被删除的数组元素，空数组返回undefined,改变数组的长度
Array.prototype.shift1 = function () {

  const thisLength = this.length || 0
  let i = 1

  if (thisLength == 0) {
    return undefined
  }
  let arr = [1, 2, 3, 4, , 7, ]
  let shiftValue = this[0]
  while (i < thisLength ) {
    this[i-1] = this[i]
    i++
  }
  this.length = thisLength - 1
  return shiftValue

}
//验证
let a = [1, 2, 3, 4, , 6, ]
let b = [1, 2, 3, 4, , 7, ]

console.log(a.shift(), a, a.length)  // 1 [ 2, 3, 4, <1 empty item>, 6 ] 5
console.log(b.shift1(), b, b.length) // 1 [ 2, 3, 4, undefined, 7 ] 5
console.log(b.shift1(), b, b.length) // 2 [ 3, 4, undefined, 7 ] 4
console.log([].shift1()) //undefined