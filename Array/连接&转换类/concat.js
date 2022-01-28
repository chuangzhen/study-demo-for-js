Array.prototype.contcat1 = function(...args) {
    const length = args.length
    let i = 0
    let arr = [...this]
    while (i < length) {
        let value = args[i]
        if (value instanceof Array) {
            arr.push(...value)
        }else{
            arr.push(value)
        }
        i++
    }

    return arr
    
}


//测试使用
let a = [1,2,3,4]
console.log(a.contcat1([5,6],7,8))