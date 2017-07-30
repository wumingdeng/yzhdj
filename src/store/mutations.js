const mutations = {
  ['GET_WXID'] (state, value){
    state.wxid = value || state.wxid;
  },  
  ['USERINFO'](state,value) {
    state.userinfo = {...state.userinfo,...value}
    state.userinfo.isFinishInfo = true;
    state.isLogin = true;
  },
  ['SWIPEDATA'] (state, value){
    state.swipeData = value || state.swipeData;
  },
  ['PRODUCTDATA'] (state, value){
    state.productData = value || state.productData;
  },  
  ['PRODUCTDETAIL'] (state, value){
    state.productDetail = value || state.productData;
  }, 
  ['SHOE_SIZE'] (state, value){
    state.shoeSize = value || state.shoeSize;
  }, 
  ['SHOE_COLOR'] (state, value){
    state.shoeColor = value || state.shoeColor;
  }, 
  ['SHOE_TYPE'] (state, value){
    state.shoeType = value || state.shoeType;
  },
  ['LOADING'] (state, value){
    state.isloading = value || state.isloading;
  },
}

export default mutations
