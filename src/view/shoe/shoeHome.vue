<template>
	<f7-page>
		<f7-page-content>
			<homeSwipe :swipeData="$store.state.swipeData"></homeSwipe>
			<homeContent></homeContent>
		</f7-page-content>
		<navFooter :selectId='1'></navFooter>
	</f7-page>
</template>

<script>
	import homeSwipe from "./homeSwipe";
	import homeContent from "./homeContent"
	import navFooter from './navFooter'
	import { mapActions } from 'vuex'
	export default {
    data () {
      return {

      }
    },
    components:{
    	"homeSwipe":homeSwipe,
			"navFooter":navFooter,
			"homeContent": homeContent
    },     
		methods: {
		  ...mapActions([
		    'login',
		    'getHomeData'
		  ])
			
		},
    beforeCreate() {
      document.title = '专业孕妇鞋'
    },
		created () {
      // this.getContent();
      console.log('home created...')
    },
		mounted () {
			//取当前城市的医院
			// this.$store.dispatch('getHospitalList',{
			// 	self:this,
			// 	info:{
			// 		// city:this.$store.state.user.nowCity
			// 		city:'0592'
			// 	},
			// 	callback:function(self,res){
   //    		self.$store.commit("user/HOSPITAL",res.body.ok);
			// 	}
			// })

		},
		beforeRouteEnter(to,from,next){
			//获取首页的配置信息
			window.Global.s.dispatch('getHomeData',{
				self:window.Global.Vue,
				callback:next
			})
		}
	}
</script>

<style lang="css" rel="stylesheet/css" scoped>
/*	.home_icon_img {
		width:100%;
		display: block;
	}
	.homeMid {
	    padding: .7rem .7rem;
	    overflow: hidden;
	}
	.homeMid a {
	    display: inline;
	    width: 47%;
	    height: auto;
	    float: left;
	    padding: 0 0.1rem 0 0;
	    overflow: hidden;
	}
	.homeMid a + a {
		float:right;
	    padding: 0 0 0 .1rem;
	}
	.homeMid a img {
		width: 100%;
	    display: block;
	    height: auto;
	    overflow: hidden;
	    border: 0;
	}*/



</style>