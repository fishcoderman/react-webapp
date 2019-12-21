/*
包含n个工具函数的模块
 */
/*
用户主界面路由
  dashen: /dashen
  laoban: /laoban
用户信息完善界面路由
  dashen: /dasheninfo
  laoban: /laobaninfo
判断是否已经完善信息? user.header是否有值
判断用户类型: user.type
 */
/*
返回对应的路由路径
 */
export function getRedirectTo(type, header) {
  let path
  // type
  if(type === 'boss') {
    path = '/boss'
  } else {
    path = '/employ'
  }
  // header
  if(!header) { // 没有值, 返回信息完善界面的path
    path += 'info'
  }

  return path
}

// "yyyy-MM-dd hh:mm:ss:S"
export function dateFormat(date, fmt) { //author: meizz 
    const o = {
      "y+": date.getFullYear(),
      "M+": date.getMonth() + 1,                 //月份
      "d+": date.getDate(),                    //日
      "h+": date.getHours(),                   //小时
      "m+": date.getMinutes(),                 //分
      "s+": date.getSeconds(),                 //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S+": date.getMilliseconds()             //毫秒
  };
  for (const k in o) {
      if (new RegExp("(" + k + ")").test(fmt)){
        if(k === "y+"){
            fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
        }
        else if(k === "S+"){
            let lens = RegExp.$1.length;
            lens = lens === 1 ? 3 : lens;
            fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1,lens));
        }
        else{
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      }
  }
  return fmt;
 }
