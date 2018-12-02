import {config} from '../config.js'
const tips={
    500:'服务错误',
    1005:'appKey无效',
    1007:'地址无效'
}
class HTTP{
    request({url,data={},method='Get'})
    {
      return new Promise((resolve,reject)=>{
        this._request(url,resolve,reject,data,method);
      });
    }

    //api调用
    _request(url,resolve,reject,data={},method='Get'){

        wx.request({
           url:config.api_base_url+url,
           data:data,
           method:method,
           header:{
               'content-type':"application/json",
               'appKey':config.appkey
           },
           success:(res)=>{
            let code=res.statusCode.toString();

               if(code.startsWith('2'))
               {
                   resolve(res);
               }else
               {
                  reject();
                   //失败
                 let code=res.data.error_code;
                 this._show_error(code);
               }
           },
           fail:(err)=>{
            reject();
            this._show_error(500);
           }
        });
    }
    //异常消息返回
    _show_error(error_code)
    {
        const tip=tips[error_code];
        wx.showToast({
            title:tip?tip:tips[500],
            icon:'none',
            duration:4000
        });
    }
}

export {HTTP}