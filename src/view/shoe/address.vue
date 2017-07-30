<template>
	<f7-page navbar-through>
		<f7-navbar sliding>
      <f7-nav-left>
          <f7-link icon="icon-back color-black" @click="onBack"></f7-link>
      </f7-nav-left>
      <f7-nav-center sliding title="邮寄地址"></f7-nav-center>
      <f7-nav-right></f7-nav-right>
    </f7-navbar>

    <f7-block-title style="margin-top:10px;font-size:18px;">联系人</f7-block-title>
		<f7-list form>
	    <f7-list-item>
	      <f7-label>姓名</f7-label>
	      <f7-input id="inputContact" type="text" placeholder="请输入联系人" v-model="$store.state.userinfo.contact"></f7-input>
	    </f7-list-item>
	    <li v-if="false" class="">
	    	<div style="width:60%;margin:0 auto;">
		    	<label class="item-content label-radio customRadio" @click="onGender(0)">
		    		<input value="0" name="my-radio" type="radio" :checked="gender == 0 ? 'checked' : false">
		    		<div class="item-inner">
		    			<div class="item-title">女士</div>
		    		</div>
		    	</label>
		    	<label class="item-content label-radio customRadio" @click="onGender(1)">
		    		<input value="1" name="my-radio" type="radio" :checked="gender == 1 ? 'checked' : false">
		    		<div class="item-inner">
		    			<div class="item-title">先生</div>
		    		</div>
		    	</label>
	    	</div>
	    </li>
<!--       <f7-list-item radio name="my-radio" checked :value="1" title="先生"></f7-list-item>
      <f7-list-item radio name="my-radio" :value="2" title="女士"></f7-list-item> -->    
	    <f7-list-item>
	      <f7-label>手机号</f7-label>
	      <f7-input id="inputTel" type="number" placeholder="请输入手机号" v-model='$store.state.userinfo.tel'></f7-input>
	    </f7-list-item>
    </f7-list>

    <f7-block-title style="margin-top:-20px;font-size:18px;">联系地址</f7-block-title>
		<f7-list form>
			<f7-list-item>
	      <f7-label>所在地区</f7-label>
    		<!-- <chinaCity style="margin-left:5px;" v-model="cityInfo" :initInfo="cityInit" :test='87'></chinaCity> -->
	      <f7-input id="inputLocation" type="text" readonly placeholder=" 点击选择" @click="onSelectArea" v-model="showArea"></f7-input>
	    </f7-list-item>
	    <f7-list-item>
				<f7-label style="margin-top:-65px;">详细地址</f7-label>
				<div class="item-input">
					<textarea id="inputAddress" style="margin:3px 0;border:1px solid #eeeeee;padding-left:5px;" type="textarea" v-model="$store.state.userinfo.address"></textarea>
				</div>
	    </f7-list-item>
	    <f7-list-item>
				<f7-label style="margin-top:-65px;">备注</f7-label>
				<div class="item-input">
					<textarea id="inputRemark" style="margin:3px 0 10px;border:1px solid #eeeeee;padding-left:5px;" type="textarea" v-model="$store.state.remark"></textarea>
				</div>
	      <!-- <f7-input id="inputRemark" type="textarea" placeholder="" v-model="$store.state.remark"></f7-input> -->
	    </f7-list-item>	    
		</f7-list>
		<p style="width:90%;margin:-15px auto 50px auto;"><f7-button style="background-color:#fa7699" big fill @click="onSure">确定</f7-button></p>
		 <vueArea :props-show="show" :props-result="result" v-on:result="areaResult"></vueArea>
	</f7-page>
</template>

<script>	
	// var vueArea = require.ensure('vue-area',function(){},'vue-area')
	var vueArea = require('vue-area')
	import g from '../../globals/global.js'
	export default {
		name: 'address',
		data() {
			return {
				cityInfo:{},
				// contact:null,
				gender:null,
				// tel:null,
				// address:null
				showArea:null,
		    result: null,
		    show: false
			}
		},
		watch:{
			result(newVal, oldVal) {
				var showCity = newVal.city.name
				if (showCity == '市辖区' || showCity == '县') {
					showCity = ''
				}
				this.cityInfo = {
					province: newVal.province.name,
					city: showCity,
					area: newVal.area.name
				}
				this.showArea = newVal.province.name + " " + showCity + " " + newVal.area.name
			}
		},
		computed: {
			cityInit() {
				return {
					province:this.$store.state.userinfo.province || "福建",
					city:this.$store.state.userinfo.city || '泉州',
					area:this.$store.state.userinfo.area || '丰泽区'
				}
			}
		},
		components:{
			// 'chinaCity':chinaCity,
			"vueArea":vueArea
		},
		methods:{
			onBack() {
				if (g.isIphone()) {
					//this.$store.state.isReload = true;
					//this.$store.state.isLogin = false;
					this.$router.push({
						path: 'shoeDetail'
					})
					return
				}
				this.$router.push({
					path:'/shoeDetail'
				});
			},
	    areaResult: function(show, result){
	        this.show = show
	        this.result = result
	    },
	    onSelectArea() {
	    	this.show = true;
	    },
			onGender(value) {
				this.gender = value;
				var userinfo = {}
				userinfo.gender = value
				this.$store.commit('USERINFO',userinfo)
			},
			checkInfo() {
				var contact = document.getElementById("inputContact").value;
				if (!contact) {
    			this.$f7.alert('','请输入联系人')
    			return false
				}
				if (contact.replace(/[\u0391-\uFFE5]/g,"aa").length > 12) {
					this.$f7.alert('','联系人太长了')
					return false
				}
				var phone = document.getElementById("inputTel");
    		if (!phone.value) {
    			this.$f7.alert('','请输入手机号')
    			return false;
    		}
    		var regPhone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
     		if(!regPhone.test(phone.value)) {
     			this.$f7.alert('','请输入有效的手机号')
     			phone.focus();
     			return false;
     		} 
     		if (!this.cityInfo.province || this.cityInfo.province == '' || !this.cityInfo.area || this.cityInfo.area == '') {
     			this.$f7.alert('','请选择所在地区')
     			return false
     		}

     		var address = document.getElementById("inputAddress").value;
     		if (!address) {
    			this.$f7.alert('','请输入详细地址')
    			return false
     		}
     		return true
			},
			onSure() {
				if (!this.checkInfo()) {
					return false
				}
				//修改本地省市区信息
				this.$store.commit('USERINFO',this.cityInfo)
				this.$router.push('/pay')
			}
		},
		mounted() {
			this.$f7.resize();
			//初始化数据
			// this.contact = this.$store.state.userinfo && this.$store.state.userinfo.contact || ''
			this.gender = this.$store.state.userinfo && this.$store.state.userinfo.gender || 0
			if (this.$store.state.userinfo.province && this.$store.state.userinfo.area) {
				this.cityInfo = {
					province: this.$store.state.userinfo.province,
					area: this.$store.state.userinfo.area
				}
				this.showArea = this.$store.state.userinfo.province + ' ' +  this.$store.state.userinfo.city + ' ' + this.$store.state.userinfo.area
			}
		}
	}
</script>

<style scoped>
	.customRadio {
		width:49%;
		/*float:left;*/
		display: inline-block;
	}
	.form-radio input[type=radio]:checked~i, label.label-radio input[type=checkbox]:checked~.item-inner, label.label-radio input[type=radio]:checked~.item-inner {
		color: #111188;
	}
	.list-block .item-title.label {
		width: 25%;
	}
	#inputLocation ul {
		margin-top: 0px;
		margin-bottom: 0px;
	}
</style>