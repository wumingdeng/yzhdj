<template>
	<f7-card @click.native="onDetail">
		<f7-card-header style="">
			<p>订单号：{{orderData.id}}</p>
			<p style="float:right">{{statusName[orderData.status]}}</p>
		</f7-card-header>
		<f7-card-content>
			<f7-grid>
				<f7-col width=30>
					<img class="oc_orderImg" :src="orderData.smallPic"></img>
				</f7-col>
				<f7-col width=70>
					<div class="oc_right">
						<span style="">{{orderData.shoeName}}</span>
						<span style="color:#ff0000;font-size:1.5em;position:absolute;top:10px;right:16px;">¥{{orderData.price}}</span>
						<p style="color:#71777f;white-space:nowrap;">尺码:{{orderData.size}}码 颜色:{{orderData.color}} 鞋型:{{orderData.type}}</p>
						<p>订单时间:{{timeToDate(orderData.createtime,true)}}</p>
					</div>
				</f7-col>
			</f7-grid>
<!-- 			<div v-if="orderData.status==orderstatus.waitPay" style="height:40px;">
				<p class="oc_time" style="float:right;overflow:hidden;">订单时间:{{timeToDate(orderData.createtime,true)}}</p>
			</div> -->
			<f7-grid v-if="orderData.status==orderstatus.waitPay" style="width:100%;height:30px">
				<f7-col><f7-button  style="border-color:#fd7f97;color:#fd7f97" @click.stop.prevent="onCancel">取消</f7-button></f7-col>
				<f7-col><f7-button  style="background-color:#fd7f97" fill @click.stop.prevent="onPay">支付</f7-button></f7-col>
			</f7-grid>
			<f7-grid v-if="orderData.status==orderstatus.waitReceipt" style="width:100%;height:30px">
				<f7-col><f7-button  style="border-color:#fd7f97;color:#fd7f97" @click.stop.prevent="openLogistics">查看物流</f7-button></f7-col>
				<f7-col><f7-button  style="background-color:#fd7f97" fill>确认收货</f7-button></f7-col>
			</f7-grid>
			<f7-grid v-if="orderData.status==orderstatus.waitEvaluate" style="width:100%;height:30px">
				<f7-col></f7-col>
				<f7-col><f7-button  style="background-color:#fd7f97" fill>评价</f7-button></f7-col>
			</f7-grid>
		</f7-card-content>
	</f7-card>
</template>

<script>
	import {timeToDate} from 'src/globals/global'
	export default {
		data(){
			return {
				isInPay:false,
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
				]
			}
		},
		props:{
			orderData:{
				type:Object,
				default:function(){
					return {
					}
				}
			}
		},
		methods:{
			timeToDate:timeToDate,
			onPay() {
				if (this.isInPay) {
					return
				}
				this.isInPay = true
				this.$store.dispatch('orderpay',{
					self:this,
					info:{
						oid: this.orderData.id
					},
					callback(self, res) {
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
			onComment(){
				this.$router.push({
					url:'/userComment',
					query:{
						oid:this.orderData.id
					}
				})
			},
			onDetail(){
				//进入订单明细
				this.$store.state.currentOrder = this.orderData
				this.$router.push({
					path:'/orderDetail'
				});
			},
			openLogistics() {
				this.$emit('logistics',this.orderData.id)
			}
		},
		mounted(){
			this.$f7.init();
    	this.$f7.params.modalButtonCancel = '取消'
    	this.$f7.params.modalButtonOk = '确定'
		}
	}
</script>

<style type="text/css">
	.oc_orderImg {
		width:100%;
		float:left;
		display:inline-block;
	}
	.oc_right{
		display:inline-block;
		width:100%;
		height:100px;
		text-align:left;
		overflow: hidden;
	}
	.oc_right span {
		font-size: 1.3em;
	}
	.oc_right p {
		margin-top: 0.7em;
	}
	.oc_cname{
		display: inline-block;
		white-space: nowrap;    
		margin-right: 10px;
		width:34%;
	}
	.oc_time{
		display:inline-block;
		white-space: nowrap;
		width:60%;
	}
	.card-header {
		padding: 0 15px;
		height: 40px;
		min-height: 40px;
	}
	.card{
    box-shadow: 0 1px 1px rgba(0,0,0,.3);
	}
	.oc_button{
/*		position:absolute;
		display:inline-block;*/
		/*margin:0 0 0 10px;*/
	}
</style>