<template>
	<div class="navFooter">
		<ul>
	    	<router-link tag='li' to="/shoeHome">
	    		<img v-if="isShow1" class="homeIcon" src='static/assets/shoe/icon1_active.png'></img>
	    		<img v-else class="homeIcon" src='static/assets/shoe/icon1.png'></img>
	    		<!-- <p>首页</p> -->
	    	</router-link>
	    	<router-link tag='li' to="/order">
	    		<!-- <i class="userIcon"></i> -->
	    		<img v-if="isShow2" class="homeIcon" src='static/assets/shoe/icon3_active.png'></img>
	    		<img v-else class="homeIcon" src='static/assets/shoe/icon3.png'></img>
	    		<!-- <i class="f7-icons"></i> -->
	    		<!-- <p>个人中心</p> -->
	    	</router-link>
		</ul>
	</div>
</template>

<script>
	export default {
	    data () {
	      return {
	      	id:this.selectId
	      }
	    },
	    methods:{
	    	isShow(id) {
	    		return id == this.id;
	    	}
	    },
	    computed:{
	    	isShow1(){
	    		return this.selectId == 1;
	    	},
	    	isShow2(){
	    		return this.selectId == 2;
	    	}
	    },
	    props:{
	    	selectId:{
	    		type:[String,Number],
	    		default:1
	    	}
	    }
	}
</script>

<style lang="css" rel="stylesheet/css" scoped>
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
    border-top: 1px solid #ddd;
    box-shadow: 3px 0px 0px 0px #888888;
	}
  .navFooter ul {
		height:100%;
    padding-left: 0px;
    margin-top: 0px;
  }

  .navFooter ul li {
    width: 50%;
    min-width: 106px;
    display: block;
    float: left;
    height: 50px;
    text-align: center;
	}

	.navFooter ul li img {
		height:100%;
	}


	.navFooter ul li i.orderIcon {
	}

	.navFooter ul li i.userIcon {
	}

	.navFooter ul li p {
	    text-align: center;
	    font-size: 12px;
	    height: 17px;
	    color: #333;
	    line-height: 17px;
	}

</style>