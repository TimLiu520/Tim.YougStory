import {HTTP} from '../util/http.js'
class ClassicModel extends HTTP{
    getLatest(sCallBack){
        this.request({
            url:'classic/latest',
            method:'Get',
            success:(data)=>{
             sCallBack(data);
            }  
        });
    }
}
export {ClassicModel}