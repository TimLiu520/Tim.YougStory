import {config} from '../config.js'
const tips={
    500:'服务错误',
    1005:'appKey无效'
}
class HTTP{

    //api调用
    request(parms){
        if(!parms.method)
        {
          parms.method='Get';
        }
        wx.request({
           url:config.api_base_url+parms.url,
           method:parms.method,
           header:{
               'content-type':"application/json",
               'appKey':config.appkey
           },
           success:(res)=>{
            let code=res.statusCode.toString();

               if(code.startsWith('2'))
               {
                parms.success(res.data);
               }else
               {
                   //失败
                 let code=res.data.error_code;
                 this._show_error(code);
               }
           },
           fail:(err)=>{
            _show_error(500);
           }
        });
    }
    //异常消息返回
    _show_error(error_code)
    {
        wx.showToast({
            title:tips[error_code],
            icon:'none',
            duration:4000
        });
    }
}

export {HTTP}