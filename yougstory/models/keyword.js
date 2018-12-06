import {HTTP} from '../util/http-p.js'
class KeywordModel extends HTTP{
    key='q';
    maxlength=10;

    getHistory(){
      const keywords = wx.getStorageSync(this.key);
      if(!keywords)
      {
          return [];
      }
      return keywords;
    }
    getHot(){
       return this.request({url:'/book/hot_keyword'});
    }
    addToHistory(keyword)
    {
        let keywords=this.getHistory();
        const has = keywords.includes(keyword);
        if(!has)
        {
            const length=keywords.length;
            if(length>=this.maxlength)
            {
               keywords.pop();
            }
            keywords.unshift(keyword);
            wx.setStorageSync(this.key,keywords);
        }

    }
}
export {KeywordModel}