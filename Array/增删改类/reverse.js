Array.prototype.reverse1 = function () {

    this.length
    let length = this.length % 2 == 0 ? this.length / 2 : ((this.length - 1) / 2)
    let i = 0

    //数组长度<=1
    if (this.length <= 1) {
        return this
    }
    //数组长度=2
    if (this.length == 2) {
        let value1 = this[0]
        this[0] = this[1]
        this[1] = value1
        return this
    }
    //数组长度>2
    while (i < length) {

        let value = this[i]
        this[i] = this[length * 2 - i]
        this[length * 2 - i] = value
        i++
    }
   
    return this

}

let a = [1, 2, 3, 4, 5, 6, 7]
let b = [1, 2]
a.reverse1().reverse1()  //[1,2,3,4,5,6,7]
b.reverse1()  //[2,1]