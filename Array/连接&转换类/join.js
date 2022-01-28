Array.prototype.join1 = function (splitStr) {

    let str = splitStr || ""
    const length = this.length
    let i = 0
    let newString = ''
    while (i < length) {
        let curValue = this[i]||""
        if (i < length -1) {
            newString += `${curValue}${str}`  
        }else{
            newString += `${curValue}` 
        }
        i++
    }
    
    return newString

}

let sStr = [1,'aa',,'--',6]
console.log(sStr.join(','))  //1,aa,,--,6
console.log(sStr.join1(',')) //1,aa,,--,6