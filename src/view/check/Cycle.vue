<template>
	<f7-page>
	<f7-swiper name="testSwiper" :params='{autoplayDisableOnInteraction:false,loop:true,autoplay:3000}' pagination style="height:auto">
		<f7-swiper-slide class="bg-white color-black" style="height:auto;">
			<img class="swipeImg" src="/static/client/swipe/swipe.jpg">
		</f7-swiper-slide>
		<f7-swiper-slide class="bg-white color-black">
			<img class="swipeImg" src="/static/client/swipe/swipe.jpg">
		</f7-swiper-slide>
    </f7-swiper>
	</f7-page>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				content:[]
			}
		},
		created () {
			this.content = [
			'/static/client/swipe/swipe1.jpg',
			'/static/client/swipe/swipe2.jpg',
			'/static/client/swipe/swipe3.jpg',
			'/static/client/swipe/swipe4.jpg'
			]
		},
		mounted() {
			
		}
	}
</script>

<style>
	.cyclePage {
		background-color: #fff;
    padding: 0 10px;
    box-sizing: border-box;
	}
</style>