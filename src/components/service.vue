<template>
	<div v-show="isShow" class="qrcodeBg" @click='onClose'>
		<img src="static/assets/serverQrcode.jpg" alt="">
	</div>
</template>


<script>
	export default {
		data() {
			return {

			}
		},
		props:['isShow'],
		methods:{
			onClose(evt) {
				this.$emit('close')
			}
		}
	}
</script>

<style scoped>
  .qrcodeBg {
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0.7);
   /* filter:alpha(Opacity=30);
    -moz-opacity:0.3;
    opacity: 0.3;*/
    position: absolute;
    top: 0px;
    z-index: 1000;
    vertical-align: center;
    animation: pageFromRightToCenterShadow .4s forwards;
  }
  .qrcodeBg img {
      width: 100%;
      margin-top: 80px;
		  animation: photoBrowserIn .4s forwards;
		  transform: translate3d(0,0,0);
      /*margin:auto 40px;*/
  }

  .qrcodeBg-out {
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0.7);
   /* filter:alpha(Opacity=30);
    -moz-opacity:0.3;
    opacity: 0.3;*/
    position: absolute;
    top: 0px;
    z-index: 1000;
    vertical-align: center;
    animation: pageFromRightToCenterShadow .4s forwards;
  }
  .qrcodeBg-out img {
      width: 100%;
      margin-top: 80px;
		  animation: photoBrowserOut .4s forwards;
		  transform: translate3d(0,0,0);
      /*margin:auto 40px;*/
  }
</style>