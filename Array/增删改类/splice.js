//接受2个以上的参数
Array.prototype.splice1 = function (idx, num, ...args) {
    //下标和删除增加标识参数传参错误，返回[]，不改变原数组
    if (typeof idx !== 'number' || idx < 0 || typeof num !== 'number' || num < 0) {
       return []
    }
    //添加的元素长度
    const argsLeng = args?.length || 0
    //当前数组的长度（也代表删除元素后的长度）
    let length = this.length
    let i = 0
    //当前数组的初始值，也代表删除元素后的数组的初始值
    let preThis = [...this]

    //被删除的元素数组
    let delArr = []

    //先删除
    if (num > 0) {
        //获取删除了的元素的内容
        let x = 0
        let delMax = num > length - idx ? length - idx : num
        while (x < delMax) {
            delArr[x] = this[x + idx]
            x++
        }

        //把idx下标及之后的删除
        if (idx < length && num >= length - idx) {
            this.length = idx
            length = idx
            preThis.length = idx
        } else if (idx < length && num < length - idx) {
            let j = 0
            length = length - num
            while (j < length) {
                if (j < idx) {
                    preThis[j] = this[j]
                } else {
                    preThis[j] = this[j + num]
                }
                j++
            }
        }
    }
    //再插入新增元素,args长度个参数到idx下标后依次排列
    if (argsLeng > 0) {
        while (i < length + argsLeng) {
            if (idx < length) {
                if (i < idx) {
                    this[i] = preThis[i]
                } else if (i >= idx && i - idx < argsLeng) {
                    this[i] = args[i - idx]
                } else {
                    this[i] = preThis[i - argsLeng]
                }
            } else {
                this.length = length + argsLeng
                if (i >= length) {
                    this[i] = args[i - length]
                }
            }
            i++
        }
    }
    console.log('this=', this, '----', 'delArr=', delArr)
    return delArr

}


//测试&对比
let a = [1, 2, 3]
let b = [1, 2, 3]
let c = [1, 2, 3]
let d = [1, 2, 3]
let e = [1,2,3]

a.splice1(5, 0, 11, 12, 123) //a = [ 1, 2, 3, 11, 12, 123 ] ---- delArr= []
// let a1 = a.splice(5, 0, 11, 12, 123)
// console.log(a1, a); //a1 = []    a = [ 1, 2, 3, 11, 12, 123 ]

b.splice1(1, 2, 11, 12, 123) //b = [ 1, 11, 12, 123 ] ---- delArr= [ 2, 3 ]
// let b1 = b.splice(1, 2, 11, 12, 123)
// console.log(b1, b); //b1 = [2,3] b = [1,11,12,123]

c.splice1(5, 0, 11, 12, 123) //c = [ 1, 2, 3, 11, 12, 123 ] ---- delArr= [  ]
// let c1 = c.splice(5, 0, 11, 12, 123)
// console.log(c1, c); //c1 = []  c = [1,2,3,11,12,123]


d.splice1(1, 7, 111, 112, 1123) //c = [1, 111, 112, 1123 ] ---- delArr= [ 2, 3 ]
// let d1 = d.splice(1, 7, 111, 112, 1123) 
// console.log(d1, d); //c1 = [2,3]  c = [1,111,112,1123]


let e1 = e.splice1(-5)  //e1 = []   e = [1,2,3]
// let e1 = e.splice(-1,-1)  //e1 = []   e = [1,2,3]
// console.log(e1);