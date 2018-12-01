import {HTTP} from '../util/http.js'
class ClassicModel extends HTTP{
    getLatest(sCallBack){
        this.request({
            url:'classic/latest',
            method:'Get',
            success:(data)=>{
             sCallBack(data);
             this._setLatestIndex(data.index);
            }  
        });
    }

    getPrevious(sCallBack,index)
    {
        this.request({
           url:`classic/${index}/previous`,
           success:(res)=>{
               sCallBack(res);
           }
        });
    }

    getClassic(index,nextOrPervious,sCallBack)
    {
        let key=nextOrPervious=="next"?this._getKey(index+1):this._getKey(index-1);
         let classic=wx.getStorageSync(key);
         if(!classic)
         {
            this.request({
                url:'classic/'+index+'/'+nextOrPervious,
                success:(res)=>{
                    wx.setStorageSync(key,res);
                    sCallBack(res);
                    
                }
             });
         }else
         {
             sCallBack(classic);
         }
    }

    isFirst(index)
    {
      return index==1?true:false;
    }
    isLatest(latestIndex)
    {
      let  CurrentIndex=this._getLatestIndex();
      return latestIndex==CurrentIndex?true:false;
    }
    _setLatestIndex(index)
    {
        wx.setStorageSync('latest',index)
    }
    _getLatestIndex()
    {
        return wx.getStorageSync('latest');
    }
    _getKey(index){
        return "classic_"+index;
    }
}
export {ClassicModel}