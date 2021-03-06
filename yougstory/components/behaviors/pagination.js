const paginationBev=Behavior({
 
   data: {
    bookData:[],
    total:null,
    noneResult:false,
    lock:false
  },
    methods: {

      setMoreData(dataArray)
      {
        const tempArray=this.data.bookData.concat(dataArray);
        this.setData({
          bookData:tempArray
        });
      },
      getCurrentStart()
      {
        return this.data.bookData.length;
      },
      setTotal(total)
      {
        this.data.total=total;
        if(total==0)
        {
          this.setData({
            noneResult:true
          });
        }
      },
      hasMore()
      {
        if(this.data.bookData.length>=this.data.total)
        {
          return false;
        }else
        {
          return true;
        }
      },
      isLocked(){
        return this.data.lock?true:false;
      },
      Locked(){
        this.setData({
          lock:true
        });
      },
      unLocked(){
        this.setData({
          lock:false
        });
      },
      initData()
      {
        this.setData({
          bookData:[],
          noneResult:false,
          lock:false
        })
        this.data.total=null
      }
}

});
export {paginationBev}