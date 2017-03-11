/**
 * 判断是不是空对象
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
const isEmptyObject = (e) => {
  var t
  for (t in e) {
    return !1
  }
  return !0
}
/**
 * clone对象
 * @return {[type]} [description]
 */
const deepClone = (obj) => {
  let Constructor = obj.constructor
  let obj = new Constructor()
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      if(typeof(this(attr))!=='function'){
        if(obj[attr] === null){
          obj[attr] = null
        }
        else {
          obj[attr] = this[attr].clone()
        }
      }
    }
  }
}

/**
 * 数组去重
 */
const arrUnique = (arr) => {
  for(var i = 0; i < arr.length; i++){
    for(var j = i + 1; j< arr.length; j++){
      if(arr[i] === arr[j]){
        arr.splice(j,1)
      }
    }
  }
  return arr
}

export {
  isEmptyObject,
  arrUnique,
  deepClone
}
