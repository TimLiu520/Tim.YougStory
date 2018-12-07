const paginationBev=Behavior({
 
   data: {
    bookData:[],
    total:null
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
      initData()
      {
        this.data.bookData=[],
        this.data.total=null
      }
}

});
export {paginationBev}