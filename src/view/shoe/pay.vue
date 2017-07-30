<template>
	<f7-page style="">
		<f7-navbar sliding>
      <f7-nav-left>
          <f7-link icon="icon-back color-black" @click="$router.go(-1)"></f7-link>
      </f7-nav-left>
      <f7-nav-center sliding title="确认订单"></f7-nav-center>
      <f7-nav-right></f7-nav-right>
    </f7-navbar>
    <f7-page-content style="margin-top:45px;">
			<f7-block inner style="font-size:1.2em;margin:0 0 0 0;" id="topInfo">
				<p>
					<span style="display:inline-block;">
						<span>收货人 : </span>
						<span style="color:#888888"> {{$store.state.userinfo.contact}}</span>
					</span>
					<span style="color:#888888;margin-left:25px;"> {{$store.state.userinfo.tel}}</span>
				</p>
				<div class="partingLine"></div>
				<p>
					<span>地址:</span><span style="color:#888888"> {{fullAddress}}</span>
				</p>
			</f7-block>
			<img src="static/assets/shoe/line.jpg" style="position:relative;top:-12px;height:3px;width:100%">

			<f7-block-title style="margin-top:0px;font-size:18px;">订单信息</f7-block-title>
			<f7-block inner style="margin:5px 0 15px;padding-bottom:0px;">
				<f7-grid name="baseInfo">
					<f7-col width=30 id='orderImg'>
						<img class="shoeImg" :src="$store.state.nowPicture">
					</f7-col>
					<f7-col width=70>
						<p style="margin:8px 0;">{{$store.state.productDetail.name}}</p>
						<p style="color:#888888;margin:8px 0;">颜色: {{$store.state.shoeColor}} 尺码: {{$store.state.shoeSize}} 鞋型: {{$store.state.shoeType}}</p>
						<p style="font-size:1.2em;color:#ff0000;margin:8px 0;">¥{{$store.state.productDetail.price}}</p>
					</f7-col>
				</f7-grid>


				<f7-list form id="remarkText" style="margin:20px 0 0 0;border:none;">
					<f7-list-item>
						<f7-label style="width:20%;margin-top:-75px;">备注</f7-label>
						<div class="item-input">
							<textarea style="padding:2px 5px;margin:12px 0 12px -20px;background-color:#eeeeee;border:1px solid #dddddd;border-radius:4px;width:113%;" type="textarea" readonly="readonly" v-model=orderRemark></textarea>
						</div>
						<!-- <f7-input readonly type='textarea' v-model="$store.state.remark"></f7-input> -->
					</f7-list-item>
				</f7-list>
			</f7-block>


			<f7-block v-show="!isUseCode" inner style="margin-top:15px;margin-bottom:100px;padding-left:3px;">
				<f7-grid v-show="!isUseCode" class=''>
					<f7-col width=70 style="text-align:center;font-size:16px;">
						<span style="position:relative;top:1px;">优惠码&nbsp;</span>
						<input id="discountCode" type='text' style="position:relative;top:0px;background-color:#eeeeee; width:60%;box-shadow:none;border:1px solid #dddddd;border-radius:4px;height:25px;font-size:15px;">
						</input>
					</f7-col>
					<f7-col width=30>
						<f7-button fill color="green" style="margin-top:1px;margin-right:7px;" :disabled="isUseCode" @click="onDiscount">
							使用
						</f7-button>
					</f7-col>
				</f7-grid>
			</f7-block>

			<f7-block v-show="isUseCode" inner style="margin-top:15px;margin-bottom:100px;">
				<p style="margin:5px auto;font-size:16px;">
					商品价格
					<span style="float:right;color:#ff0000;">¥{{$store.state.productDetail.price}}</span>
				</p>
				<p style="margin:5px auto;font-size:16px;">
					优惠码抵扣
					<span style="float:right;color:#ff0000;">-¥{{discountPrice}}</span>
				</p>
			</f7-block>
			<div id="bottomSpace"></div>
		</f7-page-content>

  	<div class="pay_btnwrap">
  	  <p class="wap">
  	  	<span style="margin-right:-12px;color:#000000">实付款：</span>
  	  	<span>￥</span>
  	  	<span id="total_fee">{{orderPrice}}元</span>
  	  	<a @click.once="onPay" id="payBtn" class="pay_btn">微信支付</a>
  	  </p>
  	</div>
	</f7-page>
</template>

<script>
	export default {
		data() {
			return {
				isUseCode:false,
				orderPrice:null,
				discountCode:null,
				discountPrice:null,	//已优惠价格
			}
		},
		computed:{
			fullAddress() {
				var info = this.$store.state.userinfo
				return (info.province || '') + ' ' + (info.city || '') + ' ' + (info.area || '') + ' ' + info.address;
			},
			orderRemark() {
				var remark = this.$store.state.remark
				if (!remark || remark == '')
					return '无'
				return this.$store.state.remark
			}
		},
		methods:{
			onDiscount(event,btn) {
				this.discountCode = document.getElementById('discountCode').value;
				if (this.discountCode == '') {
					this.$f7.alert('','请输入优惠码')
					return
				}
				document.getElementById('discountCode').value = ''
				this.$store.dispatch('useDiscountCode', {
					self: this,
					info: {
						code: this.discountCode
					},
					callback(self, res) {
						var price = res.body.ok.price;
						self.discountPrice = price
						if (self.discountPrice > self.orderPrice) {
							self.discountPrice = self.orderPrice;
						}
						self.$f7.alert('','成功使用优惠券！')
						self.isUseCode = true;
						self.orderPrice -= Number(price)
						if (self.orderPrice < 0) {
							self.orderPrice = 0;
						}
						event.target.style.backgroundColor = '#eeeeee';

					}
				})

			},
			onPay() {
				var state = this.$store.state
				var info = {}
				info.wxid = state.wxid
				info.shoeid = state.productDetail.id
				info.size = state.shoeSize
				info.color = state.shoeColor
				info.type = state.shoeType
				info.remark = state.remark
				info.contact = state.userinfo.contact
				info.gender = state.userinfo.gender
				info.tel = state.userinfo.tel
				info.address = state.userinfo.address
				info.province = state.userinfo.province
				info.city = state.userinfo.city
				info.area = state.userinfo.area
				info.discountCode = this.discountCode;


				this.$store.dispatch('ordermake',{
					self:this,
					info:info,
					callback(self, res) {
						if (res.body.ok == 0) {
								self.$f7.alert('','支付成功')
						  	self.$router.push('/order');
						  	return;
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
					  	self.$router.push('/order');
							return
						}
						if (typeof WeixinJSBridge == 'undefined') {
							self.$f7.alert('','支付失败,请在微信中进行支付');
					  	self.$router.push('/order');
							return
						}
						WeixinJSBridge.invoke('getBrandWCPayRequest', payargs, function(res){
							console.log(res)
						  if(res.err_msg == "get_brand_wcpay_request:ok"){
						  	self.$router.push('/order');
						    // alert("支付成功");
						    // 这里可以跳转到订单完成页面向用户展示
						  }else{
						  	self.$f7.alert('','支付失败，请重试',function() {
						  		self.$router.push('/order');
						  	})
						  }
						});
					}
				})
			}
		},

		mounted() {
			this.$f7.resize();
			this.orderPrice = this.$store.state.productDetail.price

			//调整下显示
			var orderImg = document.getElementById('orderImg')
			orderImg.style.height = orderImg.offsetWidth + 'px';

			//根据屏幕大小 设置下面留白区域的高度
			var needSpace = 70;
			var bottomSpace = document.getElementById('bottomSpace')
			var sHeight = screen.height;
			bottomSpace.style.height = sHeight - bottomSpace.offsetTop + needSpace + 'px'

			// function onBridgeReady(){
			//    WeixinJSBridge.invoke(
			//        'getBrandWCPayRequest', {
			//            "appId":"wx5da59f32f8c2f724",     //公众号名称，由商户传入     
			//            "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
			//            "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
			//            "package":"prepay_id=u802345jgfjsdfgsdg888",     
			//            "signType":"MD5",         //微信签名方式：     
			//            "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
			//        },
			//        function(res){     
			//        		 console.log(res)
			//            if(res.err_msg == "get_brand_wcpay_request:ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
			//        }
			//    ); 
			// }
			// if (typeof WeixinJSBridge == "undefined"){
			//    if( document.addEventListener ){
			//        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			//    }else if (document.attachEvent){
			//        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
			//        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			//    }
			// }else{
			//    onBridgeReady();
			// }
		}
	}
</script>

<style>
	#remarkText ul:after {
		background-color: #ffffff
	}
	.yhcode {
		height:40px;
		background-color: #ffffff;
		margin-top: -15px;
	}
	#topInfo p {
		margin: 0;
	}
	.partingLine {    
		content: '';
		margin:10px 0;
    left: 0;
    bottom: 0;
    right: auto;
    top: auto;
    height: 1px;
    width: 100%;
    background-color: #e1e1e1;
    display: block;
    z-index: 15;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
	}
	.shoeImg {
		width: 100%;
	}
	.pay_btnwrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    z-index: 97;
	}
	.pay_btnwrap .wap {
    position: relative;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    padding-right: 120px;
    text-align: right;
    min-width: 200px;
    display: block;
    background: #fff;
    color: #333;
    border-top: 1px solid #ddd;
    z-index: 97;
    margin: 0;
	}
	.pay_btnwrap .wap span {
    color: #ff0000;
    margin-left: 5px;
    font-size: 18px;
	}
	.pay_btnwrap .wap .pay_btn {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    width: 110px;
    font-size: 18px;
    text-align: center;
    display: block;
    background: #fd7f97;
    color: #fff;
    overflow: hidden;
    cursor: pointer;
	}
	textarea {
		color: #888888;
	}
</style>