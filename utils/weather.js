/**
 * 调用和风天气JS代码
 * 
 * @author 小帅丶
 * @date 2019年9月
 */
let key = ''//用户认证key 请自行注册获取
let weatherUrl = 'https://free-api.heweather.net/s6/weather/now';//常规天气数据API 如果是付费用户请注意自行更换API
//获取实况天气
let weatherRequest = (longitude, latitude, callback) => {
  //拼接接口动态URL参数
  let location = longitude + "," + latitude;
  //发送接口请求
  wx.request({
    url: weatherUrl + '?location=' + location + '&key=' + key,
    method: 'POST',
    success: function (res) {
      callback.success(res.data.HeWeather6[0])
    },
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}
//暴露出去的接口
module.exports = {
  weatherRequest: weatherRequest
}