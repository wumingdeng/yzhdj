<template>
	<router-link tag='li' :to="{path:'/shoeDetail',query:{sid:sdata.id}}" :class="{bigItem:isBig}">
		<div>
			<img :id="sdata.desc_icon" :src="sdata.desc_icon"></img>
		</div>
		<!-- <span>{{sdata.name}}</span> -->
	</router-link>
</template>

<script>
	export default {
	    data () {
				return {
					isBig:false
				}
	    },
	    props:{
	    	sdata:{
	    		type:Object,
	    		default() {
	    			return {
	    				id:1,
	    				iconurl:'/static/client/home/item1.jpg',
	    				name:'服务1'
	    			}
	    		}
	    	},
	    	spic:{
	    		type:String,
	    		default:'/static/client/home/item1.jpg'
	    	},
	    	sname:{
	    		type:String,
	    		default:"服务"
	    	},
	    	surl:{
	    		type:String,
	    		default:"/"
	    	}
	    },
	    mounted(){
	    	var img = document.getElementById(this.sdata.desc_icon)
	    	this.checkImgHeight(img);
	    },
	    methods:{
	    	checkImgHeight(img) { 
	    		var self = this
					if (img.naturalHeight) { // 现代浏览器 
			    	if (img.naturalHeight > 400) {
			    		this.isBig = true;
			    	}
					} else { // IE6/7/8 
						var image = new Image() 
						image.src = img.src 
						image.onload = function() { 
				    	if (image.height > 400) {
				    		self.isBig = true;
				    	}
						} 
					} 
				}
	    }
	}
</script>

<style rel="stylesheet/scss">
	.indexmenu ul li {
	    width: 55%;
	    min-width: 102px;
	    overflow: hidden;
	    display: inline-block;
	    text-align: center;
	    float: left;
	    /*margin-bottom: 15px;*/
	}
	.bigItem {
		width: 45% !important;
	}
	li {
	    list-style: none outside none;
	}
	.indexmenu ul li div {
	    display: block;
	    width: 100%;
	    height: 100%;
	/*    width: 68px;
	    height: 68px;
	    border-radius: 50%;
	    -webkit-border-radius: 50%;
	    -moz-border-radius: 50%;*/
	    overflow: hidden;
	}
	.indexmenu ul li div img {
	    width: 100%;
	    border: 0;
	    display: block;
	}
</style>