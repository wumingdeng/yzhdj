<template>
	<f7-page navbar-through>
		<f7-card class="orderCard">
			<f7-card-header style='text-align:center'>
				<p style='margin:0px 0px 0px 150px'>订单确定</p>
			</f7-card-header>
			<f7-card-content>
				<f7-grid>
						服务项目：<br><br>
						服务价格：<br><br>
						服务开始时间:<br>
				</f7-grid>
			</f7-card-content>
			<f7-card-footer>
				姓名：<br>
				联系电话：
			</f7-card-footer>
		</f7-card>
		<f7-card class="orderCard">
			<f7-card-header>
				服务条款		
			</f7-card-header>
			<f7-card-content>
				
			</f7-card-content>
			<f7-card-footer>
				<f7-button style='margin:0px 0px 0px 110px;background-color:#ffffff;color:#000000;border:1px #ffffff' @click="onUpdateInfo">我已同意服务条款</f7-button>
			</f7-card-footer>
		</f7-card>
		
 		<div class="navFooter">
        <span style="width:70%;"><f7-button style="background-color:#ffffff;color:#000000" class="pre" @click="$router.push('/order')">
          订金：{{100}}元
        </f7-button></span>
        <span style="width:30%;"><f7-button class="pre" @click="">微信支付</f7-button></span>
    </div>
	</f7-page>
</template>

<script type="text/javascript">
	import {timeToDate} from 'src/globals/global'
	export default {
		data() {
			return {
				orderData: {},
				orderstatus:{
					waitPay:0,	//待支付
					waitChoice:1, //待备货
					waitDeliver:2,	//待发货
					waitReceipt:3,	//待收货
					waitEvaluate:4,	//待评价
					finish:5,	//完成
					cancel:6
				},
				statusName:[
					'待付款',
					'待发货',
					'待发货',
					'待收货',
					'待评价',
					'交易完成',
					'订单已取消'
				],
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
		methods:{
			timeToDate:timeToDate,
			openLogistics() {
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
            orderCode:this.orderData.id
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
			onPay() {
				this.isInPay = true
				this.$store.dispatch('orderpay',{
					self:this,
					info:{
						oid: this.orderData.id
					},
					callback(self, res) {
						if (res.body.w) {
							// self.$f7.alert('','下单成功',function() {
							// 	self.$router.push('/order')
							// })
						}
						var payargs = {
							 "appId":"wx5da59f32f8c2f724",     //公众号名称，由商户传入     
		           "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
		           "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
		           "package":"prepay_id=u802345jgfjsdfgsdg888",     
		           "signType":"MD5",         //微信签名方式：     
		           "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
						}
						payargs = res.body;
						if (payargs.err ) {
							self.$f7.alert('','支付失败');
							self.isInPay = false;
							return
						}
						if (typeof WeixinJSBridge == 'undefined') {
							self.$f7.alert('','支付失败,请在微信中进行支付');
							self.isInPay = false;
							return
						}
						WeixinJSBridge.invoke('getBrandWCPayRequest', payargs, function(res){
							console.log(res)
							self.isInPay = false;
						  if(res.err_msg == "get_brand_wcpay_request:ok"){
								self.orderData.status = self.orderstatus.waitChoice;
						    // alert("支付成功");
						    // 这里可以跳转到订单完成页面向用户展示
						  }else{
								self.$f7.alert('','支付失败,请重试');
						  }
						});
					}
				})
			},
			onCancel(){
				if (this.isInPay) return;
				//取消订单
				this.$f7.confirm("","确定要取消订单？",()=>{
					this.$f7.showPreloader('正在取消订单');
					//服务端接口
					this.$store.dispatch('ordercancel',{
						self:this,
						info:{
							// wxid:this.$store.state.userinfo.wxid,
							oid:this.orderData.id
						},
						callback:function(self,res) {
							self.orderData.status = self.orderstatus.cancel;
						}
					})
				},()=>{
					console.log("no")
				})
			},
		},
		mounted() {
			this.orderData = this.$store.state.currentOrder;
		}
	}
</script>

<style scoped>
	.orderCard {
		margin-right: 0px;
		margin-left: 0px;
	}
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
</style>