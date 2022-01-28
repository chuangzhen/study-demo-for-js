//接受一个或多个参数，从数组开头插入一个或者若干个元素，返回数组新的长度，改变原数组
Array.prototype.unshift1 = function (...args) {
  let arr = [...this]
  const argsLength = args.length || 0
  const thisLength = this.length || 0

  let i = 0
  if (argsLength == 0) {
    return this.length
  }
  while (i < argsLength + thisLength) {
    if (i < argsLength) {
      this[i] = args[i]
    }else{
      this[i] = arr[i - thisLength -1]
    }
    i++
  }
  return this.length

}
//验证
let a = [1, 2, 3, 4, , 6]
let b = [1, 2, 3, 4, , 7]

console.log(a.unshift(9,10), a, a.length) //8 [ 9, 10, 1, 2, 3, 4, <1 empty item>, 6 ] 8
console.log(b.unshift(11,12), b, b.length) //8 [ 11, 12, 1, 2, 3, 4, <1 empty item>, 7 ] 8
console.log(b.unshift(), b, b.length) //8 [ 11, 12, 1, 2, 3, 4, <1 empty item>, 7 ] 8
console.log([].unshift()) //undefined