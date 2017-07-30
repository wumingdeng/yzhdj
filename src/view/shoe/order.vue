<template>
	<f7-page id="orderPage" infinite-scroll :infinite-scroll-preloader="isPreloader" @infinite="onInfinite">
	  <f7-navbar sliding>
	      <f7-nav-left>
	        <f7-link icon="icon-back color-black" @click="$router.push('/shoeDetail')"></f7-link>
	      </f7-nav-left>
	      <f7-nav-center sliding style="left:-22px;" title="我的订单"></f7-nav-center>
	      <f7-nav-right></f7-nav-right>
	  </f7-navbar>
  	<f7-page-content style="margin-top:44px;">
      <div v-if="isNoData" style="float:left;width:100%;">
          <p style="margin-top:50px;text-align:center;">暂无订单</p>
      </div>
  		<orderCell 
  			v-for="(cell,index) in orderArr"
  			:orderData="cell"
  			:key="index"
        @logistics="openLogistics(cell)"
  		></orderCell>
      <div v-show="!isNoData && !isPreloader" style="width:100%;">
          <p style="margin-bottom:50px;text-align:center;">没有更多订单了</p>
      </div>
      <div style="height:50px;"></div>       
  	</f7-page-content>
    <f7-popup id="demo-popup" :opened="popupOpened" @popup:closed="popupOpened=false">
      <f7-view>
        <f7-pages>
          <f7-page navbar-fixed style="background-color:#ffffff">
            <f7-navbar title="物流信息">
              <f7-nav-right>
                <!-- Using state: -->
                <img src="static/assets/shoe/guanbi.png" class="closeBtn" @click="popupOpened=false">
                <!-- <f7-link @click="popupOpened=false">关闭</f7-link> -->
                <!--
                Or using F7 API:
                <f7-link close-popup>Close</f7-link>
                -->
              </f7-nav-right>
            </f7-navbar>
            <div v-show="!haveData" style="margin-top:100px;text-align:center;">尚无物流跟踪数据，请稍后重试</div>
            <f7-block v-show="haveData" inner style="margin-top:0">
              <f7-timeline-item inner 
                v-for="(item,index) in logisticsData.Traces"
                :text="item.AcceptStation"
                :date="getLogisticsDate(item.AcceptTime)"
                :time="getLogisticsTime(item.AcceptTime)"
                :key="index"
              ></f7-timeline-item>
            </f7-block>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-popup>
	<!-- <navFooter selectId=2></navFooter>    -->
	</f7-page>
</template>

<script>
	import navFooter from './navFooter'
	import orderCell from './orderCell'
	export default {
    data () {
			return {
				isNoData:true,
				orderArr:[],
				page:1,
				pageCount:10,
				isPreloader:true,
        popupOpened:false,
        dateObj:{}, //存物流已有的日期
        haveData:false,
        logisticsData:{
          "EBusinessID": "1287326",
          "ShipperCode": "YTO",
          "Success": true,
          "LogisticCode": "12345678",
          "State": "2",
          "Traces": [
            {
              "AcceptTime": "2017-05-18 10:12:38",
              "AcceptStation": "圆通合作点【指尖快递】快件已到达绿地蓝海国际大厦B座负一层驿站,如有疑问请联系055163520604"
            },
            {
              "AcceptTime": "2017-05-19 15:16:13",
              "AcceptStation": "圆通合作点【指尖快递】快件已到达港汇广场A座负一层驿站,如有疑问请联系13515644171"
            },
            {
              "AcceptTime": "2017-05-19 15:16:13",
              "AcceptStation": "圆通合作点【指尖快递】快件已到达港汇广场A座负一层驿站,如有疑问请联系13515644171"
            },
            {
              "AcceptTime": "2017-05-19 15:16:13",
              "AcceptStation": "圆通合作点【指尖快递】快件已到达港汇广场A座负一层驿站,如有疑问请联系13515644171"
            },
          ]
        }
			}
    },
    components:{
			"navFooter":navFooter,
			'orderCell':orderCell
    },
    methods:{
      openLogistics(data) {
        console.log('get logistics')
        this.dateObj = {}
        this.logisticsData = {}
        this.popupOpened = true
        this.haveData = false
        //取物流信息
        this.$store.dispatch('getLogistics',{
          self:this,
          info:{
            expCode:'',
            expNo:'',
            orderCode:data.id
          },
          callback(self, res) {
            if (res.body.ok == 1) {
              self.logisticsData = res.body.d;
              if (self.logisticsData.Traces && self.logisticsData.Traces.length > 0) {
                self.haveData = true
              }
            }
          }
        })
      },
      getLogisticsDate(str) {
        var date = str.substring(0,10)
        date = date.replace(/\-/,'  ')
        //同一天只显示一次
        if (this.dateObj[date]) {
          return ''
        } else {
          this.dateObj[date] = true
          return date
        }
      },
      getLogisticsTime(str) {
        return str.substring(11)
      },
    	onInfinite(event, done){
    		//获取数据
        console.log('pulldown...')
    		this.getData(done);
    	},
    	getData(callback){
        this.$store.dispatch('orderlistUser',{
          self:this,
          info:{
            uid:this.$store.state.wxid,
            offset:(this.page - 1) * this.pageCount,
            limit:this.pageCount
          },
          callback:(self,res)=>{
            self.orderArr = self.orderArr.concat(res.body.w)
            if (res.body.w.length > 0) {
              self.isNoData = false;
            }
            if (res.body.w.length < self.pageCount) {
              //停止加载
              self.$f7.detachInfiniteScroll('.infinite-scroll')
              self.isPreloader = false;
              console.log('stoppredown...')
            }
            if (callback) {
              callback();
            }
          }
        })
        this.page++;
      }
    },
    mounted() {
    	//取订单数据
      this.$f7.initPageInfiniteScroll('#app');
    	this.getData();
    }
  }
</script>

<style>
  .timeline-item-divider {
    background:#fa7699;
  }
  .content-block-inner .timeline-item-inner {
    border-radius: 5px;
    border: 1px solid rgba(214, 22, 22, 0.3);
  }
</style>