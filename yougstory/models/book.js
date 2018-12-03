import {HTTP} from '../util/http-p.js'
class BookModel extends HTTP{
    getHotList(){
        return this.request({url:'book/hot_list'});
        //return this.request({ url= 'book/hot_list'});
    }

    getMyBookCount(){
        return this.request({url:'/book/favor/count'});
        //return this.request({ url= 'book/hot_list'});
    }

    getDetail(bid){
        return this.request({url:'book/'+bid+'/detail'});
        //return this.request({ url= 'book/hot_list'});
    }

    getLikeStatus(bid){
        return this.request({url:'book/'+bid+'/favor'});
        //return this.request({ url= 'book/hot_list'});
    }

    getComments(bid){
        return this.request({url:'book/'+bid+'/short_comment'});
        //return this.request({ url= 'book/hot_list'});
    }

    
}
export {BookModel}