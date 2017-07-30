<template>
	<f7-page name="footPage" v-if="haveDate">
		<f7-card>
	
			<f7-card-header>
				<p style='color:#fa7190;width:100%;line-height:30px;text-align:center;'>足部健康评测报告</p>
				<span style="font-size:16px;"> {{reportDate}}</span>
				</div>
			</f7-card-header>
			<f7-card-content>
				<f7-grid>
					<f7-col>
						<div class="border">
							<div class="bTitle">
								<img src='static/assets/icon/icon_foot.png'></img>
								足型扫描
							</div>
							<div id="imgContainer" style="width:100%;overflow:hidden;">
								<img style="width:50%;height:100%;float:left;" v-if="footData.left_urla" :src="footData.left_urla"><img style="width:50%;height:100%;float:left" v-if="footData.right_urla" :src="footData.right_urla">
							</div>
						</div>
					</f7-col>
					<f7-col>
						<div id="dataContainer" class="border" style="height:180px;">
							<div class="bTitle">
								<img src='static/assets/icon/icon_result.png'></img>
								测量结果
							</div>
							<div>
								<table class="footTable" border="0">
									<tr>
										<td>左脚</td>
										<td></td>
										<td>右脚</td>
									</tr>
									<tr v-for="(item,index) in dataName">
										<td style="font-size:11px;color:#8f8f8f;">{{footData['left_' + valueName[index]]}}</td>
										<td>{{item}}</td>
										<td style="font-size:11px;color:#8f8f8f;">{{footData['right_' + valueName[index]]}}</td>
									</tr>
								</table>
							</div>
						</div>
					</f7-col>
				</f7-grid>
			</f7-card-content>
		</f7-card>
	
		<f7-card v-if='haveAdvice'>
		<!--
			<f7-card-header>
				<p style='color:#fa7190;width:100%;line-height:30px;text-align:center;'>
					<span style='font-family:hcpfont;'>*</span>
					&nbsp;&nbsp;足型判断及建议</p>
			</f7-card-header>
			-->
			<f7-card-content>
				<div id='f_a'></div>
				<!--
				<span>足弓类型:{{footType}}</span>
				<span style="float:right;margin-right:30px;">推荐鞋码:{{footSize}}</span>
				<p>{{footData.footAdvice}}</p>
				-->
			</f7-card-content>
		</f7-card>
		<f7-card v-if="false">
			<f7-card-header>
				<p style='color:#fa7190;width:100%;line-height:30px;text-align:center;'>
					<span style='font-family:hcpfont;'>*</span>
					&nbsp;&nbsp;建议鞋型</p>
			</f7-card-header>
			<f7-card-content>
				<f7-list form style="height:120px;">
					<li style="width: 33%;float:left;" v-for="(item,n) in shoeType" :key="n">
						<label class="item-content label-checkbox" style="padding-right:0px;">
							<input :value="n" :checked="footData.suggestShoe == n + 1" name="my-radio" disabled type="checkbox">
							<div class="item-media">
								<i class="icon icon-form-checkbox"></i>
							</div>
							<span style="width:90%;margin-left:5px;">
								<div class="item-title" style="font-size:14px;">{{item}}</div>
							</span>
						</label>
					</li>
				</f7-list>
				<p style="margin:5px auto;width:40%;">
					<f7-button fill style="background-color:#fa7699;height:35px;line-height:35px;" @click="$router.push('/shoeDetail')">去看看</f7-button>
				</p>
			</f7-card-content>
		</f7-card>
	
		<f7-card v-if='haveKnowledge'>
			<f7-card-content>
				<div id='f_k'></div>
			</f7-card-content>
		</f7-card>
		<p style="margin:5px auto;width:50%;">
			<f7-button fill style="background-color:#fa7699;height:35px;line-height:35px;" @click="$router.push('/shoeDetail')">选一双合适的孕妇鞋</f7-button>
		</p>
	</f7-page>
</template>


<script>
export default {
	data() {
		return {
			haveDate: false,
			haveAdvice:false,
			haveKnowledge:false,
			footData: {
				suggestShoe: 5
			},
			dataName: ['足长', '足宽', '型宽'],
			valueName: ['length', 'width', 'foot_width'],
			shoeType: ['基础功能型', '加强缓震型', '控制型', '超级稳定型', '保胎孕妇鞋']
		}
	},
	beforeCreate() {
		document.title = '足部报告'
	},
	computed: {
		reportDate() {
			if (this.footData.server_date) {
				return this.footData.server_date.substring(0, 10)
			} else {
				return ''
			}
		},
		footType() {
			var fType = this.footData.left_foot_status == '正常足弓' ? this.footData.right_foot_status : this.footData.left_foot_status
			return fType;
		},
		footSize() {
			return Math.max(this.footData.left_foot_size, this.footData.right_foot_size) + '码'
		}
	},
	mounted() {
		//取数据
		var rid = this.$route.query.rid;
		console.log("rid:" + rid)
		this.$store.dispatch('getFootRecord', {
			self: this,
			info: {
				rid: rid,
				// openid: wxid
			},
			callback(self, res) {
				if (res.body.error || res.body.data.length == 0) {
					self.$f7.alert("", '您还没有足部健康记录', function () {
						//关闭页面
						if (typeof WeixinJSBridge != "undefined") {
							WeixinJSBridge.invoke("closeWindow")
						} else {
							// self.$router.push('/' + page);
						}
					})
				} else {
					self.haveDate = true;
					self.footData = res.body.data[0]
					self.footData.left_length = self.footData.left_length.toFixed() + 'mm'
					self.footData.right_length = self.footData.right_length.toFixed() + 'mm'
					self.footData.left_width = self.footData.left_width.toFixed() + 'mm'
					self.footData.right_width = self.footData.right_width.toFixed() + 'mm'
					self.footData.left_foot_size = (self.footData.left_foot_size - 200) * 0.2 + 30;
					self.footData.right_foot_size = (self.footData.right_foot_size - 200) * 0.2 + 30;
					self.footData.suggestShoe = 5;
					
					// self.footData.left_urla = 'http://139.196.238.46:8097/20170720/30B49E6793FF20170720170517L.jpg'
					// self.footData.right_urla = 'http://139.196.238.46:8097/20170720/30B49E6793FF20170720170517L.jpg'

					self.haveKnowledge = !(self.footData.footknowledge==undefined || self.footData.footknowledge=="" || self.footData.footknowledge==null)
					self.haveAdvice = !(self.footData.footAdvice==undefined || self.footData.footAdvice=="" || self.footData.footAdvice==null)
					self.$nextTick(function () {
						if(self.haveKnowledge){
							document.getElementById("f_k").innerHTML = self.footData.footknowledge
						}
						if(self.haveAdvice){
							var str = self.footData.footAdvice.replace(/{{footData.right_foot_size}}/g, Math.max(this.footData.left_foot_size, this.footData.right_foot_size))  
							document.getElementById("f_a").innerHTML = str
						}
						var imgContainer = document.getElementById('imgContainer');
						var rate = 1.06
						var curHeight = imgContainer.offsetWidth * rate;
						// debugger
						// if (imgContainer.offsetWidth / 2 != 0) {
						// 	imgContainer.style.width = (imgContainer.offsetWidth + 1) + 'px'
						// }
						// if (curHeight > 180) {
							imgContainer.style.height = curHeight + 'px';
							var dataContainer = document.getElementById('dataContainer');
							dataContainer.style.height = (curHeight + 30) + 'px';
						// }
					})
				}
			}
		})
	}
}
</script>


<style scoped>
#footPage>.card-header {
	float: left;
}

.border {
	/*height: 180px;*/
	/*box-shadow: 0 1px 2px rgba(0,0,0,.3);*/
	background-color: #f6f6f6;
}

.iconTitle {
	height: 18px;
	margin: 0px 5px 0 5px;
	float: left;
}

.iconTitle+span {
	position: absolute;
	left: 50px;
}

.bTitle {
	height: 30px;
	background-color: #ffa1b3;
	line-height: 30px;
	color: #ffffff;
}

.bTitle img {
	height: 70%;
	margin: 3px 5px 0 5px;
	float: left;
	vertical-align: middle;
}

.footTable {
	width: 100%;
	text-align: center;
}
</style>