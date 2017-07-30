<template>
	<f7-page navbar-through>
    <f7-navbar sliding>
      <f7-nav-left v-if="!isNecessary">
          <f7-link icon="icon-back color-black" @click="$router.push('/check')"></f7-link>
      </f7-nav-left>
      <f7-nav-center sliding title="个人资料"></f7-nav-center>
      <f7-nav-right></f7-nav-right>
    </f7-navbar>

    <f7-list id="userinfoForm" form style='margin-top:0px;'>
      <f7-list-item>
        <f7-label style='width: 3em'>身高</f7-label>
        <div class="item-input custom">
          <input id="heightInput" type="number" placeholder="" v-model="$store.state.userinfo.height">
        </div>
        <span style='width:43%'>&nbsp; cm</span>
      </f7-list-item>
      <f7-list-item>
        <f7-label style='width: 5em'>孕前体重</f7-label>
        <div class="item-input custom">
          <input id="weightInput" type="number" placeholder="" v-model="$store.state.userinfo.weight">
        </div>
        <span style='width:50%'>&nbsp; kg</span>
      </f7-list-item>
      <f7-list-item>
        <f7-label style='width:47%'>末次月经时间</f7-label>
        <f7-input style='margin-left:10px' id="lastPeriodInput" type="date" placeholder=""></f7-input>
      </f7-list-item>
      <f7-list-item form>
        <f7-label style='width:47%'>是否单胎妊娠</f7-label>
      	<f7-list-item  checkbox id="my-radio_0" value="0" title="是" :checked='radio_0' @click="radio_0_fun"></f7-list-item>
				<f7-list-item  style='margin-right:10px' checkbox id="my-radio_1" value="1" title="否" :checked='radio_1' @click="radio_1_fun"></f7-list-item>
      </f7-list-item>
    </f7-list>

    <p v-if="isNecessary"><f7-button big fill style='margin:-10px 10px 10px 10px;background-color:#fa7699' @click="onUpdateInfo">保存</f7-button></p>
		<f7-grid v-else>
      <f7-col><f7-button big fill style='margin:-10px 0px 0px 10px;background-color:#fa7699' @click="onUpdateInfo">更新</f7-button></f7-col>
      <f7-col><f7-button big fill style='margin:-10px 10px 0px 0px;background-color:#fa7699' @click="$router.go(-1)">取消</f7-button></f7-col>
    </f7-grid>
	</f7-page>
</template>

<script>
  import moment from 'moment'
	export default {
		data() {
			return {
				isNecessary:false,
				radio_0:false,
				radio_1:false,
			}
		},
		computed:{
			userWeight() {
				return this.$store.state.userinfo.weight;
			},
			userHeight() {
				return this.$store.state.userinfo.height;
			},
			userLastPeroid() {
        // var last = new Date(this.$store.state.userinfo.lastPeriod).toLocaleDateString('yyyy-MM-dd')
        var last = moment(this.$store.state.userinfo.lastPeriod).format("YYYY-MM-DD")
        console.log(last)
        if (last) {
          // last = last.replace(/\-/g,'/')
          return last;
        }
				return '';
			},
			userIsSingle() {
				return this.$store.state.userinfo.isSingle;
			}
		},

		methods:{
			radio_0_fun(event) {
        this.radio_0 = !this.radio_0
				this.radio_1 = false
			},
			radio_1_fun(event) {
        this.radio_1 = !this.radio_1
				this.radio_0 = false
			},
			checkInput() {
  			var height = document.getElementById("heightInput").value
    		if (!height) {
    			this.$f7.alert('','请输入身高 单位:cm')
    			return false
    		}
    		if (height < 100 || height > 300) {
    			this.$f7.alert('','请输入身高 单位:cm')
    			return false
    		}
  			var weight = document.getElementById("weightInput").value
    		if (!weight) {
    			this.$f7.alert('','请输入体重 单位:kg')
    			return false
    		}
  			
  			var	lastPeriod = document.getElementById("lastPeriodInput").value
    		if (!lastPeriod) {
    			this.$f7.alert('','请选择末次月经时间')
    			return false
    		}
    		var lastTime = new Date(lastPeriod).getTime();
    		var now = new Date().getTime();
    		if (lastTime + 24*60*60*1000 > now) {
    			this.$f7.alert('','请选择当日之前的时间')
    			return false
    		}

				var isSingle = this.radio_0?1:0
				if(!this.$data.radio_0 && !this.$data.radio_1)
				{
					this.$f7.alert('','请选择单胎妊娠')
					return false
				}

    		return true;
			},
			onUpdateInfo() {
    		if (!this.checkInput()) return;
    		this.$f7.showPreloader('保存中...')

    		//结果保存到服务端
  			var info = {
  				// wxid:this.$store.state.wxid,
  				height:document.getElementById("heightInput").value,
  				weight:document.getElementById("weightInput").value,
  				isSingle:this.$data.radio_0?1:0,
  				lastPeriod:document.getElementById("lastPeriodInput").value
  			}
				this.$store.dispatch('updateInfo',{
					self:this,
					info:info,
  				callback:function(self,res) {
	          self.$store.commit('USERINFO',info);
	          //返回
	          self.$f7.alert('','保存成功',()=>{
	          	self.$router.push('/check');
	          })
  				}
				})
			}
		},

    beforeCreate() {
      document.title = '个人资料'
    },

		mounted() {
      this.$f7.resize()
      this.$f7.init()
      this.isNecessary = this.$route.query.isNecessary || false;
      this.radio_0  = this.$store.state.userinfo.isSingle == 1;
      this.radio_1  = this.$store.state.userinfo.isSingle == 0;
      if (!this.radio_0 && !this.radio_1) {
        this.radio_1 = true;
      }
      document.getElementById('lastPeriodInput').value = this.userLastPeroid
		}
	}
</script>

<style scoped>
  .custom {
    width: 70%;
  }
  .custom input {
    text-align: right;
  }
	.page-content {
    padding-top: 5px;
	}
	.datainput{
		margin-right:100px;
	}
	
</style>
