<template>
	<f7-page>
    <f7-page-content  style="-webkit-transform: translateZ(0px);">
      <div style="height: calc(100% + 1px);">
  		<homeSwipe :swipeData="swipeData"></homeSwipe>
  		<f7-block inner style="margin:-6px 0 0 0;font-size:17px;">
  			<span>{{productData.name}}</span>
  			<span style="float:right;color:#ff0000;margin-right:-3px">价格: ¥{{productData.price}}/天 订金：{{productData.price}}</span>
  		</f7-block>
  		
  		<f7-card style="margin: 10px 0;box-shadow: 0 1px 1px rgba(0,0,0,.3);">
  			<f7-card-header>
  				服务介绍
  			</f7-card-header>
  			<f7-card-content style="">
          
  			</f7-card-content>
  		</f7-card>
      <f7-card  style="margin: 10px 0;box-shadow: 0 1px 1px rgba(0,0,0,.3);">
        <f7-card-content>
          适用人群:<br><br>
          服务优势:<br><br>
          服务特点:<br><br>
          服务内容:<br><br>
          服务保障:<br><br>
          服务承诺:<br>
        </f7-card-content>
        <!--
      	<f7-list>
          <f7-list-item>适用人群</f7-list-item>
          <f7-list-item>服务优势</f7-list-item>
          <f7-list-item>服务特点</f7-list-item>
          <f7-list-item>服务内容</f7-list-item>
          <f7-list-item>服务保障</f7-list-item>
          <f7-list-item>服务承诺</f7-list-item>
        </f7-list>
        -->
  		</f7-card>
      
      <f7-button big fill style='margin:10px 10px 10px 10px;background-color:#fa7699' @click="onUpdateInfo">预订</f7-button>

      </div>
    </f7-page-content>
    
    <service :isShow="isSHowService" @close="isSHowService=false"></service>
	</f7-page>
</template>

<script>
	import homeSwipe from "./homeSwipe";
  import buyShoe from "./buyShoe";
  import service from "@/components/service"
  // import wxApi from '../../utils/wxApi.js'
	export default{
		data () {
			return {
        pickerOpened:false,
				productData:{},
        isSHowService:false
			}
		},
    components:{
    	"homeSwipe":homeSwipe,
      'buyShoe':buyShoe,
      "service":service
    },     
    computed: {
    	swipeData() {
    		var pdata = this.$store.state.productDetail
    		if (pdata && pdata.swipePic) {
          var imgArr = pdata.swipePic.split(',')
          for (var i in imgArr) {
            imgArr[i] = imgArr[i] + Global.verStr
          }
	    		return imgArr
    		} else {
    			return []
    		}
    	},
      photos() {
        var pArr = []
        for (var i = 1; i <= this.productData.introNum; ++i) {
          pArr.push("static/assets/shoe/product/intro_p" + this.productData.pid + "/" + i +".jpg" + Global.verStr)
        }
        return pArr
      }
    },
    methods:{
      onTouchStart() {
        console.log('touchstart')
      },
      openPhotoBrowser(index) {
        console.log(index)
        this.$refs.pb.open(index)
        this.$refs.pb.enableExposition()
      },
      onClickPB(swiper,event) {
        this.$nextTick(this.$refs.pb.close)
        // setTimeout(this.$refs.pb.close,0)
      },
      onClickBuy() {
        this.pickerOpened = true;
      },
      getImgSrc(n) {
        return "static/assets/shoe/product/intro_p" + this.productData.pid + "/" + n +".jpg" + Global.verStr;
      },
      showService() {
        this.isSHowService = true;
      },
      doIt:function() {
        //刷新一下。。。解决ios卡住的问题
        var card = document.getElementsByClassName('card')[0]
        if (card)
          card.style.marginBottom = '1px';
      }
    },
		beforeRouteEnter(to,from,next){
			//获取首页的配置信息
      // debugger
    	var sid = to.query.sid || 1;
    	//查询产品信息
    	window.Global.s.dispatch('getProductDetail', {
    		self:window.Global.Vue,
    		info:{
    			sid:sid
    		},
				callback:next
    	})
		},
    beforeCreate() {
      document.title = '专业孕妇鞋'
    },
		mounted() {
      this.$f7.resize();
      var isReload = this.$store.state.isReload;
      if (isReload) { 
        // this.$store.state.isLogin = false
        // this.$store.state.isReload = false
        // this.$router.push({
        //   path:'/',
        //   query:{
        //     page:'showDetail'
        //   }
        // })
        window.location.reload(true)
        // location.replace(document.referrer); 
        return
      }
      this.productData = this.$store.state.productDetail
      window.setTimeout(this.doIt,1000); 
      // var self = this
      // this.$nextTick(function() {
      //   self.doIt()
      // })
		},
    beforeDestroy() {
      console.log('destory...')
      this.$refs.pb.close();
      this.pickerOpened = false;
      this.$f7.closeModal()
    }
    // mounted() {
    // 	var sid = this.$route.query.sid;
    // 	//查询产品信息
    // 	this.$store.dispatch('getProductDetail', {
    // 		self:this,
    // 		info:{
    // 			sid:sid
    // 		},
    // 		callback(self, res) {
    // 			if (res.body.ok == 0) {

    // 			} else {
    // 				self.productData = res.body.ok
    // 				// self.$f7.reinitPageSwiper('#app')
    // 				// self.$f7.init();
    // 			}
    // 		}
    // 	})
    // }


	}
</script>

<style scoped>
  .navFooter {
      height: 50px;
      line-height: 50px;
      background: #fff;
      position: fixed;
      width: 100%;
      min-width: 320px;
      bottom: 0;
      left: 0;
      z-index: 900;
      border-top:1px solid rgba(170, 170, 170, 0.5);
  }
  .navFooter span {
  	margin:0;
    display:inline-block;
    float:left;
  }
  .navFooter span img {
    height:100%;
  }
  .pre {
      width:100%;
      height: 50px;
      line-height: 50px;
      border: none;
      color: #ffffff;
      font-size: 20px;
      margin:0;
      padding: 0;
      background-color:#fa7699;
      border-radius:0;
  }
  .blackMask {
    width:100%;
    height:100%;
    background-color: #000000;
    filter:alpha(Opacity=60);
    -moz-opacity:0.6;
    opacity: 0.6;
    position: absolute;
    top: 0px;
    z-index: 99;
  }
  .swiper-pagination-bullet-active {
    background-color:#ff7777;
  }
</style>