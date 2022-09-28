export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };
  

  export function debounce(func,delay){
    let timer =null;

    return function(){
         //判断是否已经执行
        if(timer)
          clearTimeout(timer);//上次还未执行 取消之 不执行

        //设置本次等待时间
        timer= setTimeout(func,delay);
    }
   
  }